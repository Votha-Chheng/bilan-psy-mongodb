'use server'

import { ConclusionRawData, ProfilPsyItemDTO, ProjetPsyItemDTO } from "@/@types/ConclusionTypes"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError } from "@/utils/serviceResponseError"

export const upsertConclusionByKeyValueAction = async<T>(key: keyof ConclusionRawData, value: T, patientId: string): Promise<ServiceResponse<ConclusionRawData|null>>=> {
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

export const createProjetPsyItemAction = async(proposition: string): Promise<ServiceResponse<ProjetPsyItemDTO|null>>=> {
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

export const createProfilPsyItemAction = async(recommandation: string): Promise<ServiceResponse<ProfilPsyItemDTO|null>>=> {
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

export const deleteProfilPsyItemAction = async(id: string): Promise<ServiceResponse<ProfilPsyItemDTO|null>>=> {
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

export const deleteProjetPsyItemAction = async(id: string): Promise<ServiceResponse<ProjetPsyItemDTO|null>>=> {
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