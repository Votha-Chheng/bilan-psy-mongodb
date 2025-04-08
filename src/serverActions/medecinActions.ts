'use server'

import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError";
import { validateWithZodSchema } from "@/utils/validateWithZodSchema";
import { Medecin } from "@prisma/client";
import { z } from "zod";

export const createMedecinAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<Medecin|null>> => {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const parsedData = validateWithZodSchema( 
      z.object({
        nom: z.string().min(1, "Le nom du médecin est requis."),
      }),
      rawData
    )

    if(!parsedData.success) return validationError(parsedData)
    
    const data = parsedData.data as {nom: string}

    const res = await db.medecin.create({
      data: {
        nom: data.nom,
      }
    })
    if(!res) return dataBaseError("Une erreur est survenue lors de la création du médecin.")
    return {
      success: true,
      message: "Médecin créé avec succès.",
      data: res
    }
  } catch (error) {
    console.error(error);
    return serverError(error, "Une erreur est survenue lors de la création du médecin.")
  }
}

export const deleteMedecinAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<Medecin|null>> => {
  const rawData = Object.fromEntries(formData.entries());
  const parsedData = validateWithZodSchema(z.object({
    medecinId: z.string().min(1, "L'identifiant du médecin est requis."),
  }),
    rawData
  )

  if(!parsedData.success) return validationError(parsedData)

  const {medecinId} = parsedData.data as {medecinId: string}

  try {
    const res = await db.medecin.delete({
      where: {
        id: medecinId
      }
    })
    if(!res) return dataBaseError("Une erreur est survenue lors de la suppression du médecin.")
    return {
      success: true,
      message: "Médecin supprimé avec succès.",
      data: res
    }
  } catch (error) {
    console.error(error);
    return serverError(error, "Une erreur est survenue lors de la suppression du médecin.")
  }
}

export const fetchAllMedecins = async(): Promise<ServiceResponse<Medecin[]>> => {
  try {
    const res = await db.medecin.findMany({
      orderBy: {
        nom: "asc"
      }
    })
    if(!res) return dataBaseError("Une erreur est survenue lors de la récupération des médecins.")
    return {
      success: true,
      message: "Médecins récupérés avec succès.",
      data: res
    }
  } catch (error) {
    console.error(error);
    return serverError(error, "Une erreur est survenue lors de la récupération des médecins.")
  }
}