import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { ProjetPsyItem } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(): Promise<NextResponse> {
  let serviceResponse: ServiceResponse<ProjetPsyItem[]|null> = {data: null}
  try {
    const res = await db.projetPsyItem.findMany()
    if(!res){
      serviceResponse = dataBaseError()
      return NextResponse.json(serviceResponse)
    }
    serviceResponse = {
      success: true,
      data: res
    }
    return NextResponse.json(serviceResponse)
    
  } catch (error) {
    console.log("fetchAllProfilPsyItems", error)
    serviceResponse = serverError(error)
    return NextResponse.json(serviceResponse)
  }
}