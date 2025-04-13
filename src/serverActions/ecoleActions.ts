'use server'

import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError";
import { validateWithZodSchema } from "@/utils/validateWithZodSchema";
import { Ecole } from "@prisma/client";
import { z } from "zod";

export const createEcoleAction = async (prevState: any, formData: FormData): Promise<ServiceResponse<Ecole|null>> => {
  const rawData = Object.fromEntries(formData.entries());
  const parsedData = validateWithZodSchema( 
    z.object({
      nom: z.string().min(1, "Le nom de l'école est requis."),
    }),
    rawData
  )

  if(!parsedData.success) return validationError(parsedData)

  try {
    const data = parsedData.data as {nom: string}

    const res = await db.ecole.create({
      data: {
        nom: data.nom
      }
    })
    if(!res) return dataBaseError("Impossible de créer une école pour le moment.")
    return {
      data: res,
      success:true,
      message: "Ecole ajoutée à la liste."
    }
  } catch (error) {
    console.log("createEcoleAction", error)
    return serverError(error)
  }
}

export const deleteEcoleByIdAction = async (prevState: any, formData: FormData): Promise<ServiceResponse<Ecole|null>> => {
  const rawData = Object.fromEntries(formData.entries());
  const parsedData = validateWithZodSchema( 
    z.object({
      ecoleId: z.string().min(1, "L'identifiant de l'école est requis."),
    }),
    rawData
  )

  if(!parsedData.success) return validationError(parsedData)

  try {
    const data = parsedData.data as {ecoleId: string}

    const res = await db.ecole.delete({
      where: {
        id: data.ecoleId
      }
    })

    if(!res) return dataBaseError("Impossible de supprimer cette école pour le moment.")
    return {
      data: res,
      success:true,
      message: "Ecole supprimée de la liste."
    }
  } catch (error) {
    console.log("deleteEcoleByIdAction", error)
    return serverError(error)
  }
}

export const fetchAllEcoles = async (): Promise<ServiceResponse<Ecole[]|null>> => {
  console.log("fetchAllEcoles is triggered")
  try {
    const response = await db.ecole.findMany()

    if (!response) return dataBaseError()
      
    return {
      success: true,
      data: response,
    }
  } catch (error) {
    console.log("Impossible de trouver la liste des écoles.", error)
    return serverError(error)
  }
}