"use server"

import { ListeAdjectifs, ListeTypeSensorialite, TemperamentDescriptionDTO } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { dataBaseError, serverError, validationError } from "@/utils/serviceResponseError"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { z } from "zod"

//formData = {listeId, typesSensorialite}
export const upsertListeSensorialiteAction = async(prevState: ServiceResponse<null>, formData: FormData): Promise<ServiceResponse<ListeTypeSensorialite|null>> => {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(
    z.object({
      typesSensorialite: z.string().min(1, "Type de sensorialité absente !"), 
      listeId: z.string().optional()
    }), rawData)

  if(!parsedData.success) return validationError(parsedData)

  const validatedData = parsedData.data as {typesSensorialite: string, listeId?: string}
  const {typesSensorialite, listeId} = validatedData

  let sensorialiteArray = null

  try {

    if(listeId){
      sensorialiteArray = await db.listeTypeSensorialite.findFirst()
      if(sensorialiteArray){
        const listSensorialite = JSON.parse(sensorialiteArray.typesSensorialite) as string[]
        const checkIfTypeExists = listSensorialite.find(value => value === typesSensorialite)

        if(checkIfTypeExists){
          return {
            success : false,
            message: "Ce type de sensorialité est déjà dans les choix !"
          }
        }

        const newList = [...listSensorialite, typesSensorialite]
        const res = await db.listeTypeSensorialite.update({
          where: {
            id: listeId
          },
          data: {
            typesSensorialite: JSON.stringify(newList)
          }
        })
        return {
          success: true,
          data: res,
          message: "Elément ajouté dans la liste !"
        }
      }
    } else {
      const res = await db.listeTypeSensorialite.create({
        data: {
          typesSensorialite: JSON.stringify([typesSensorialite])
        }
      })
      return {
        success: true,
        data: res,
        message: "Elément ajouté dans la liste !"
      }
    }

    return dataBaseError("Impossible d'ajouter l'élément !")

  } catch (error) {
    console.log("Error in upsertListeSensorialiteAction", error)
    return serverError(error, "Erreur lors de la mise à jour de a liste des types sensoriels.")
  }
}

//formData = {listeId, adjectifsComportement}
export const upsertListeAdjectifsComportementAction = async(prevState: ServiceResponse<ListeAdjectifs|null>, formData: FormData): Promise<ServiceResponse<ListeAdjectifs|null>> => {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(
    z.object({
      adjectifsComportement: z.string().min(1, "Liste d'adjectifs absente."), 
      listeId: z.string().optional()
    }), 
    rawData)
  if(!parsedData.success) return validationError(parsedData)

  const validatedData = parsedData.data as {adjectifsComportement: string, listeId?: string}
  const {adjectifsComportement, listeId} = validatedData
  try {
    const res = await db.listeAdjectifs.upsert({
      where : {
        id: listeId
      },
      create: {
        adjectifsComportement
      },
      update: {
        adjectifsComportement
      }
    })

    return {
      success: true,
      data: res,
      message: "Adjectif ajouté dans la liste !"
    }
  } catch (error) {
    console.log("Error in upsertListeAdjectifsComportementAction", error)
    return serverError(error, "Erreur lors de la mise à jour de a liste des types sensoriels.")
  }
}

export const upsertTemperamentAction = async(temperamentToAdd: string, listeId: string|null|undefined): Promise<ServiceResponse<TemperamentDescriptionDTO|null>> =>{
  const parsedData = validateWithZodSchema(
    z.string().min(1, "Il manque un adjectif à rajouter."), 
    temperamentToAdd
  )
  if(!parsedData.success) return validationError(parsedData)
  
  let existingTemperaments: string[]|null = null
  let finalTemperamentsArray: string[]|null = null

  try {
    if(listeId){
      const res = await db.temperamentDescription.findUnique({
        where: {
          id: listeId
        }
      })
      if(!res) return dataBaseError()
        existingTemperaments = res.temperamentListe ? JSON.parse(res.temperamentListe) : null
    }

    if(!existingTemperaments){
      finalTemperamentsArray = [temperamentToAdd]
    } else {
      finalTemperamentsArray = [...existingTemperaments, temperamentToAdd]
    }

    const result = await db.temperamentDescription.upsert({
      where :{
        id: listeId ?? ""
      },
      create : {
        temperamentListe:finalTemperamentsArray.length>0 ? JSON.stringify(finalTemperamentsArray) : null
      },
      update: {
        temperamentListe:finalTemperamentsArray.length>0 ? JSON.stringify(finalTemperamentsArray) : null
      }
    })

    const data: TemperamentDescriptionDTO = {...result, temperamentListe: result?.temperamentListe ? JSON.parse(result.temperamentListe):null}

    return {
      success: true,
      data,
      message: "Desciption ajouté à la liste !"
    }

  } catch (error) {
    console.log("Error in upsertAutonomieDescriptionAction", error)
    return serverError(error, "Erreur lors de la récupération de la liste.")
  }
}

export const deleteTemperamentAction = async(listeId: string|undefined|null, temperamentToDelete: string): Promise<ServiceResponse<null>> => {
  if(!listeId) return dataBaseError("La liste n'existe pas !")

  const parsedData = validateWithZodSchema(
    z.string().min(1, "Il manque un adjectif à rajouter."), 
    temperamentToDelete
  )

  if(!parsedData.success) return validationError(parsedData)

  let arrayTemperaments: string[]|null = null

  try {
    const res = await db.temperamentDescription.findUnique({
      where: {
        id: listeId
      }
    })
    if(!res) return dataBaseError()
    
    const temp: string[]|null = res?.temperamentListe ? JSON.parse(res.temperamentListe) : null

    if(!temp) return dataBaseError()
    if(temp && temp.length !== 0) {
      arrayTemperaments = temp.filter(val => val !== temperamentToDelete)
    }

    const final = (!arrayTemperaments || arrayTemperaments.length===0) ? null : JSON.stringify(arrayTemperaments)

    await db.temperamentDescription.update({
      where: {
        id: listeId
      },
      data: {
        temperamentListe: final
      }
    })

    return {
      success: true,
      message: "Description supprimée de la liste !"
    }

  } catch (error) {
    console.log("Error in deleteTemperamentAction", error)
    return serverError(error, "Erreur lors de la récupération de la liste.")
  }
}
