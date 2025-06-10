import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { TemperamentDescription } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
  let serviceReponse: ServiceResponse<TemperamentDescription|null> = {data: null}

  try {
    const res = await db.temperamentDescription.findMany()
    if(!res){
      serviceReponse = dataBaseError("Impossible de récupérer la liste des types sensoriels.")
      return NextResponse.json(serviceReponse)
    }  
    const rawData = res[0]

    if(!rawData){
      serviceReponse = {
        success: true,
        data: null
      }
      return NextResponse.json(serviceReponse)
    }
    
    serviceReponse = {
      success: true,
      data: rawData
    }
    return NextResponse.json(serviceReponse)
  } catch (error) {
    console.log("Error in fetchTemperamentListe", error)
    serviceReponse = serverError(error, "Erreur lors de la récupération des types de sensorialité.")
    return NextResponse.json(serviceReponse)
  }
}