"use server"

import { BilanRaw } from "@/@types/BilanTests"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { z } from "zod"

export const upsertTestsListeAction = async(patientId: string, testListe: string[]|null): Promise<ServiceResponse<string[]|null>>=> {
  const parse = validateWithZodSchema(
    z.array(z.string().min(1), {message: "La liste est vide !"}).nullable(),
    testListe
  )
  if(!parse.success) return validationError(parse)
    
  try {
    const res = await db.bilan.upsert({
      where: {
        patientId
      },
      create: {
        tests: testListe ? JSON.stringify(testListe) : null,
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: {
        tests: testListe ? JSON.stringify(testListe) : null,
      }
    })
    if(!res) return dataBaseError("Impossible de modifier le liste de thème !")
    const data = res?.tests ? JSON.parse(res?.tests) : null
    
   
    return {
      success: true,
      data,
      message: "Liste de tests utilisés modifiée."
    }
  } catch (error) {
    console.log("upsertTestsListeAction", error)
    return serverError(error)
  }
}

export const upsertBilanByKeyValueAction = async<T>(key: keyof BilanRaw, value: T, patientId: string): Promise<ServiceResponse<BilanRaw|null>>=> {
  try {
    const res = await db.bilan.upsert({
      where: {
        patientId
      },
      create: {
        [key]: value,
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: {
        [key]: value
      }
    })
    if(!res) return dataBaseError("Aucun bilan trouvé !")
    return {
      success: true,
      data: res,
      message: `Bilan modifié !`
    }
  } catch (error) {
    console.log("upsertBilanByKeyValueAction", error)
    return serverError(error)
    
  }
}