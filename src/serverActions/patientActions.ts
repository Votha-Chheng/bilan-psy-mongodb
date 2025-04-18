'use server'

import { PatientInfoFromDB, PatientInfosGenerales } from "@/@types/PatientTypes";
import { ServiceResponse } from "@/@types/ServiceResponse";
import db  from "@/utils/db";
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError";
import { validateWithZodSchema } from "@/utils/validateWithZodSchema";
import { CreatePatientSchema } from "@/zodSchemas/patientSchemas";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createMotifConsultationAction, motifConsultationExistsAction } from "./motifActions";
import { returnArrayIfJson, returnParseAnamneseResult } from "@/utils/arrayFunctions";
import { BilanMedicauxResults } from "@/@types/Anamnese";

export const createPatientAction = async (prevState: any, formData: FormData): Promise<ServiceResponse<PatientInfoFromDB|null>> => {
  const rawData = Object.fromEntries(formData)
  const response = validateWithZodSchema(CreatePatientSchema, rawData)
  
  if(!response.success) return validationError(response)
    
  const data = response.data as Partial<PatientInfoFromDB>

  let id = null

  try {
    const motifExists = await motifConsultationExistsAction(data.motif!)

    if(!motifExists) {
      await createMotifConsultationAction(data.motif!)
    }

    const res = await db.patient.create({
      data: {
        nom: data.nom!,
        prenom: data.prenom!,
        dateNaissance: data.dateNaissance!,
        sexe: data.sexe!,
        adulte: data.adulte!,
        medecin: data.medecin,
        motif: data.motif,
        ecole: data.ecole,
        user: {
          connect: {
            id: data.userId
          }
        }
      }
    })

    if(!res) return dataBaseError("Erreur lors de la création du patient.")

    id = res.id
      
  } catch (error) {
    console.log("Error in createPatientAction", error)
    return serverError(error, "Erreur lors de la création du patient.")
  }
  
  redirect(`/creer-bilan/${id}`)

}

export const fetchPatientsList = async (): Promise<ServiceResponse<PatientInfosGenerales[]|null>> => {
  console.log("fetchPatientsList is triggered")
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

    if(!res) return dataBaseError("Aucun patient trouvé")

    return {
      data: res,
      success: true,
    }

  } catch (error) {
    console.log("Error in fetchPatientsList", error)
    return serverError(error, "Erreur lors de la récupération des patients.")
  }
}

export const fetchPatientById = async (id: string): Promise<ServiceResponse<PatientInfoFromDB|null>> => {
  console.log("fetchPatientById is triggered");
  
  try {
    const res = await db.patient.findUnique({
      where: {
        id
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
        dateBilan: true,
        anamnese: {
          select: {
            id: true,
            patientId: true,
            proposPapaOuMaman: true,
            notesBrutes: true,
            fratrie: true,
            compositionFamiliale: true,
            neant: true,
            dossierMDPH: true,
            maladiesEventuelles : true,
            accompagnementSuivi: true,
            autresAntecedents : true,
            handicap: true,
            bilansMedicauxResults: {
              select: {
                id: true,
                bilanORL: true,
                bilanOphtalmo: true,
                bilanOrthophonique: true,
                bilanOrthoptique: true, 
                bilanNeuropsy: true, 
                bilanNeuropediatre: true,
                selectedBilans: true
              }
            },
            confereDevPsy: true,
            accouchement: true,
            grossesse: true,
            stationAssise: true,
            quadrupedie: true,
            ageMarche: true,
            acquisitionLangage: true,
            continence : true,
            sommeil: true,
            alimentation: true,
            autresDevPsy: true,
            velo: true,
            motriciteGlobale: true,
            motriciteFine: true,
            praxiesGestuelles: true,
            extraScolaire: true,
            sensorialite: true,
            autresMotricite: true,
            classe: true,
            apprentissages: true,
            outils: true,
            ecriture: true,
            cartableBureau: true,
            relationsPairs: true,
            comportement: true,
            attention: true,
            cahiers: true,
            anterieur: true,
            decritAuQuotidien: true, 
            autonomie: true, 
            ecouteConsignes: true,
            agitationMotrice: true, 
            devoirs: true, 
            gestionEmotions: true, 
            gestionTemps: true,
            temperament: true, 
            sommeilQuotidien: true, 
            alimentationQuotidien: true, 
            autresQuotidien: true
          }
        }
      }
    })

    if(!res) return dataBaseError(`Aucun patient ne correspond à l'id n° ${id}`) 

    const {anamnese: { ...anamneseNested }, ...patientInfoRest} = res
    const {bilansMedicauxResults} = anamneseNested
    const {bilanNeuropediatre, bilanNeuropsy, bilanORL, bilanOphtalmo, bilanOrthophonique, bilanOrthoptique, selectedBilans, ...rest} = bilansMedicauxResults ?? {}

    const bilansParsed: BilanMedicauxResults = {
      bilanNeuropediatre: returnArrayIfJson(bilanNeuropediatre ?? null) ?? undefined,
      bilanNeuropsy: returnArrayIfJson(bilanNeuropsy ?? null) ?? undefined,
      bilanORL: returnArrayIfJson(bilanORL ?? null) ?? undefined,
      bilanOphtalmo: returnArrayIfJson(bilanOphtalmo ?? null) ?? undefined,
      bilanOrthophonique: returnArrayIfJson(bilanOrthophonique ?? null) ?? undefined,
      bilanOrthoptique: returnArrayIfJson(bilanOrthoptique ?? null) ?? undefined,
      selectedBilans: returnArrayIfJson(selectedBilans ?? null) ?? undefined
    }

    const data: PatientInfoFromDB = {
      ...patientInfoRest, 
      anamnese: {...returnParseAnamneseResult(anamneseNested), bilansMedicauxResults : {...bilansParsed, ...rest}}
    }

    return {
      data,
      success: true,
    }

  } catch (error) {
    console.log("Error in fetchPatientById", error)
    return serverError(error, "Erreur lors de la récupération du patient.")
  }
}

