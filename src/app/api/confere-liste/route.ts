import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { dataBaseError, serverError } from "@/utils/serviceResponseError";
import { DevPsyConfere } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  let serviceResponse: ServiceResponse<string[]|null> = {data: null}
  try {
    const res: DevPsyConfere[] = await db.devPsyConfere.findMany()
    if(!res){
      serviceResponse = dataBaseError("Impossible de récupérer la liste des 'confère'!")
      return NextResponse.json(serviceResponse)
    }  
    const liste = res.map(confere=> confere.confere)
    serviceResponse = {
      success: true,
      data: liste
    }

    return NextResponse.json(serviceResponse)
  } catch (error) {
    console.log("fetchDevPsyConfereListe", error)
    serviceResponse = serverError(error)
    return NextResponse.json(serviceResponse)
  }
}