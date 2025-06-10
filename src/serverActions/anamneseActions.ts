'use server'

import { AnamneseRawData, AnamneseResults, BilanMedicalKeys, BilanMedicauxRaw, BilanMedicauxResults } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { KeyAnamneseSchema, KeyValueAnamneseSchema } from "@/zodSchemas/anamneseSchemas"
import { BilanMedicalSchema } from "@/zodSchemas/bilanMedicalSchema"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { returnParseAnamneseResult } from "@/utils/parsingDatasFunctions"

export const createAnamneseAction = async(patientId: string): Promise<ServiceResponse<string|null>> => {
  try {
    const res = await db.anamnese.create({
      data: {
        patient: {
          connect: {
            id: patientId
          }
        }
      }
    })
    return {
      success: true,
      data: res.id
    }
  } catch (error) {
    console.log("createAnamneseAction", error)
    return serverError(error)
  }
}

export const saveTextBrutAnamneseAction = async(textBrut: string, patientId: string): Promise<ServiceResponse<string>>=> {
  const response = validateWithZodSchema(z.string({invalid_type_error: "Vous n'avez pas entré de chaîne de caractère !"}), textBrut)

  if(!response.success) return validationError(response)

  try {
    const notesAnamnese = response.data as string

    const res = await db.anamnese.upsert({
      where: {
        patientId
      },
      create: {
        notesBrutes: notesAnamnese,
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: {
        notesBrutes: notesAnamnese
      }
    })

    if(!res) return dataBaseError("Impossible de sauvegarder les notes ! Réessayez plus tard.")
    return {
      success: true,
      message: "Notes sauvegardées !",
      data: res.notesBrutes
    }

  } catch (error) {
    console.log("Error in saveTextBrutAnamneseAction", error)
    return serverError(error)
  }
}

export const upsertProposPapaOuMamanAction = async(patientId: string, proposPapaOuMaman: string): Promise<ServiceResponse<string|null>> => {

  const parsedData = validateWithZodSchema(
    z.object({
      patientId: z.string().min(1, { message: "L'identifiant du patient est absent." }),
      proposPapaOuMaman: z.string().min(1, { message: "Propos absent." })
    }),
    {
      patientId,
      proposPapaOuMaman
    }
  )

  if(!parsedData.success) return validationError(parsedData)
  const data = parsedData.data as {patientId: string, proposPapaOuMaman: string}

  try {
    const res = await db.anamnese.upsert({
      where: {
        patientId: data.patientId,
      },
      create: {
        proposPapaOuMaman: data.proposPapaOuMaman,
        patient: {
          connect: {
            id: data.patientId
          }
        }
      },
      update: {
        proposPapaOuMaman: data.proposPapaOuMaman
      }
    })

    if(!res) return dataBaseError(`Impossible de mettre à jour l'origine des propos.`)
    return {
      success: true,
      data: res.proposPapaOuMaman,
      message: "Origine des propos enregistrée avec succès."
    }

  } catch (error) {
    console.log("Error in upsertProposPapaOuMamanAction", error)
    return serverError(error, "Erreur lors de l'enregistrement de l'origine des propos.")
  }
}


//upsertAnamneseBySingleKeyValueAction need {key, value, patientId}
export const upsertAnamneseBySingleKeyValueWithFormDataAction = async(prevState: ServiceResponse<AnamneseResults|null>, formData: FormData): Promise<ServiceResponse<AnamneseResults|null>>=> {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(KeyValueAnamneseSchema, rawData)

  if(!parsedData.success) return validationError(parsedData)

  const dataFinal = parsedData.data as {key: keyof AnamneseRawData, value: string, patientId: string}
  const {key, value, patientId} = dataFinal

  try {
    const res = await db.anamnese.upsert({
      where: {
        patientId
      },
      create: {
        [key]: value === "undefined" ? null : value, //<---- Pour les cas où on veut reset la valeur à null, mettre un input pour value avec la valeur "undefinded" en string
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: {
        [key]: value === "undefined" ? null : value,
      }
    })

    if(!res) return dataBaseError("Impossible de mettre à jour l'anamnèse.")

    const data: AnamneseResults = returnParseAnamneseResult(res)

    return {
      success: true,
      message: "Anamnèse mise à jour avec succès.",
      data
    }
  } catch (error) {
    console.log("Error in upsertAnamneseBySingleKeyValueAction", error)
    return serverError(error, "Erreur lors de la mise à jour de l'anamnèse.")
    
  } finally {
    revalidatePath(`/creer-bilan/${patientId}`)
  }
}

export const upsertAnamneseByKeyValueAction = async<T>(anamneseKey: keyof AnamneseResults, value: T, patientId: string): Promise<ServiceResponse<AnamneseResults|null>>=> {
  const validateValue = validateWithZodSchema(
    z.any().refine(value => value !== null && value !== undefined && !value.includes("<"), {message: "Valeur absente !"}),
    value
  )

  if(!validateValue.success) return validationError(validateValue)

  const dataParsed: T = validateValue.data as T

  try {
    const res = await db.anamnese.upsert({
      where: {
        patientId
      },
      create: {
        [anamneseKey]: dataParsed,
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: {
        [anamneseKey]: dataParsed
      }
    })

    if(!res) return dataBaseError("Données de l'anamnèse introuvable !")
    const data: AnamneseResults = returnParseAnamneseResult(res)
  
    return {
      success: true,
      data,
      message: "Anamnèse modifiée avec succès."
    }
  } catch (error) {
    console.log("upsertAnamneseByKeyValueAction", error)
    return serverError(error)

  } finally {
    revalidatePath(`/creer-bilan/${patientId}`)
  }

}

export const setPropertyToNullByKeyAction = async(prevState: ServiceResponse<AnamneseResults|null>, formData: FormData): Promise<ServiceResponse<AnamneseResults|null>> => {
  const rawData = Object.fromEntries(formData.entries())
  const validateData = validateWithZodSchema(KeyAnamneseSchema, rawData)

  if(!validateData.success) return validationError(validateData)
  const {key, patientId} = validateData.data as {key: keyof AnamneseRawData, patientId: string}

  try {
    const updatedData = {[key]: null}

    const updatedRecord: AnamneseRawData = await db.anamnese.update({
      where: {
        patientId 
      },
      data : updatedData
    })

    if(!updatedRecord) return dataBaseError("Impossible de mettre à jour l'anamnèse.")

    const data: AnamneseResults = returnParseAnamneseResult(updatedRecord)

    return {
      success: true,
      message: "Anamnèse mise à jour avec succès.",
      data
    }

  } catch (error) {
    console.log("Error in setPropertyToNullByKeyValueAction", error)
    return serverError(error, "Erreur lors de la mise à jour de l'anamnèse.")
  }
}

export const setBilanMedicalToNullByKeyAction = async(bilanMedicalKey: BilanMedicalKeys, bilanMedicalId: string): Promise<ServiceResponse<BilanMedicauxRaw|null>> => {
  try {
    const record = await db.bilanMedical.update({
      where: {
        id:bilanMedicalId
      },
      data: {
        [bilanMedicalKey]:null
      }
    })
    

    if(!record) return dataBaseError("Impossible de mettre à jour l'anamnèse.")
    return {
      success: true,
      message: "Anamnèse mise à jour avec succès.",
      data: record
    }

  } catch (error) {
    console.log("Error in setPropertyToNullByKeyValueAction", error)
    return serverError(error, "Erreur lors de la mise à jour de l'anamnèse.")
  }
}

export const upsertSelectedBilansMedicauxAction = async(bilanListes: string[], patientId: string, anamneseId: string|null|undefined, keyToNull?: keyof BilanMedicauxResults):Promise<ServiceResponse<BilanMedicauxRaw|null>>=> {
  let createdAnamneseId: string|null|undefined = undefined

  try {
    if(!anamneseId){
      const response = await createAnamneseAction(patientId)
      const {data} = response ?? {}

      if(!data) {
        return {
          success: false,
          message: "Impossible de créer l'anamnèse. Veuillez réessayer plus tard.",
          data: null
        }
      }
      createdAnamneseId = data
    }

    const finalAnamneseId = anamneseId ?? createdAnamneseId

    const finalBilanListes = bilanListes.length  === 0 ? null : JSON.stringify(bilanListes)
    const dataForUpdate = keyToNull ? {selectedBilans: finalBilanListes, [keyToNull] :  null} : {selectedBilans: finalBilanListes}

    const res = await db.bilanMedical.upsert({
      where: {
        anamneseId: finalAnamneseId
      },
      create: {
        selectedBilans: JSON.stringify(bilanListes),
        anamnese: {
          connect: {
            id: finalAnamneseId!
          }
        }
      },
      update: dataForUpdate
    })    

    return {
      data: res,
      success: true,
      message: "Liste des bilans médicaux modifiés"
    }
  } catch (error) {
    console.log("upsertBilanMedicalByKeyAction", error)
    return serverError(error)
  }
}

export const upsertBilanMedicalByKeyAction = async<T>(bilanMedicalKey: keyof BilanMedicauxResults, value: T, patientId: string, anamneseId?: string): Promise<ServiceResponse<BilanMedicauxRaw|null>> => {
  let createdAnamneseId = undefined
  const parsedData = validateWithZodSchema(BilanMedicalSchema, {bilanMedicalKey, value, patientId, anamneseId})
  
  if(!parsedData.success) return validationError(parsedData)

  const validatedData = parsedData.data as {bilanMedicalKey: string, value: string[], patientId: string, anamneseId?: string}

  const dataForCreate = {
    anamnese: {
      connect: {
        id: anamneseId
      }
    },
    [bilanMedicalKey]: JSON.stringify(value)
  }
  const dataForUpdate = {
    anamnese: {
      connect: {
        id: anamneseId
      }
    },
    [bilanMedicalKey]: JSON.stringify(value)
  }

  try {
    if(!validatedData?.anamneseId) {
      const res = await createAnamneseAction(validatedData.patientId)
      createdAnamneseId = res.data
    }

    const finalAnamneseId = createdAnamneseId ?? anamneseId

    const res = await db.bilanMedical.upsert({
      where: {
        anamneseId:finalAnamneseId
      },
      create: dataForCreate,
      update: dataForUpdate
    })

    return {
      success: true,
      data: res,
      message : "Données enregistrées !"
    }
  } catch (error) {
    console.log("upsertBilanMedicalByKeyAction", error)
    return serverError(error)
  }
}
