"use server"

import { PraxiesGestuellesResultsDTO, VisuomotriceNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { praxiesgestuelles, visuomotricenepsy2 } from "@prisma/client"

export const upsertPraxiesGestuellesByKeyValueAction = async<T>(key: keyof praxiesgestuelles, value: T, bilanId: string|null): Promise<ServiceResponse<praxiesgestuelles|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}
  try {
    const res = await db.praxiesgestuelles.upsert({
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
      message:"Praxies gestuelles modifiées !"
    }
  } catch (error) {
    console.log("upsertPraxiesGestuellesByKeyValueAction", error)
    return serverError(error)
  }
}

export const setPraxiesGestuellesResultsToNull = async(praxiesgestuellesId: string|null): Promise<ServiceResponse<praxiesgestuelles|null>>=> {
  try {
    if(!praxiesgestuellesId) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.praxiesgestuelles.update({
      where: {
        id: praxiesgestuellesId
      },
      data: {
        precisionDecoupage: null,
        tenueDecoupage: null,
        gestionTonusDecoupage: null,
        hyperHypoDecoupage: null,
        precisionCompas: null,
        tenueCompas: null,
        gestionTonusCompas: null,
        hyperHypoCompas: null,
        precisionEquerre : null,
        tenueEquerre: null,
        gestionTonusEquerre: null,
        hyperHypoEquerre: null
      }
    })

    if(!res) return dataBaseError("Aucun test de praxies gestuelles trouvé !")

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("setPraxiesGestuellesResultsToNull", error)
    return serverError(error)
  }
}

export const fetchPraxiesGestuellesResults = async(bilanId: string|null|undefined): Promise<ServiceResponse<PraxiesGestuellesResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const praxiesGestuelles = await db.praxiesgestuelles.findUnique({
      where: {
        bilanId
      }
    })

    const data: PraxiesGestuellesResultsDTO = {
      id: praxiesGestuelles?.id,
      bilanId: praxiesGestuelles?.bilanId,
      precisionDecoupage: praxiesGestuelles?.precisionDecoupage,
      tenueDecoupage: praxiesGestuelles?.tenueDecoupage,
      gestionTonusDecoupage: praxiesGestuelles?.gestionTonusDecoupage,
      hyperHypoDecoupage: praxiesGestuelles?.hyperHypoDecoupage,
      precisionCompas: praxiesGestuelles?.precisionCompas,
      tenueCompas: praxiesGestuelles?.tenueCompas,
      gestionTonusCompas: praxiesGestuelles?.gestionTonusCompas,
      hyperHypoCompas: praxiesGestuelles?.hyperHypoCompas,
      precisionEquerre : praxiesGestuelles?.precisionEquerre,
      tenueEquerre: praxiesGestuelles?.tenueEquerre,
      gestionTonusEquerre: praxiesGestuelles?.gestionTonusEquerre,
      hyperHypoEquerre: praxiesGestuelles?.hyperHypoEquerre
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchPraxiesGestuellesResults", error)
    return serverError(error)
  }
}