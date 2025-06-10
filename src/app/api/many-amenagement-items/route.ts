import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { serverError } from "@/utils/serviceResponseError";
import { AmenagementItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url)
  const ids = url.searchParams.get("ids")
  const idsArray = ids ? ids.split(",") : []
  let serviceResponse: ServiceResponse<AmenagementItem[]|null> = {data: null}
  try {
    const res = await db.amenagementItem.findMany({
      where: {
        id: {in: idsArray}
      }
    })
    if(!res){
      serviceResponse = {success: false, data: null}
      return NextResponse.json(serviceResponse)
    }

    serviceResponse = {success: true, data: res}

    return NextResponse.json(serviceResponse)

  } catch (error) {
    console.log("Error in fetchManyAmenagementItems", error)
    serviceResponse = serverError(error, "Impossible de retrouver la liste des aménagements.")
    return NextResponse.json(serviceResponse)
  }
}