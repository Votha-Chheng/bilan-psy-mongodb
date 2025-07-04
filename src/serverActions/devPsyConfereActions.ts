'use server'

import { DevPsyConfere } from "@/@types/Anamnese"
import { ServiceResponse } from "@/@types/ServiceResponse"
import db from "@/utils/db"
import { serverError, validationError } from "@/utils/serviceResponseError"
import { validateWithZodSchema } from "@/utils/validateWithZodSchema"
import { z } from "zod"

const devPsyConfereExists = async(confere: string|undefined): Promise<ServiceResponse<boolean>> => {
  if(!confere) return { data: true, success: false, message: "Il manque l'intitulé du confère !"}

  try {
    const res: DevPsyConfere[] = await db.devPsyConfere.findMany({
      select: {
        id: true,
        confere: true
      }
    })

    if(res.length === 0) return {data: false}

    if(res.length>0){
      const result = res.find(value=> value.confere.toLowerCase() === confere.toLowerCase())
      if(!result){
        return {
          data:false,
        } 
      }
    }
    return {data: true, message: "L'intitulé existe déjà !"}
  } catch (error) {
    console.log("devPsyConfereExists", error)
    return {...serverError(error), data: true}
  }
}

export const createDevPsyConfereAction = async(prevState: ServiceResponse<null>, formData: FormData): Promise<ServiceResponse<DevPsyConfere|null>>=> {
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = validateWithZodSchema(
    z.object({
      confereDevPsy: z.string().min(1, "Intitulé du confère absent.")
    }), 
    rawData
  )

  if(!parsedData.success) return validationError(parsedData)

  const {confereDevPsy} = parsedData.data as {confereDevPsy: string}

  try {
    const {data: alreadyExist, message} = await devPsyConfereExists(confereDevPsy) 
    console.log("alreadyExist", alreadyExist, message)

    if(alreadyExist === true) return {success: false, message: message+'createDevPsyConfereAction'}

    const res = await db.devPsyConfere.create({
      data: {
        confere: confereDevPsy
      }
    })

    return {
      success: true,
      message: "Element ajoputé dans la liste !",
      data: res
    }
  } catch (error) {
    console.log("devPsyConfereExists", error)
    return serverError(error)
  }
}
