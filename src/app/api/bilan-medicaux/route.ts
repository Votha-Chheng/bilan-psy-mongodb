import { BilanMedicauxRaw } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest): Promise<NextResponse> {
  let serviceReponse: ServiceResponse<BilanMedicauxRaw|null> = {data: null}

  const anamneseId = request.nextUrl.searchParams.get("anamneseId")
  
  if(!anamneseId){
    serviceReponse = dataBaseError("L'ID de l'anamnèse est requis.")
    return NextResponse.json(serviceReponse)
  }

  try {
    const res = await db.bilanMedical.findUnique({
      where: {
        anamneseId
      },
      select: {
        id: true,
        anamneseId: true,
        bilanORL: true,
        bilanOphtalmo: true,
        bilanOrthophonique: true,
        bilanOrthoptique: true, 
        bilanNeuropsy: true, 
        bilanNeuropediatre: true,
        selectedBilans: true
      } 
    })
    
    if(!res){
      serviceReponse = dataBaseError("Bilan médicaux introuvables.")
      return NextResponse.json(serviceReponse)
    }
    
    serviceReponse = {
      success: true,
      data: res
    }

    return NextResponse.json(serviceReponse)
    
  } catch (error) {
    serviceReponse = serverError(error, "Erreur lors de l'accès à la base de données.")
    return NextResponse.json(serviceReponse)
  }
}