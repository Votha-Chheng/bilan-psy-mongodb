"use server"

import { bilanSelectOptions } from "@/datas/prismaSelectOptions"
import db from "@/utils/db"

export const fetchBilanResultsByPatienId = async(patientId: string)=> {
  try {
    const res = await db.bilan.findUnique({
      where: {
        id: patientId
      },
      select : bilanSelectOptions
    })
  } catch (error) {
    
  }
}