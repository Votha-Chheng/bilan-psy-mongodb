"use server"

import { FiguresReyAResultsDTO, FlechesNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { figuresreya, flechesnepsy2 } from "@prisma/client"

export const upsertFigureReyAByKeyValueAction = async<T>(key: keyof figuresreya, value: T, bilanId: string|null): Promise<ServiceResponse<figuresreya|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}

  try {
    const res = await db.figuresreya.upsert({
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
      message:"Epreuve visuoconstructive en deux dimensions (Figure de Rey A) modifiée !"
    }
  } catch (error) {
    console.log("upsertFigureReyAByKeyValueAction", error)
    return serverError(error)
  }
}

export const setFigureReyAResultsToNull = async(figureReyAId: string|null): Promise<ServiceResponse<figuresreya|null>>=> {
  try {
    if(!figureReyAId) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.figuresreya.update({
      where: {
        id: figureReyAId
      },
      data: {
        copieModeleDS: null,
        copieModeleDureePercentile: null,
        memoireDS: null,
        memoirePercentile: null,
        planificationMemoire: null,
        planificationModele:null,
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

export const fetchFigureReyAResults = async(bilanId: string|null|undefined): Promise<ServiceResponse<FiguresReyAResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const figureReyA = await db.figuresreya.findUnique({
      where: {
        bilanId
      }
    })

    const data: FiguresReyAResultsDTO = {
      id: figureReyA?.id,
      bilanId: figureReyA?.bilanId,
      copieModeleDS: figureReyA?.copieModeleDS,
      copieModeleDureePercentile: figureReyA?.copieModeleDureePercentile,
      memoireDS: figureReyA?.memoireDS,
      memoirePercentile: figureReyA?.memoirePercentile,
      planificationMemoire: figureReyA?.planificationMemoire,
      planificationModele: figureReyA?.planificationModele,
      observations: figureReyA?.observations,
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchFigureReyAResults", error)
    return serverError(error)
  }
}