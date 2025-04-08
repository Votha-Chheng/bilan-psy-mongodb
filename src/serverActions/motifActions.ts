"use server"

import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { MotifConsultation } from "@prisma/client"

export const createMotifConsultationAction = async(motif: string): Promise<ServiceResponse<MotifConsultation|null>> => {
  try {
    const res = await db.motifConsultation.create({
      data: {
        motif
      }
    })

    if(!res) return dataBaseError()
    return {
      success: true,
      data: res
    }
  } catch (error) {
    console.log("createMotifConsultationAction Error", error)
    return serverError(error)
  } 
}

export const fetchAllMotifsConsultation = async(): Promise<ServiceResponse<MotifConsultation[]|null>> => {
  try {
    const res = await db.motifConsultation.findMany()

    if(!res) return dataBaseError("Pas de motif de consultation dans la base de données.")
    return {
      success: true,
      data: res
    }

  } catch (error) {
    console.log("motifConsultationExists Error", error)
    return serverError(error)
  } 
}

export const motifConsultationExistsAction = async(motif: string): Promise<boolean> => {
  try {
    const res = await db.motifConsultation.findFirst({
      where: {
        motif
      }
    })

    if(!res) return false
    return true
    
  } catch (error) {
    console.log("motifConsultationExists Error", error)
    return true
  } 
}