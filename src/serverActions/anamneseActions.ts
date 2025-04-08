'use server'

import { AnamneseDTO, BilanMedicalDTO, BilanMedicalKeys, BilanMedicauxResults } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { AnamneseDataSchema, KeyValueAnamneseSchema } from "@/zodSchemas/anamneseSchemas"
import { BilanMedicalSchema } from "@/zodSchemas/bilanMedicalSchema"
import { Anamnese, BilanMedical } from "@prisma/client"
import { z } from "zod"

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

export const fetchAnamneseByKeys = async(keys: (keyof AnamneseDTO)[]): Promise<ServiceResponse<AnamneseDTO[]>> => {
  const selectObject = keys.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {patientId: true} as Record<string, boolean>)

  const whereObject = keys.reduce((acc, key) => {
    acc[key] = { not: null };
    return acc;
  }, {} as Record<string, { not: null }>);

  try {
    const res = await db.anamnese.findMany({
      select: selectObject,
      where: whereObject
    })

    return {
      success: true,
      data: res as unknown as AnamneseDTO[],
      message: "Descriptions récupérées avec succès."
    }
  } catch (error) {
    console.log("Error in fetchAnamneseDescriptionByDomaine", error)
    return serverError(error, "Erreur lors de la récupération des descriptions.")
  }
}

export const upsertAnamneseBySingleKeyValueAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<Anamnese|null>>=> {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(KeyValueAnamneseSchema, rawData)

  if(!parsedData.success) return validationError(parsedData)
  const data = parsedData.data as {key: keyof Anamnese, value: string, patientId: string}
  const {key, value, patientId} = data

  try {
    const res = await db.anamnese.upsert({
      where: {
        patientId
      },
      create: {
        [key]: value,
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: {
        [key]: value,
      }
    })

    return {
      success: true,
      message: "Anamnèse mise à jour avec succès.",
      data: res
    }
  } catch (error) {
    console.log("Error in upsertAnamneseBySingleKeyValueAction", error)
    return serverError(error, "Erreur lors de la mise à jour de l'anamnèse.")
  }
}

//Généraliser cette fonction prenant pour paramètres des keys et des values
export const upsertFamilleAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<AnamneseDTO|null>> => {
  const rawData = Object.fromEntries(formData.entries())
  const validateData = validateWithZodSchema(AnamneseDataSchema, rawData)

  if(!validateData.success) return validationError(validateData)
  
  const data = validateData.data as AnamneseDTO

  try {
    const res = await db.anamnese.upsert({
      where: {
        patientId: data.patientId
      },
      create: {
        patient: {
          connect: {
            id: data.patientId
          }
        },
        fratrie: data.fratrie,
        compositionFamiliale: data.compositionFamiliale
      },
      update: {
        fratrie: data.fratrie,
        compositionFamiliale: data.compositionFamiliale
      }
    })
    if(!res) return dataBaseError("Impossible de mettre à jour l'anamnèse.")
    return {
      success: true,
      message: "Anamnèse mise à jour avec succès.",
      data: res
    }
  } catch (error) {
    console.log("Error in upsertAnamneseAction", error)
    return serverError(error, "Erreur lors de la mise à jour de l'anamnèse.")
  }
}

export const upsertAnamneseByKeyValueAction = async<T>(anamneseKey: keyof Exclude<Anamnese, "bilansMedicauxResults">, value: T, patientId: string): Promise<ServiceResponse<Exclude<Anamnese, "bilansMedicauxResults">|null>>=> {

  const validateValue = validateWithZodSchema(
    z.string().min(1, "Valeur absente"),
    value
  )

  if(!validateValue.success) return validationError(validateValue)

  const data: T = validateValue.data as T

  try {
    const res = await db.anamnese.upsert({
      where: {
        patientId
      },
      create: {
        [anamneseKey]: data,
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: {
        [anamneseKey]: data
      }
    })

    return {
      success: true,
      data: res,
      message: "Anamnèse modifiée avec succès."
    }
  } catch (error) {
    console.log("upsertAnamneseByKeyValueAction", error)
    return serverError(error)
  }

}

export const setPropertyToNullByKeyValueAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<AnamneseDTO|null>> => {
  const rawData = Object.fromEntries(formData.entries())
  const validateData = validateWithZodSchema(KeyValueAnamneseSchema, rawData)

  if(!validateData.success) return validationError(validateData)
  const {key, patientId: idData} = validateData.data as {key: keyof Anamnese, patientId: string}

  try {
    const record = await db.anamnese.findUnique({
      where: {
        patientId:idData
      }
    })
    if(!record) {
      return {
        success: false,
        data: null,
        message: "Données non trouvées."
      }
    }

    const {id, patientId, bilansMedicauxResults, ...data} = record as AnamneseDTO
    const updatedData = {...data, [key]: null }

    const updatedRecord = await db.anamnese.update({
      where: {
        patientId 
      },
      data : updatedData
    })

    if(!updatedRecord) return dataBaseError("Impossible de mettre à jour l'anamnèse.")
    return {
      success: true,
      message: "Anamnèse mise à jour avec succès.",
      data: updatedRecord
    }

  } catch (error) {
    console.log("Error in setPropertyToNullByKeyValueAction", error)
    return serverError(error, "Erreur lors de la mise à jour de l'anamnèse.")
  }
}

export const setBilanMedicalToNullByKeyAction = async(bilanMedicalKey: BilanMedicalKeys, bilanMedicalId: string): Promise<ServiceResponse<BilanMedicauxResults|null>> => {
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

export const upsertSelectedBilansMedicauxAction = async(bilanListes: string[], patientId: string, anamneseId?: string, keyToNull?: BilanMedicalKeys):Promise<ServiceResponse<BilanMedical|null>>=> {
  let createdAnamneseId = undefined

  try {
    if(!anamneseId){
      const response = await createAnamneseAction(patientId)
      createdAnamneseId = response.data
    }

    const finalAnamneseId = anamneseId || createdAnamneseId

    const dataForUpdate = keyToNull ? {selectedBilans: bilanListes, [keyToNull] :  []} : {selectedBilans: bilanListes}

    const res = await db.bilanMedical.upsert({
      where: {
        anamneseId: finalAnamneseId!
      },
      create: {
        selectedBilans: bilanListes,
        anamnese: {
          connect: {
            id: finalAnamneseId!
          }
        }
      },
      update: dataForUpdate
    })    

    return {
      success: true,
      message: "Liste des bilans médicaux modifiés"
    }
  } catch (error) {
    console.log("upsertBilanMedicalByKeyAction", error)
    return serverError(error)
  }
}

export const upsertBilanMedicalByKeyAction = async<T>(bilanMedicalKey: BilanMedicalKeys, value: T, patientId: string, anamneseId?: string): Promise<ServiceResponse<BilanMedical|null>> => {
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
    [bilanMedicalKey]: value
  }
  const dataForUpdate = {
    anamnese: {
      connect: {
        id: anamneseId
      }
    },
    [bilanMedicalKey]: value
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