"use server"

import { FlechesNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { flechesnepsy2 } from "@prisma/client"

export const upsertFlechesNepsy2ResultsAction = async<T>(key: keyof flechesnepsy2, value: T, bilanId: string|null): Promise<ServiceResponse<flechesnepsy2|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}

  try {
    const res = await db.flechesnepsy2.upsert({
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
      message:"Epreuve visuo-spatiale des flèches (Nepsy 2) modifiée !"
    }
  } catch (error) {
    console.log("upsertFlechesNepsy2ResultsAction", error)
    return serverError(error)
  }
}

export const setFlechesNepsy2ResultsToNull = async(flechesNepsy2Id: string|null): Promise<ServiceResponse<flechesnepsy2|null>>=> {
  try {
    if(!flechesNepsy2Id) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.flechesnepsy2.update({
      where: {
        id: flechesNepsy2Id
      },
      data: {
        score: null,
        observations: null
      }
    })

    if(!res) return dataBaseError("Aucun test BHK trouvé !")

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("setBHKResultsToNull", error)
    return serverError(error)
  }
}

export const fetchNepsy2Results = async(bilanId: string|null|undefined): Promise<ServiceResponse<FlechesNEPSY2ResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const flechesnepsy2 = await db.flechesnepsy2.findUnique({
      where: {
        bilanId
      }
    })

    const data: FlechesNEPSY2ResultsDTO = {
      id: flechesnepsy2?.id,
      bilanId: flechesnepsy2?.bilanId,
      score: flechesnepsy2?.score,
      observations: flechesnepsy2?.observations
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchNepsy2Results", error)
    return serverError(error)
  }
}