export const deletePatientByIdAction = async (prevState: any, formData: FormData): Promise<ServiceResponse<null>> => {
  try {
    const rawData = Object.fromEntries(formData)
    const response = validateWithZodSchema(
      z.object({
        patientId: z.string().min(1, { message: "L'identifiant du patient est absent." })
      }),
      rawData
    )

    if(!response.success) return validationError(response)

    const id = response.data as { patientId: string }

    const res = await db.patient.delete({
      where: {
        id: id.patientId
      }
    })

    if(!res) return dataBaseError(`Aucun patient ne correspond à l'id n° ${id.patientId}`)
    
    return {
      success: true,
      message:" Patient supprimé de la base de données"
    }
    
  } catch (error) {
    console.log("Error in deletePatientByIdAction", error)
    return serverError(error, "Erreur lors de la suppression du patient.")
  }
}

export const updateDateBilanAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<null>> => {
  const rawData = Object.fromEntries(formData)

  const parsedData = validateWithZodSchema(
    z.object({
      patientId: z.string().min(1, { message: "L'identifiant du patient est absent." }),
      dateBilan: z.string().min(1, { message: "Date du bilan absent." })
    }),
    rawData
  )

  if(!parsedData.success) return validationError(parsedData)
  const data = parsedData.data as {patientId: string, dateBilan: string}

  try {
    const res = await db.patient.update({
      where: {
        id: data.patientId,
      },
      data: {
        dateBilan: data.dateBilan
      }
    })

    if(!res) return dataBaseError(`Impossible de mettre à jour la date du bilan.`)
    return {
      success: true,
      message: "Date du bilan modifiée avec succès."
    }

  } catch (error) {
    console.log("Error in updateDateBilanAction", error)
    return serverError(error, "Erreur lors de l'enregistrement de la date du bilan.")
  }
}

export const updateMotifConsultation = async(prevState: any, formData: FormData): Promise<ServiceResponse<null>> => {
  const rawData = Object.fromEntries(formData)

  const parsedData = validateWithZodSchema(
    z.object({
      patientId: z.string().min(1, { message: "L'identifiant du patient est absent." }),
      motif: z.string().min(1, { message: "Motif absent." })
    }),
    rawData
  )

  if(!parsedData.success) return validationError(parsedData)
  const data = parsedData.data as {patientId: string, motif: string}

  try {
    const motifExists = await motifConsultationExistsAction(data.motif)

    if(!motifExists) {
      await createMotifConsultationAction(data.motif)
    }

    const res = await db.patient.update({
      where: {
        id: data.patientId,
      },
      data: {
        motif: data.motif
      }
    })

    if(!res) return dataBaseError(`Impossible de mettre à jour le motif.`)
    return {
      success: true,
      message: "Motif modifiée avec succès."
    }

  } catch (error) {
    console.log("Error in updateDateBilanAction", error)
    return serverError(error, "Erreur lors de l'enregistrement du motif.")
  }
}

