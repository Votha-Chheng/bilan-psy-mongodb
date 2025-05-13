import { ObservationDTO } from "@/@types/ObservationTestDTO"
import { fetchObservationsByTestName } from "@/serverActions/observationActions"
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
      const response = await fetchObservationsByTestName("Epreuve des cubes (Nepsy 2)")
      const {data} = response ?? {}
      set({epreuvecubesnepsy2Observations: data})

    } catch (error) {
      console.log("getEpreuveCubesNepsy2Observations", error)
    }
  },
  figurereybObservations:null,
  getFigureReyBObservations: async()=> {
    try {
      const response = await fetchObservationsByTestName("Epreuve visuoconstructive en deux dimensions (Figure de Rey B)")
      const {data} = response ?? {}
      set({figurereyaObservations: data})

    } catch (error) {
      console.log("getFigureReyBObservations", error)
    }
  },
  figurereyaObservations:null,
  getFigureReyAObservations: async()=> {
    try {
      const response = await fetchObservationsByTestName("Epreuve visuoconstructive en deux dimensions (Figure de Rey A)")
      const {data} = response ?? {}
      set({figurereyaObservations: data})

    } catch (error) {
      console.log("getFigureReyAObservations", error)
    }
  },
  flechesNepsy2Observations:null,
  getFlechesNepsy2Observations: async()=> {
    try {
      const response = await fetchObservationsByTestName("Epreuve visuo-spatiale des flèches (Nepsy 2)")
      const {data} = response ?? {}
      set({flechesNepsy2Observations: data})

    } catch (error) {
      console.log("getFlechesNepsy2Observations", error)
    }
  },
  bhkObservations:null,
  getBHKObservations: async()=> {
    try {
      const response = await fetchObservationsByTestName("BHK (épreuve d'écriture)")
      const {data} = response ?? {}
      set({bhkObservations: data})

    } catch (error) {
      console.log("getBHKObservations", error)
    }
  },
  imitationNepsy2Observations:null,
  getImitationNepsy2Observations: async()=> {
    try {
      const response = await fetchObservationsByTestName("Imitation de positions de la Nepsy 2")
      const {data} = response ?? {}
      set({imitationNepsy2Observations: data})

    } catch (error) {
      console.log("getImitationNepsy2Observations", error)
    }
  },
  mabc2Observations: null,
  getMABC2Observations: async()=> {
    try {
      const response = await fetchObservationsByTestName("M-ABC2")
      const {data} = response ?? {}
      set({mabc2Observations: data})

    } catch (error) {
      console.log("getMABC2Observations", error)
    }
  },
  tonusObservations: null, 
  getTonusObservations: async()=> {
    try {
      const response = await fetchObservationsByTestName("Tonus d'action")
      const {data} = response ?? {}
      set({tonusObservations: data})
    } catch (error) {
      console.log("getTonusObservations", error)
    }
  },
  visuomotriceNepsy2Observations: null,
  getVisuomotriceNepsy2Observations: async()=> {
    try {
      const response = await fetchObservationsByTestName("Epreuve visuomotrice de la Nepsy 2")
      const {data} = response ?? {}
      set({visuomotriceNepsy2Observations: data})
    } catch (error) {
      console.log("getTonusObservations", error)
    }
  },
}))