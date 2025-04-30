"use server"

import { MABC2ResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"
import { isMABC2Key } from "@/utils/typeGuards"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { mabc2 } from "@prisma/client"
import { z } from "zod"

export const upsertMABC2ByKeyValueAction = async<T>(key: keyof mabc2, value: T, bilanId: string|null): Promise<ServiceResponse<mabc2|null>>=> {
  const parsedResults = validateWithZodSchema(z.string().refine(val => isMABC2Key(val)), key)
  if(!parsedResults.success) return validationError(parsedResults)
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}
  try {
    const res = await db.mabc2.upsert({
      where: {
        bilanId: bilanId ?? ""
      },
      create: {
        ...updatedValue,
        bilan: {
          connect: {
            id: bilanId ?? ""
          }
        }
      },
      update: updatedValue    
    })

    return {
      success: true,
      data:res,
      message:"M-ABC2 modifié !"
    }
  } catch (error) {
    console.log("upsertMABC2ResultsAction", error)
    return serverError(error)
  }
}

export const setMABC2ResultsToNull = async(mabc2Id: string|null): Promise<ServiceResponse<mabc2|null>>=> {
  try {
    if(!mabc2Id) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.mabc2.update({
      where: {
        id: mabc2Id
      },
      data: {
        dexteriteManuelle: null,
        viserAttraper: null,
        equilibre: null,
        total: null,
        competencesMotrices: null,
        precisionUnimanuelle: null,
        coordinationsBimanuelles: null,
        precisionVisuoMotrice: null,
        coordinationsGlobalesRattrapes: null,
        coordinationsGlobalesLancers: null,
        motriciteGlobaleUnipodal: null,
        motriciteGlobaleDynamique: null,
        motriciteGlobaleSauts: null,
        observationsComplementaires: null
      }
    })

    if(!res) return dataBaseError("Aucun test M-ABC2 trouvé !")

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("setMABC2ResultsToNull", error)
    return serverError(error)
  }
}

export const fetchMABC2Results = async(bilanId: string|null|undefined): Promise<ServiceResponse<MABC2ResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const mabc2 = await db.mabc2.findUnique({
      where: {
        bilanId
      }
    })

    const data: MABC2ResultsDTO = {
      id: mabc2?.id ?? null,
      bilanId: mabc2?.bilanId ?? null,
      dexteriteManuelle: mabc2?.dexteriteManuelle ?? null,
      viserAttraper: mabc2?.viserAttraper ?? null,
      equilibre: mabc2?.equilibre ?? null,
      total: mabc2?.total ?? null,
      competencesMotrices:mabc2?.competencesMotrices ?? null,
      precisionUnimanuelle: mabc2?.precisionUnimanuelle?? null,
      coordinationsBimanuelles: mabc2?.coordinationsBimanuelles?? null,
      precisionVisuoMotrice: mabc2?.precisionVisuoMotrice ?? null,
      coordinationsGlobalesRattrapes: mabc2?.coordinationsGlobalesRattrapes?? null,
      coordinationsGlobalesLancers: mabc2?.coordinationsGlobalesLancers?? null,
      motriciteGlobaleUnipodal: mabc2?.motriciteGlobaleUnipodal?? null,
      motriciteGlobaleDynamique: mabc2?.motriciteGlobaleDynamique?? null,
      motriciteGlobaleSauts: mabc2?.motriciteGlobaleSauts?? null,
      observationsComplementaires: mabc2?.observationsComplementaires ?? null,
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchMABC2Results", error)
    return serverError(error)
  }
}
