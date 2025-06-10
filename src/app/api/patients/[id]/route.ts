import { PatientInfosGenerales } from "@/@types/PatientTypes"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }>}): Promise<NextResponse> {
  const {id: patientId} = await context.params
  let serviceReponse: ServiceResponse<PatientInfosGenerales|null> = {data: null}

  try{
    const res = await db.patient.findUnique({
      where: {
        id: patientId
      },
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
        ecole: true,
        dateBilan: true
      }
    }) 
    if(!res){
      serviceReponse = dataBaseError("Patient introuvable.")
      return NextResponse.json(serviceReponse)
    }
    
    serviceReponse = {
      success: true,
      data: res
    }

    return NextResponse.json(serviceReponse)
    
  } catch (error) {
    console.log("Error in fetchPatientById", error)
    serviceReponse = serverError(error, "Erreur lors de l'accès à la base de données.")
    return NextResponse.json(serviceReponse)
  }
}