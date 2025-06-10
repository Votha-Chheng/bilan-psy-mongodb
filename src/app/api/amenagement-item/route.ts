import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { serverError } from "@/utils/serviceResponseError";
import { AmenagementItem } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  let serviceResponse: ServiceResponse<AmenagementItem[]|null> = {data: null}
  try {
    const res = await db.amenagementItem.findMany()
    if(!res){
      serviceResponse = {success: false, data: null}
      return NextResponse.json(serviceResponse)
    }
    
    serviceResponse = {success: true, data: res}

    return NextResponse.json(serviceResponse)
  } catch (error) {
    console.log("Error in fetchAmenagementsCategoriesList", error)
    serviceResponse = serverError(error, "Impossible de retrouver la liste de catégories des aménagements.")
    return NextResponse.json(serviceResponse)
  }
}