import { ServiceResponse } from "@/@types/ServiceResponse"
import { allTests } from "@/datas/listeTests"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { ObservationTest } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: { params: Promise<{ keyTest: string }>}): Promise<NextResponse> {
  let serviceReponse: ServiceResponse<ObservationTest[]|null> = {data: null}
  const {keyTest} = await context.params

  const test = allTests.find(t => t.keyTest === keyTest)

  if(!test) {
    serviceReponse = dataBaseError("Test non trouvé !")
    return NextResponse.json(serviceReponse)
  }

  try {
     const res = await db.observationTest.findMany({
      where: {
        testName: test.nom
      }
    })
    if(!res || res.length === 0){
      serviceReponse = dataBaseError("Aucune observation trouvée !") 
      return NextResponse.json(serviceReponse)
    } 

    serviceReponse = {
      success: true,
      data: res
    }

    return NextResponse.json(serviceReponse)
    
  } catch (error) {
    console.log("fetchObservationsByTestName", error)
    serviceReponse = serverError(error)
    return NextResponse.json(serviceReponse)
  }
}