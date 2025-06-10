import { PatientInfosGenerales } from "@/@types/PatientTypes";
import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { dataBaseError, serverError } from "@/utils/serviceResponseError";
import { NextResponse } from "next/server";

export async function GET() {
  let serviceReponse: ServiceResponse<PatientInfosGenerales[]|null> = {data: null}

  try {
    const res = await db.patient.findMany({
      select: {
        id: true,
        nom: true,
        prenom: true,
        dateNaissance: true,
        sexe: true,
        adulte: true,
        medecin: true,
        motif: true,
        createdAt: true,
        updated: true,
        ecole: true
      },
      orderBy: {
        updated: "desc"
      }
    })

    if(!res) {
      serviceReponse = dataBaseError("Aucun patient trouvé")
      return NextResponse.json(serviceReponse)
    } 

    serviceReponse = {
      data: res,
      success: true,
    }

    return NextResponse.json(serviceReponse)

  } catch (error) {
    console.log("Error in fetchPatientsList", error)
    serviceReponse = serverError(error, "Erreur lors de la récupération des patients.")
    return NextResponse.json(serviceReponse)
  }
}