"use server"

import { AmenagementItemDTO, AmenagementsDTO } from "@/@types/AmenagementsTypes";
import { ServiceResponse } from "@/@types/ServiceResponse";
import db from "@/utils/db";
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError";
import { validateWithZodSchema } from "@/utils/validateWithZodSchema";
import { z } from "zod";

export const fetchAllAmenagementItems = async():Promise<ServiceResponse<AmenagementItemDTO[]|null>> => {
  try {
    const res = await db.amenagementItem.findMany()
    if(!res) return {success: false, data: null}

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("Error in fetchAmenagementsCategoriesList", error)
    return serverError(error, "Impossible de retrouver la liste de catégories des aménagements.")
  }
}

export const fetchManyAmenagementItems = async(itemsIds: string[]):Promise<ServiceResponse<AmenagementItemDTO[]|null>> => {
  try {
    const res = await db.amenagementItem.findMany({
      where: {
        id: {in: itemsIds}
      }
    })
    if(!res) return {success: false, data: null}

    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("Error in fetchManyAmenagementItems", error)
    return serverError(error, "Impossible de retrouver la liste des aménagements.")
  }
}

export const fetchAmenagementsByPatientId = async(patientId: string): Promise<ServiceResponse<AmenagementsDTO|null>> => {
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

    if(!res) return {success: false, data: null}

    return {
      data: res,
      success: true
    }

  } catch (error) {
    console.log("Error in fetchAmenagementsByPatientId", error)
    return serverError(error, "Impossible de retrouver les aménagements du patient.")
  }
}

export const createAmenagementItemAction = async(amenagement: string, category: string): Promise<ServiceResponse<AmenagementItemDTO|null>> => {
  const parsedData = validateWithZodSchema(
    z.object({
      amenagement: z.string().min(1, "Ecrivez un aménagement."),
      category:  z.string().min(1, "Une catégorie est nécessaire."),
    }),
    {amenagement, category}
  )

  if(!parsedData.success) return validationError(parsedData)
  
  try {
    const amenagementExist = await db.amenagementItem.findFirst({
      where: {
        amenagement,
        category
      }
    })
    if(amenagementExist) return {success: false, message: "Cet aménagement existe déjà dans la base de données."}

    const res = await db.amenagementItem.create({
      data: {
        amenagement,
        category
      }
    })
    return {
      data: res,
      success: true,
      message: "Aménagement ajouté à la nbase de données."
    }
  } catch (error) {
    console.log("Error in fetchAmenagementsByPatientId", error)
    return serverError(error, "Impossible de retrouver les aménagements du patient.")
  }
}

export const upsertAmenagementsByAddingElementAction = async(amenagementItemId: string, patientId: string): Promise<ServiceResponse<{
  id: string;
  patientId: string;
  amenagementItemsIds: string[];
}|null>>=> {
  
  try {
    const res = await db.amenagements.upsert({
      where: {
        patientId
      },
      update: {
        amenagementItemsIds: {
          push: amenagementItemId
        }
      },
      create: {
        amenagementItemsIds: [amenagementItemId],
        patientId,
      }
    })

    if(!res) return dataBaseError()

    return {
      success: true,
      data: res,
      message: "Aménagement ajouté dans les données du patient !"
    }
  } catch (error) {
    console.log("Error in upsertAmenagementAction", error)
    return serverError(error, "Impossible de modifier la liste des aménagements.")
  }
}

export const upsertAmenagementsByRemovingElementAction = async(amenagementItemId: string, patientId: string, amenagementsListeIds: string[]|null): Promise<ServiceResponse<{
  id: string;
  patientId: string;
  amenagementItemsIds: string[];
}|null>>=> {

  const newAmemenagementItemsIds = amenagementsListeIds?.filter(id=> id !== amenagementItemId)
  
  try {
    const res = await db.amenagements.upsert({
      where: {
        patientId
      },
      update: {
        amenagementItemsIds: newAmemenagementItemsIds ?? []
      },
      create: {
        amenagementItemsIds: newAmemenagementItemsIds ?? [],
        patientId,
      }
    })

    if(!res) return dataBaseError()

    return {
      success: true,
      data: res,
      message: "Aménagement retiré des données du patient !"
    }
  } catch (error) {
    console.log("Error in upsertAmenagementsByRemovingElementAction", error)
    return serverError(error, "Impossible de modifier la liste des aménagements.")
  }
}