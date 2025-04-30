"use server"

import { FiguresReyBResultsDTO } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { figuresreyb } from "@prisma/client"

export const upsertFigureReyBByKeyValueAction = async<T>(key: keyof figuresreyb, value: T, bilanId: string|null): Promise<ServiceResponse<figuresreyb|null>>=> {
  const updatedValue= Array.isArray(value) ?{[key]: JSON.stringify(value)} : {[key]: value}

  try {
    const res = await db.figuresreyb.upsert({
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
      message:"Epreuve visuoconstructive en deux dimensions (Figure de Rey B) modifiée !"
    }
  } catch (error) {
    console.log("upsertFigureReyBByKeyValueAction", error)
    return serverError(error)
  }
}

export const setFigureReyBResultsToNull = async(figureReyBId: string|null): Promise<ServiceResponse<figuresreyb|null>>=> {
  try {
    if(!figureReyBId) return dataBaseError("Il faut un identifiant pour le test !")

    const res = await db.figuresreyb.update({
      where: {
        id: figureReyBId
      },
      data: {
        copieModeleDS: null,
        copieModeleDureeDS: null,
        memoireModeleDS: null,
        memoireModeleDureeDS: null,
        memoirePlanification: null,
        copiePlanification:null,
        observationsFigureB: null
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

export const fetchFigureReyBResults = async(bilanId: string|null|undefined): Promise<ServiceResponse<FiguresReyBResultsDTO|null>> => {
  if(!bilanId) return {success: false, data: null}
  try {
    const figureReyB = await db.figuresreyb.findUnique({
      where: {
        bilanId
      }
    })

    const data: FiguresReyBResultsDTO = {
      id: figureReyB?.id,
      bilanId: figureReyB?.bilanId,
      copieModeleDS: figureReyB?.copieModeleDS,
      copieModeleDureeDS: figureReyB?.copieModeleDureeDS,
      memoireModeleDS: figureReyB?.memoireModeleDS,
      memoireModeleDureeDS: figureReyB?.memoireModeleDureeDS,
      memoirePlanification: figureReyB?.memoirePlanification,
      copiePlanification: figureReyB?.copiePlanification,
      observationsFigureB: figureReyB?.observationsFigureB,
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchFigureReyBResults", error)
    return serverError(error)
  }
}