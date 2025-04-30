"use server"

import { BHKResultsDTO, EpreuveCubesNEPSY2ResultsDTO, PraxiesGestuellesResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import { returnArrayIfJson } from "@/utils/arrayFunctions"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { bhk, epreuvecubesnepsy2 } from "@prisma/client"

export const upsertEpreuveCubesNepsy2ByKeyValueAction = async<T>(key: keyof epreuvecubesnepsy2, value: T, bilanId: string|null): Promise<ServiceResponse<epreuvecubesnepsy2|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}

  try {
    const res = await db.epreuvecubesnepsy2.upsert({
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
      message:"Epreuve des cubes (Nepsy 2) modifiée !"
    }
  } catch (error) {
    console.log("upsertEpreuveCubesNepsy2ByKeyValueAction", error)
    return serverError(error)
  }
}

export const setEpreuveCubesNepsy2ResultsToNull = async(epreuveCubesNepsy2Id: string|null): Promise<ServiceResponse<epreuvecubesnepsy2|null>>=> {
  try {
    if(!epreuveCubesNepsy2Id) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.epreuvecubesnepsy2.update({
      where: {
        id: epreuveCubesNepsy2Id
      },
      data: {
        scoreNS: null,
        observations: null
      }
    })

    if(!res) return dataBaseError("Aucun épreuve des cubes de la Nepsy 2 trouvée !")

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("setEpreuveCubesNepsy2ResultsToNull", error)
    return serverError(error)
  }
}

export const fetchEpreuveCubesNepsy2Results = async(bilanId: string|null|undefined): Promise<ServiceResponse<EpreuveCubesNEPSY2ResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const cubesNepsy2 = await db.epreuvecubesnepsy2.findUnique({
      where: {
        bilanId
      }
    })

    const data: EpreuveCubesNEPSY2ResultsDTO = {
      id: cubesNepsy2?.id,
      bilanId: cubesNepsy2?.bilanId,
      scoreNS: cubesNepsy2?.scoreNS,
      observations: cubesNepsy2?.observations
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchEpreuveCubesNepsy2Results", error)
    return serverError(error)
  }
}