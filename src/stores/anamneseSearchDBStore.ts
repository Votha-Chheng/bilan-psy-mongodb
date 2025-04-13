import { AnamneseResults, ListeAdjectifsDTO, ListeTypeSensorialiteDTO } from '@/@types/Anamnese'
import { fetchDevPsyConfereListe } from '@/serverActions/devPsyConfereActions'
import { fetchAnamneseByKeysWithCache } from '@/serverActions/fetchingWithCache'
import { fetchAllAdjectifs, fetchAllTypeSensorialite } from '@/serverActions/listeActions'

import { create } from 'zustand'

type AnamneseSearchDBState = {
  anamneseInDBByDomaine: AnamneseResults[]|null
  devPsyConfereListe: string[]
  getDevPsyConfereList: ()=> Promise<void>
  getAnamneseDBByKeys : (keys: (keyof AnamneseResults)[])=> Promise<void>
  loadingData: boolean
  resetAnamneseDB: ()=> void
  chosenThemes: string[]
  setChosenThemes: (value: string[])=> void
  adjectifs: ListeAdjectifsDTO|null|undefined
  getListeAdjectifs : ()=> Promise<void>
  typeSensorialite:ListeTypeSensorialiteDTO | null | undefined
  getTypeSensorialite : ()=> Promise<void>
}

export const useAnamneseSearchDBStore = create<AnamneseSearchDBState>((set) => ({
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
  setChosenThemes: (value:string[])=> {
    set({ chosenThemes: value })
  },
  adjectifs: null,
  getListeAdjectifs : async()=> {
    try {
      const response = await fetchAllAdjectifs()
      set({ adjectifs: response.data })

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