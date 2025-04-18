'use server'

import { AnamneseResults, BilanMedicalKeys, BilanMedicauxResults } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { returnArrayIfJson, returnParseAnamneseResult } from "@/utils/arrayFunctions"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { KeyAnamneseSchema, KeyValueAnamneseSchema } from "@/zodSchemas/anamneseSchemas"
import { BilanMedicalSchema } from "@/zodSchemas/bilanMedicalSchema"
import { Anamnese, BilanMedical, DevPsyConfere } from "@prisma/client"
import { z } from "zod"
import { getChosenThemeArray } from "@/utils/sortAnamneseDatas"

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

export const fetchAnamneseByKeys = async(keys: (keyof AnamneseResults)[]): Promise<ServiceResponse<AnamneseResults[]|null>> => {
  console.log("fetchAnamneseByKeys is triggered")
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

    const datasArray = res.map((record: Record<string, string>) => {
      const newRecord = {...record}
      if ("motriciteGlobale" in newRecord){
        newRecord["motriciteGlobale"] = JSON.parse(record["motriciteGlobale"]) 
      }
      if ("motriciteFine" in newRecord){
        newRecord["motriciteFine"] = JSON.parse(record["motriciteFine"]) 
      }
      if ("velo" in newRecord){
        newRecord["velo"] = JSON.parse(record["velo"]) 
      }
      if ("sensorialite" in newRecord){
        newRecord["sensorialite"] = JSON.parse(record["sensorialite"]) 
      }
      if ("apprentissages" in newRecord){
        newRecord["apprentissages"] = JSON.parse(record["apprentissages"]) 
      }
      if ("outils" in newRecord){
        newRecord["outils"] = JSON.parse(record["outils"]) 
      }
      if ("ecriture" in newRecord){
        newRecord["ecriture"] = JSON.parse(record["ecriture"]) 
      }
      if ("relationsPairs" in newRecord){
        newRecord["relationsPairs"] = JSON.parse(record["relationsPairs"]) 
      }
      if ("comportement" in newRecord){
        newRecord["comportement"] = JSON.parse(record["comportement"]) 
      }
      if ("attention" in newRecord){
        newRecord["attention"] = JSON.parse(record["attention"]) 
      }
      return newRecord
    })

    return {
      success: true,
      data: datasArray as unknown as AnamneseResults[],
      message: "Descriptions récupérées avec succès."
    }
  } catch (error) {
    console.log("Error in fetchAnamneseDescriptionByDomaine", error)
    return serverError(error, "Erreur lors de la récupération des descriptions.")
  }
}

//upsertAnamneseBySingleKeyValueAction need {key, value, patientId}
export const upsertAnamneseBySingleKeyValueWithFormDataAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<AnamneseResults|null>>=> {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(KeyValueAnamneseSchema, rawData)
  console.log(parsedData)
  if(!parsedData.success) return validationError(parsedData)
  const dataFinal = parsedData.data as {key: keyof Anamnese, value: string, patientId: string}
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
  }

}

export const setPropertyToNullByKeyAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<AnamneseResults|null>> => {
  const rawData = Object.fromEntries(formData.entries())
  const validateData = validateWithZodSchema(KeyAnamneseSchema, rawData)

  if(!validateData.success) return validationError(validateData)
  const {key, patientId} = validateData.data as {key: keyof Anamnese, patientId: string}

  try {
    const updatedData = {[key]: null}

    const updatedRecord: Anamnese = await db.anamnese.update({
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

export const setBilanMedicalToNullByKeyAction = async(bilanMedicalKey: BilanMedicalKeys, bilanMedicalId: string): Promise<ServiceResponse<BilanMedical|null>> => {
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

export const upsertSelectedBilansMedicauxAction = async(bilanListes: string[], patientId: string, anamneseId?: string, keyToNull?: keyof BilanMedicauxResults):Promise<ServiceResponse<BilanMedical|null>>=> {
  let createdAnamneseId = undefined

  try {
    if(!anamneseId){
      const response = await createAnamneseAction(patientId)
      createdAnamneseId = response.data
    }

    const finalAnamneseId = anamneseId || createdAnamneseId

    const finalBilanListes = bilanListes.length  === 0 ? null : JSON.stringify(bilanListes)
    const dataForUpdate = keyToNull ? {selectedBilans: finalBilanListes, [keyToNull] :  null} : {selectedBilans: finalBilanListes}

    const res = await db.bilanMedical.upsert({
      where: {
        anamneseId: finalAnamneseId!
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
      data:res,
      success: true,
      message: "Liste des bilans médicaux modifiés"
    }
  } catch (error) {
    console.log("upsertBilanMedicalByKeyAction", error)
    return serverError(error)
  }
}

export const upsertBilanMedicalByKeyAction = async<T>(bilanMedicalKey: keyof BilanMedicauxResults, value: T, patientId: string, anamneseId?: string): Promise<ServiceResponse<BilanMedical|null>> => {
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

export const fetchBilanMedicalResult = async(anamneseId: string): Promise<ServiceResponse<BilanMedicauxResults>|null>=> {
  try {
    const res = await db.bilanMedical.findUnique({
      where: {
        anamneseId
      },
      select: {
        id: true,
        bilanORL: true,
        bilanOphtalmo: true,
        bilanOrthophonique: true,
        bilanOrthoptique: true,
        bilanNeuropsy: true,
        bilanNeuropediatre: true,
        selectedBilans: true,
      }
    })

    if(!res) return dataBaseError(`Pas de bilans médicaux à afficher.`) 

    const {bilanORL, bilanOphtalmo, bilanOrthophonique, bilanOrthoptique, bilanNeuropsy, bilanNeuropediatre, selectedBilans} = res

    const data: BilanMedicauxResults = {
      bilanORL: bilanORL? JSON.parse(bilanORL) : null,
      bilanOphtalmo: bilanOphtalmo? JSON.parse(bilanOphtalmo) : null,
      bilanOrthophonique: bilanOrthophonique? JSON.parse(bilanOrthophonique) : null,
      bilanOrthoptique: bilanOrthoptique? JSON.parse(bilanOrthoptique) : null,
      bilanNeuropsy: bilanNeuropsy? JSON.parse(bilanNeuropsy) : null,
      bilanNeuropediatre: bilanNeuropediatre? JSON.parse(bilanNeuropediatre) : null,
      selectedBilans: selectedBilans? JSON.parse(selectedBilans) : null,
    }
    console.log("fetchBilanMedicalResult", data)
    return {
      success: true,
      data
    }

  } catch (error) {
    console.log("fetchBilanMedicalResult", error)
    return serverError(error)
  }
}

export const fetchBilanMedicalResultByKey = async(key: keyof BilanMedical, anamneseId: string|null|undefined): Promise<ServiceResponse<BilanMedicauxResults>|null>=> {
  try {
    if(!anamneseId) return { success: false, message: "L'anamnese n'a pas été encore créee."}
    const selectOptions = {
      [key]: true,
      selectedBilans: true
    }
    const res: Partial<BilanMedical>|null = await db.bilanMedical.findUnique({
      where: {
        anamneseId
      },
      select: selectOptions
    })

    if(!res) return dataBaseError()

    const data: string|null = returnArrayIfJson(res[key] ?? null)
    const bilansListe: string[]|null = returnArrayIfJson(res.selectedBilans ?? null)

    return {
      success: true,
      data : {[key]: data, selectedBilans: bilansListe ?? undefined}
    }
  } catch (error) {
    console.log("fetchBilanMedicalResultByKey", error)
    return serverError(error)
  }
}

export const fetchChosenThemes = async(patientId: string): Promise<ServiceResponse<string[]>>=> {
  try {
    const anamnese = await db.anamnese.findUnique({
      where: {
        patientId
      }
    })

    if(!anamnese) return {
      success: false,
      data: []
    }

    const copy = {...anamnese} as AnamneseResults

    const result = getChosenThemeArray(copy)
    return {
      success : true,
      data: result
    }
  } catch (error) {
    console.log("fetchChosenThemes", error)
    return serverError(error, "Impossible de recueillir les thèmes choisis.")
  }
}
