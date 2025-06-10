import { BilanRaw } from "@/@types/BilanTests";
import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { dataBaseError, serverError } from "@/utils/serviceResponseError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }>}): Promise<NextResponse> {
  const {id: patientId} = await context.params
  let serviceReponse: ServiceResponse<BilanRaw|null> = {data: null}

  try {
    const res = await db.bilan.findUnique({
      where: {
        patientId
      },
      select: {
        id: true,
        patientId: true,
        tests: true,
        bhk: true,
        mabc2: true,
        visuomotricenepsy2: true,
        praxiesgestuelles: true,
        imitationpositionsnepsy2: true,
        lateralite: true,
        tonus: true,
        connaissancedroitegauche: true,
        flechesnepsy2: true,
        figuresreya: true,
        figuresreyb: true,
        epreuvecubesnepsy2: true,
      }
    })

    if(!res){
      serviceReponse = dataBaseError("Aucun bilan trouvé !")
      return NextResponse.json(serviceReponse)
    } 

    serviceReponse = {
      success: true,
      data: res
    }
    return NextResponse.json(serviceReponse)

  } catch (error) {
    console.log("Error in fetchBilanResultsByPatientId", error)
    serviceReponse = serverError(error, "Erreur lors de l'accès à la base de données.")
    return NextResponse.json(serviceReponse)
  }
}