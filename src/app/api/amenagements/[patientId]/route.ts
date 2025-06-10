import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { serverError } from "@/utils/serviceResponseError";
import { Amenagements } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ patientId: string }>}): Promise<NextResponse> {
  const {patientId} = await context.params
  let serviceResponse: ServiceResponse<Amenagements|null> = {data: null}

   try {
    const res = await db.amenagements.findUnique({
      where: {
        patientId
      },
      select: {
        id: true,
        patientId: true,
        amenagementItemsIds: true
      }
    })

    if(!res) {
      serviceResponse = {success: false, data: null}
      return NextResponse.json(serviceResponse)
    } 

    serviceResponse = {success: true, data: res}
    return NextResponse.json(serviceResponse)

  } catch (error) {
    console.log("Error in fetchAmenagementsByPatientId", error)
    serviceResponse = serverError(error, "Impossible de retrouver les aménagements du patient.")
    return NextResponse.json(serviceResponse)
  }
}