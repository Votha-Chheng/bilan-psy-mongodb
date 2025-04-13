"use server"

import { ListeAdjectifsDTO, ListeTypeSensorialiteDTO } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { ListeAdjectifs, ListeTypeSensorialite } from "@prisma/client"
import { z } from "zod"

//formData = {listeId, typesSensorialite}
export const upsertListeSensorialiteAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<ListeTypeSensorialite>> => {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(
    z.object({
      typesSensorialite: z.string().min(1, "Liste de types sensoriels absent."), 
      listeId: z.string().optional()
    }), rawData)
  if(!parsedData.success) return validationError(parsedData)

  const validatedData = parsedData.data as {typesSensorialite: string, listeId?: string}
  const {typesSensorialite, listeId} = validatedData
  try {
    const res = await db.listeTypeSensorialite.upsert({
      where : {
        id: listeId
      },
      create: {
        typesSensorialite
      },
      update: {
        typesSensorialite
      }
    })

    return {
      success: true,
      data: res,
      message: "Elément ajouté dans la liste !"
    }
  } catch (error) {
    console.log("Error in upsertListeSensorialiteAction", error)
    return serverError(error, "Erreur lors de la mise à jour de a liste des types sensoriels.")
  }
}

//formData = {listeId, adjectifs}
export const upsertListeAdjectifsAction = async(prevState: any, formData: FormData): Promise<ServiceResponse<ListeAdjectifs>> => {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(
    z.object({
      adjectifs: z.string().min(1, "Liste d'adjectifs absente."), 
      listeId: z.string().optional()
    }), 
    rawData)
  if(!parsedData.success) return validationError(parsedData)

  const validatedData = parsedData.data as {adjectifs: string, listeId?: string}
  const {adjectifs, listeId} = validatedData
  try {
    const res = await db.listeAdjectifs.upsert({
      where : {
        id: listeId
      },
      create: {
        adjectifs
      },
      update: {
        adjectifs
      }
    })

    return {
      success: true,
      data: res,
      message: "Adjectif ajouté dans la liste !"
    }
  } catch (error) {
    console.log("Error in upsertListeSensorialiteAction", error)
    return serverError(error, "Erreur lors de la mise à jour de a liste des types sensoriels.")
  }
}

export const fetchAllTypeSensorialite = async(): Promise<ServiceResponse<ListeTypeSensorialiteDTO|null>>=> {
  try {
    const res = await db.listeTypeSensorialite.findMany()
    if(!res) return dataBaseError("Impossible de récupérer la liste des types sensoriels.")
    const rawData = res[0] as ListeTypeSensorialite

    if(!rawData){
      return {
        success: true,
        data: null
      }
    }
    const copy = {...rawData, typesSensorialite: rawData.typesSensorialite? JSON.parse(rawData.typesSensorialite) as string[] : []}

    return {
      success: true,
      data: copy
    }
  } catch (error) {
    console.log("Error in upsertListeSensorialiteAction", error)
    return serverError(error, "Erreur lors de la récupération de la liste.")
  }
}

export const fetchAllAdjectifs = async(): Promise<ServiceResponse<ListeAdjectifsDTO|null>>=> {
  try {
    const res = await db.listeAdjectifs.findMany()
    if(!res) return dataBaseError("Impossible de récupérer la liste des types sensoriels.")

    const rawData = res[0] as ListeAdjectifs

    if(!rawData){
      return {
        success: true,
        data: null
      }
    }

    const copy: ListeAdjectifsDTO = {...rawData, adjectifs: rawData?.adjectifs ? JSON.parse(rawData.adjectifs) as string[] : []}

    return {
      success: true,
      data: copy
    }
  } catch (error) {
    console.log("Error in upsertListeSensorialiteAction", error)
    return serverError(error, "Erreur lors de la récupération de la liste.")
  }
}