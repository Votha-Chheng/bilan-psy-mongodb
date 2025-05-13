"use server"

import { ObservationDTO, ObservationTest } from "@/@types/ObservationTestDTO"
import { ServiceResponse } from "@/@types/ServiceResponse"
import { TestsNames } from "@/@types/TestTypes"
import { returnArrayIfJson } from "@/utils/arrayFunctions"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"

export const fetchObservationsByTestName = async(testName: TestsNames): Promise<ServiceResponse<ObservationDTO[]|null>> => {
  try {
    const res = await db.observationTest.findMany({
      where: {
        testName
      }
    })
    if(!res || res.length === 0) return dataBaseError("Aucune observation trouvée !") 

    const data: ObservationDTO[] = res.map((observation: ObservationTest) => ({
      id: observation.id,
      testNameAndThemeId: observation.testNameAndThemeId,
      testName: observation.testName as TestsNames,
      theme: observation.theme,
      listeObservations: returnArrayIfJson(observation.listeObservations) as string[]|null
    }))

    return {
      success: true,
      data
    }

  } catch (error) {
    console.log("fetchObservationsByTestName", error)
    return serverError(error)
  }
}

export const upsertListeObservationsByTestName = async(testName: TestsNames, theme: string, observations: string[]|null): Promise<ServiceResponse<ObservationTest|null>> => {
  
  try {
    const res = await db.observationTest.upsert({
      where: {
        testNameAndThemeId : testName+theme
      },
      create: {
        testNameAndThemeId: testName+theme,
        testName,
        theme,
        listeObservations: observations && observations.length>0 ? JSON.stringify(observations) : null
      },
      update: {
        listeObservations: observations && observations.length>0 ? JSON.stringify(observations) : null
      }
    })

    if(!res) return dataBaseError("Impossible de modifier le liste d'observation !")
    return {
      data: res,
      success: true,
      message: "Liste d'observation modifiée !"
    }

  } catch (error) {
    console.log("upsertListeObservationsByTestName", error)
    return serverError(error)
    
  }
}