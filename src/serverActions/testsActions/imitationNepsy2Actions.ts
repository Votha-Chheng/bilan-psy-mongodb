"use server"

import { ImitationPositionsNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"

export const upsertImitationNepsy2ByKeyValueAction = async<T>(key: keyof ImitationPositionsNEPSY2ResultsDTO, value: T, bilanId: string|null): Promise<ServiceResponse<ImitationPositionsNEPSY2ResultsDTO|null>>=> {

  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}
  try {
    const res = await db.imitationpositionsnepsy2.upsert({
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
      message:"Imitation de positions de la Nepsy 2 modifiée !"
    }
  } catch (error) {
    console.log("upsertImitationNepsy2ByKeyValueAction", error)
    return serverError(error)
  }
}

export const setImitationNepsy2ResultsToNull = async(imitationNepsy2Id: string|null): Promise<ServiceResponse<ImitationPositionsNEPSY2ResultsDTO|null>>=> {
  try {
    if(!imitationNepsy2Id) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.imitationpositionsnepsy2.update({
      where: {
        id: imitationNepsy2Id
      },
      data: {
        imitationGestesMains: null,
        observationsDiverses: null
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

export const fetchImitationNepsy2 = async(bilanId: string|null|undefined): Promise<ServiceResponse<ImitationPositionsNEPSY2ResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const imitationNepsy2 = await db.imitationpositionsnepsy2.findUnique({
      where: {
        bilanId
      }
    })

    const data: ImitationPositionsNEPSY2ResultsDTO = {
      id: imitationNepsy2?.id ?? null,
      bilanId: imitationNepsy2?.bilanId ?? null,
      imitationGestesMains: imitationNepsy2?.imitationGestesMains ?? null,
      observationsDiverses: imitationNepsy2?.observationsDiverses ?? null
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchImitationNepsy2", error)
    return serverError(error)
  }
}
