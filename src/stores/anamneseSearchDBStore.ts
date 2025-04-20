import { AnamneseResults, anamneseResultsKeys, AutonomieDescriptionDTO, ListeAdjectifsDTO, ListeTypeSensorialiteDTO, TemperamentDescriptionDTO } from '@/@types/Anamnese'
import { fetchChosenThemes } from '@/serverActions/anamneseActions'
import { fetchDevPsyConfereListe } from '@/serverActions/devPsyConfereActions'
import { fetchAnamneseByKeysWithCache } from '@/serverActions/fetchingWithCache'
import { fetchAllAdjectifs, fetchAllTemperaments, fetchAllTypeSensorialite, fetchAutonomieDescriptions } from '@/serverActions/listeActions'

import { create } from 'zustand'

type AnamneseSearchDBState = {
  temperamentsDescription: TemperamentDescriptionDTO|null|undefined
  getListeTemperament: ()=> Promise<void>
  anamneseInDBByDomaine: AnamneseResults[]|null
  devPsyConfereListe: string[]
  autonomieDescription: AutonomieDescriptionDTO|null
  getAutonomieDescriptionsListe: ()=> void
  getDevPsyConfereList: ()=> Promise<void>
  getAnamneseDBByKeys : (keys: (keyof AnamneseResults)[])=> Promise<void>
  loadingData: boolean
  resetAnamneseDB: ()=> void
  chosenThemes: string[]
  initializeChosenThemes: (patientId: string)=> Promise<void>
  setChosenThemes: (value: string[])=> void
  listeAdjectifsId: string|null|undefined
  adjectifsComportement: string[]|null|undefined
  getListeAdjectifs : ()=> Promise<void>
  typeSensorialite:ListeTypeSensorialiteDTO | null | undefined
  getTypeSensorialite : ()=> Promise<void>
}

export const useAnamneseSearchDBStore = create<AnamneseSearchDBState>((set) => ({
  temperamentsDescription: null,
  getListeTemperament: async()=> {
    try {
      const result = await fetchAllTemperaments()
      set({temperamentsDescription: result.data})
    } catch (error) {
      console.log("Can't getListeTemperament")
    }
  },
  autonomieDescription: null,
  getAutonomieDescriptionsListe: async()=> {
    try {
      const result = await fetchAutonomieDescriptions()
      set({autonomieDescription: result.data})
      
    } catch (error) {
      console.log("Can't getAutonomieDescriptionsListe")
    }
  },
  anamneseInDBByDomaine: null,
  loadingData: false,
  devPsyConfereListe: [],
  bilanMedical: null,
  getDevPsyConfereList: async()=> {
    try {
      const response = await fetchDevPsyConfereListe()
      set({ devPsyConfereListe: response.data ?? [] })

    } catch (error) {
      console.log("Can't getDevPsyConfereList")
    }
  },
  getAnamneseDBByKeys: async(keys: (keyof AnamneseResults)[])=> {
    set({loadingData: true})
    try {
      const response = await fetchAnamneseByKeysWithCache(keys)
      set({ anamneseInDBByDomaine: response.data })

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys")
    } finally {
      set({loadingData: false})
    }
  },
  resetAnamneseDB: () => set({ anamneseInDBByDomaine: null }),
  chosenThemes: [],
  initializeChosenThemes: async(patientId: string)=> {
    try{
      const result = await fetchChosenThemes(patientId)
      set({ chosenThemes: result.data ?? []})

    } catch (error){
      console.log("Can't initializeChosenThemes")
    }
  },
  setChosenThemes: (value:string[])=> {
    set({ chosenThemes: value })
  },
  listeAdjectifsId: null,
  adjectifsComportement: null,
  getListeAdjectifs : async()=> {
    try {
      const response = await fetchAllAdjectifs()
      const {adjectifsComportement, id} = response.data ?? {}
      set({ adjectifsComportement})
      set({ listeAdjectifsId: id})

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys")
    }
  },
  typeSensorialite: null,
  getTypeSensorialite : async()=> {
    try {
      const response = await fetchAllTypeSensorialite()
      set({ typeSensorialite: response.data })

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys")
    }
  }
}))