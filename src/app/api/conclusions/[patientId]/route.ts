import { ConclusionRawData } from "@/@types/ConclusionTypes";
import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { dataBaseError, serverError } from "@/utils/serviceResponseError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ patientId: string }>}): Promise<NextResponse> {
  const {patientId} = await context.params
  let serviceReponse: ServiceResponse<ConclusionRawData|null> = {data: null}
  try {
    const res = await db.conclusion.findUnique({
      where: {
        patientId
      }
    })

    if(!res){
      serviceReponse = dataBaseError()
      return NextResponse.json(serviceReponse)
    } 
    
    serviceReponse = {success: true, data: res}

    return NextResponse.json(serviceReponse)

  } catch (error) {
    console.log("Error in fetchAnamneseResultsByPatientId", error)
    serviceReponse = serverError(error, "Erreur lors de l'accès à la base de données.")
    return NextResponse.json(serviceReponse)
  }
}