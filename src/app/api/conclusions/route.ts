import { ConclusionRawData } from "@/@types/ConclusionTypes";
import { PatientInfosGenerales } from "@/@types/PatientTypes";
import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { getPatientNameById } from "@/utils/getPatientName";
import { serverError } from "@/utils/serviceResponseError";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  let serviceReponse: ServiceResponse<{conclusionCommentaires: string|null, patientName: string|null}[]|null> = {data: null}

  try {
    const res = await db.conclusion.findMany()
    
    if(!res){
      serviceReponse = {success: false, data: null}
      return NextResponse.json(serviceReponse)
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/patients`)
    const {data: allPatients}: ServiceResponse<PatientInfosGenerales[]|null> = await response.json()
    if(!allPatients) {
      serviceReponse = {success: false, data: null}
      return NextResponse.json(serviceReponse)
    }

    const data = res.map(((conclusion: ConclusionRawData)=> ({conclusionCommentaires: conclusion.conclusionCommentaires, patientName: getPatientNameById(allPatients ?? null, conclusion.patientId ?? "")})))


    serviceReponse = {
      success: true,
      data
    }
    return NextResponse.json(serviceReponse)

  } catch (error) {
    console.log("fetchAllConclusion", error)
    serviceReponse = serverError(error)
    return NextResponse.json(serviceReponse)
  } 
}