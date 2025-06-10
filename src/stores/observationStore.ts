import { ObservationDTO, ObservationResponseJSON } from "@/@types/ObservationTestDTO"
import { ServiceResponse } from "@/@types/ServiceResponse"
import { create } from "zustand"

type ObservationState = {
  epreuvecubesnepsy2Observations: ObservationDTO[]|null
  getEpreuveCubesNepsy2Observations: ()=> Promise<void>
  figurereybObservations: ObservationDTO[]|null
  getFigureReyBObservations: ()=> Promise<void>
  figurereyaObservations: ObservationDTO[]|null
  getFigureReyAObservations: ()=> Promise<void>
  bhkObservations: ObservationDTO[]|null
  getBHKObservations: ()=> Promise<void>
  imitationNepsy2Observations: ObservationDTO[]|null
  getImitationNepsy2Observations: ()=> Promise<void>
  mabc2Observations: ObservationDTO[]|null
  getMABC2Observations: ()=> Promise<void>
  tonusObservations: ObservationDTO[]|null
  getTonusObservations:()=> Promise<void>
  visuomotriceNepsy2Observations: ObservationDTO[]|null
  getVisuomotriceNepsy2Observations:()=> Promise<void>
  flechesNepsy2Observations: ObservationDTO[]|null
  getFlechesNepsy2Observations:()=> Promise<void>
}

export const useObservationStore = create<ObservationState>((set) => ({
  epreuvecubesnepsy2Observations:null,
  getEpreuveCubesNepsy2Observations: async()=> {
    try {
      const response = await fetch("/api/observations/epreuvecubesnepsy2?machin=2")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
  
        set({epreuvecubesnepsy2Observations: parsed})

      }

    } catch (error) {
      console.log("getEpreuveCubesNepsy2Observations", error)
    }
  },
  figurereybObservations:null,
  getFigureReyBObservations: async()=> {
    try {
      const response = await fetch("/api/observations/figuresreyb")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
  
        set({figurereyaObservations: parsed})

      }

    } catch (error) {
      console.log("getFigureReyBObservations", error)
    }
  },
  figurereyaObservations:null,
  getFigureReyAObservations: async()=> {
    try {
      const response = await fetch("/api/observations/figuresreya")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
        set({figurereyaObservations: parsed})

      }

    } catch (error) {
      console.log("getFigureReyAObservations", error)
    }
  },
  flechesNepsy2Observations:null,
  getFlechesNepsy2Observations: async()=> {
    try {
      const response = await fetch("/api/observations/flechesnepsy2")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
        set({flechesNepsy2Observations: parsed})

      }

    } catch (error) {
      console.log("getFlechesNepsy2Observations", error)
    }
  },
  bhkObservations:null,
  getBHKObservations: async()=> {
    try {
      const response = await fetch("/api/observations/bhk")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
        set({bhkObservations: parsed})
      }

    } catch (error) {
      console.log("getBHKObservations", error)
    }
  },
  imitationNepsy2Observations:null,
  getImitationNepsy2Observations: async()=> {
    try {
      const response = await fetch("/api/observations/imitationpositionsnepsy2")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
        set({imitationNepsy2Observations: parsed})
      }
    } catch (error) {
      console.log("getImitationNepsy2Observations", error)
    }
  },
  mabc2Observations: null,
  getMABC2Observations: async()=> {
    try {
      const response = await fetch("/api/observations/mabc2")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
  
        set({mabc2Observations: parsed})
      }

    } catch (error) {
      console.log("getMABC2Observations", error)
    }
  },
  tonusObservations: null, 
  getTonusObservations: async()=> {
    try {
      const response = await fetch("/api/observations/tonus")
      const responseJson: ServiceResponse<ObservationResponseJSON[]|null> = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = data.map((data: ObservationResponseJSON) => ({
          ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
  
        set({tonusObservations: parsed as ObservationDTO[]})

      }
    } catch (error) {
      console.log("getTonusObservations", error)
    }
  },
  visuomotriceNepsy2Observations: null,
  getVisuomotriceNepsy2Observations: async()=> {
    try {
      const response = await fetch("/api/observations/visuomotricenepsy2")
      const responseJson = await response.json()
      const {data} = responseJson?? {}

      if(data){
        const parsed: ObservationDTO[] = responseJson.data.map((data: ObservationResponseJSON) => ({
        ...data,
          listeObservations: data?.listeObservations ? JSON.parse(data.listeObservations) as string[]|null : null
        }))
        set({visuomotriceNepsy2Observations: parsed})
      }
    } catch (error) {
      console.log("getVisuomotriceNepsy2Observations", error)
    }
  },
}))