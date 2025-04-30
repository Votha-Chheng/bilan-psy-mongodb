"use server"

import { ConnaissancesDroiteGaucheResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { connaissancedroitegauche } from "@prisma/client"

export const upsertConnaisanceDroiteGaucheByKeyValueAction = async<T>(key: keyof connaissancedroitegauche, value: T, bilanId: string|null): Promise<ServiceResponse<connaissancedroitegauche|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}
  try {
    const res = await db.connaissancedroitegauche.upsert({
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
      message:"Test de connaisance droite/gauche modifié !"
    }
  } catch (error) {
    console.log("upsertConnaisanceDroiteGaucheByKeyValueAction", error)
    return serverError(error)
  }
}

export const setConnaissanceDroiteGaucheResultsToNull = async(connaissancedroitegaucheResultsId: string|null): Promise<ServiceResponse<connaissancedroitegauche|null>>=> {
  try {
    if(!connaissancedroitegaucheResultsId) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.connaissancedroitegauche.update({
      where: {
        id: connaissancedroitegaucheResultsId
      },
      data: {
        surAutruiACote: null,
        surAutruiReversibilite: null,
        surSoi: null,
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

export const fetchConnaissanceDroiteGaucheResults = async(bilanId: string|null|undefined): Promise<ServiceResponse<ConnaissancesDroiteGaucheResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const connaissanceDroiteGauche = await db.connaissancedroitegauche.findUnique({
      where: {
        bilanId
      }
    })

    if(!connaissanceDroiteGauche) return dataBaseError("Aucun test de connaissance droite gauche trouvé !")
    return {
      success: true,
      data: connaissanceDroiteGauche
    }

  } catch (error) {
    console.log("fetchConnaissanceDroiteGaucheResults", error)
    return serverError(error)
  }
}