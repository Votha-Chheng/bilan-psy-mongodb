"use server"

import { VisuomotriceNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { visuomotricenepsy2 } from "@prisma/client"

export const upsertVisuomotriceNepsy2ByKeyValueAction = async<T>(key: keyof visuomotricenepsy2, value: T, bilanId: string|null): Promise<ServiceResponse<visuomotricenepsy2|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}
  try {
    const res = await db.visuomotricenepsy2.upsert({
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
      message:"Epreuve visuomotrice de la NEPSY 2 modifiée !"
    }
  } catch (error) {
    console.log("upsertVisuomotriceNepsy2ByKeyValueAction", error)
    return serverError(error)
  }
}

export const setVisuomotriceNepsy2ResultsToNull = async(visuomotricenepsy2Id: string|null): Promise<ServiceResponse<visuomotricenepsy2|null>>=> {
  try {
    if(!visuomotricenepsy2Id) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.visuomotricenepsy2.update({
      where: {
        id: visuomotricenepsy2Id
      },
      data: {
        precisionVisuoMoteur: null,
        vitesse: null,
        tenueCrayon: null,
        comportement: null,
        tonus: null
      }
    })

    if(!res) return dataBaseError("Aucun test Epreuve visuomotrice de la NEPSY trouvé !")

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("setMABC2ResultsToNull", error)
    return serverError(error)
  }
}

export const fetchVisuomotriceNepsy2Results = async(bilanId: string|null|undefined): Promise<ServiceResponse<VisuomotriceNEPSY2ResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const visuomotricenepsy2 = await db.visuomotricenepsy2.findUnique({
      where: {
        bilanId
      }
    })

    const data: VisuomotriceNEPSY2ResultsDTO = {
      id: visuomotricenepsy2?.id,
      bilanId: visuomotricenepsy2?.bilanId,
      precisionVisuoMoteur: visuomotricenepsy2?.precisionVisuoMoteur,
      vitesse: visuomotricenepsy2?.vitesse,
      tenueCrayon: visuomotricenepsy2?.tenueCrayon,
      comportement: visuomotricenepsy2?.comportement,
      tonus: visuomotricenepsy2?.tonus
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