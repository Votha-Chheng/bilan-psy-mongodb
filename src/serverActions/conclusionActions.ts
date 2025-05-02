'use server'

import { ConclusionDTO } from "@/@types/ConclusionTypes"
import { ServiceResponse } from "@/@types/ServiceResponse"
import { returnArrayIfJson } from "@/utils/arrayFunctions"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"
import { Conclusion, ProfilPsyItem, ProjetPsyItem } from "@prisma/client"
import { fetchPatientsList } from "./patientActions"
import { getPatientNameById } from "@/utils/getPatientName"

export const fetchAllConclusion = async(): Promise<ServiceResponse<{conclusionCommentaires: string|null, patientName: string|null}[]|null>>=> {
  try {
    const res = await db.conclusion.findMany()
    
    if(!res) return {success: false, data: null}

    const allPatients = await fetchPatientsList()
    if(!allPatients.data) return  {success: false, data: null}

    const data = res.map((conclusion=> ({conclusionCommentaires: conclusion.conclusionCommentaires, patientName: getPatientNameById(allPatients.data ?? null, conclusion.patientId)})))

    return {
      success: true,
      data
    }

  } catch (error) {
    console.log("fetchAllConclusion", error)
    return serverError(error)
  } 
}

export const fetchConclusionPatientId = async(patientId: string): Promise<ServiceResponse<ConclusionDTO|null>> => {
  try {
    const res = await db.conclusion.findUnique({
      where: {
        patientId
      }
    })
    if(!res) return dataBaseError()
    
    const data: ConclusionDTO = {
      ...res,
      profilPsy: returnArrayIfJson(res.profilPsy),
      projetPsy: returnArrayIfJson(res.projetPsy)
    }

    return {
      data,
      success: true
    }
  } catch (error) {
    console.log("fetchConclusionPatientId", error)
    return serverError(error)
  }
}

export const upsertConclusionByKeyValueAction = async<T>(key: keyof Conclusion, value: T, patientId: string): Promise<ServiceResponse<Conclusion|null>>=> {
  const updatedValue= Array.isArray(value) ? {[key]: JSON.stringify(value)} : {[key]: value}

  try {
    const res = await db.conclusion.upsert({
      where: {
        patientId
      },
      create: {
        ...updatedValue,
        patient: {
          connect: {
            id: patientId
          }
        }
      },
      update: updatedValue    
    })

    return {
      success: true,
      data:res,
      message:"Conclusion modifiée."
    }
  } catch (error) {
    console.log("upsertConclusionByKeyValueAction", error)
    return serverError(error)
  }
}

export const fetchAllProfilPsyItems = async(): Promise<ServiceResponse<ProfilPsyItem[]|null>>=> {
  try {
    const res = await db.profilPsyItem.findMany()
    if(!res) return dataBaseError()
    return {
      data: res,
      success: true
    }
  } catch (error) {
    console.log("fetchAllProfilPsyItems", error)
    return serverError(error)
  }
}

export const fetchAllProjetPsyItems = async(): Promise<ServiceResponse<ProjetPsyItem[]|null>>=> {
  try {
    const res = await db.projetPsyItem.findMany()
    if(!res) return dataBaseError()
    return {
      data: res,
      success: true
    }
  } catch (error) {
    console.log("fetchAllProjetPsyItems", error)
    return serverError(error)
  }
}

export const createProjetPsyItemAction = async(proposition: string): Promise<ServiceResponse<ProjetPsyItem|null>>=> {
  try {
    const item = await db.projetPsyItem.findFirst({
      where: {
        proposition
      }
    })

    if(item) return {success: false, message: "La proposition existe déjà dans la base de données !"}
    const res = await db.projetPsyItem.create({
      data: {
        proposition
      }
    })
    if(!res) return dataBaseError()
    return {
      data: res,
      success: true,
      message: "Proposition ajoutée dans la base de données !"
    }
  } catch (error) {
    console.log("createProjetPsyItemAction", error)
    return serverError(error)
  }
}

export const createProfilPsyItemAction = async(recommandation: string): Promise<ServiceResponse<ProfilPsyItem|null>>=> {
  try {
    const item = await db.profilPsyItem.findFirst({
      where: {
        recommandation
      }
    })

    if(item) return {success: false, message: "La recommandation existe déjà dans la base de données !"}

    const res = await db.profilPsyItem.create({
      data: {
        recommandation
      }
    })
    if(!res) return dataBaseError()
    return {
      data: res,
      success: true,
      message: "Recommandation ajoutée dans la base de données !"
    }
  } catch (error) {
    console.log("createProfilPsyItemAction", error)
    return serverError(error)
  }
}

export const deleteProfilPsyItemAction = async(id: string): Promise<ServiceResponse<ProfilPsyItem|null>>=> {
  try {
    const res = await db.profilPsyItem.delete({
      where: {
        id
      }
    })
    if(!res) return dataBaseError()
    return {
      data: res,
      success: true,
      message: "Recommandation supprimmée de la base de données !"
    }
  } catch (error) {
    console.log("deleteProfilPsyItemAction", error)
    return serverError(error)
  }
}

export const deleteProjetPsyItemAction = async(id: string): Promise<ServiceResponse<ProjetPsyItem|null>>=> {
  try {
    const res = await db.projetPsyItem.delete({
      where: {
        id
      }
    })
    if(!res) return dataBaseError()
    return {
      data: res,
      success: true,
      message: "Propsosition supprimmée de la base de données !"
    }
  } catch (error) {
    console.log("deleteProjetPsyItemAction", error)
    return serverError(error)
  }
}