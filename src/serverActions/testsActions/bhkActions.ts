"use server"

import { BHKResultsDTO, PraxiesGestuellesResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import { returnArrayIfJson } from "@/utils/arrayFunctions"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { bhk } from "@prisma/client"

export const upsertBHKResultsAction = async<T>(key: keyof bhk, value: T, bilanId: string|null): Promise<ServiceResponse<bhk|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}

  try {
    const res = await db.bhk.upsert({
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
      message:"BHK modifié !"
    }
  } catch (error) {
    console.log("upsertBHKResultsAction", error)
    return serverError(error)
  }
}

export const setBHKResultsToNull = async(bhkId: string|null): Promise<ServiceResponse<bhk|null>>=> {
  try {
    if(!bhkId) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.bhk.update({
      where: {
        id: bhkId
      },
      data: {
        qualiteEcriture: null,
        vitesseEcriture: null,
        lecture: null,
        tenueOutilScripteur: null,
        fonctionnalite: null,
        posturePoignet: null,
        memorisation: null,
        comportement: null,
        ecriture: null,
        ressenti: null,
        autres: null,
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

export const fetchBHKResults = async(bilanId: string|null|undefined): Promise<ServiceResponse<BHKResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const bhk = await db.bhk.findUnique({
      where: {
        bilanId
      }
    })

    const data: BHKResultsDTO = {
      id: bhk?.id,
      bilanId: bhk?.bilanId,
      qualiteEcriture:bhk?.qualiteEcriture,
      vitesseEcriture:bhk?.vitesseEcriture,
      lecture:bhk?.lecture,
      tenueOutilScripteur : returnArrayIfJson<string[]|null>(bhk?.tenueOutilScripteur ?? null) ,
      fonctionnalite: bhk?.fonctionnalite,
      posturePoignet: bhk?.posturePoignet,
      memorisation :bhk?.memorisation,
      comportement :bhk?.comportement,
      ecriture:bhk?.ecriture,
      ressenti :bhk?.ressenti,
      autres :bhk?.autres,
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchBHKResults", error)
    return serverError(error)
  }
}