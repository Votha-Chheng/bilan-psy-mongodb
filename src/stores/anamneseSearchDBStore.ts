import { AnamneseResults, BilanMedicauxResults, ListeTypeSensorialiteDTO, TemperamentDescriptionDTO } from '@/@types/Anamnese'
import { fetchBilanMedicauxResultsByAnamneseId, fetchChosenThemes } from '@/serverActions/anamneseActions'
import { fetchDevPsyConfereListe } from '@/serverActions/devPsyConfereActions'
import { fetchAnamneseByKeysWithCache, fetchAnamneseResultsByPatientIdWithCache } from '@/serverActions/fetchingWithCache'
import { fetchAllAdjectifs, fetchAllTemperaments, fetchAllTypeSensorialite } from '@/serverActions/listeActions'
import { create } from 'zustand'

type AnamneseSearchDBState = {
  loadingAnamneseResults: boolean
  loadingBilansMedicaux: boolean
  bilanMedicauxResults : BilanMedicauxResults|null
  updateBilanMedicauxResults : (anamneseId: string|null|undefined)=> Promise<void>
  anamneseResults: AnamneseResults|null
  initializeAnamneseResultsByPatientId: (patientId: string)=> Promise<void>
  getAnamneseResultsByPatientId: (patientId: string)=> Promise<void>
  temperamentsDescription: TemperamentDescriptionDTO|null|undefined
  getListeTemperament: ()=> Promise<void>
  anamneseInDBByDomaine: (Omit<AnamneseResults, "bilanMedicauxResults">)[]|null
  devPsyConfereListe: string[]
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
  loadingAnamneseResults: false,
  loadingBilansMedicaux: false,
  bilanMedicauxResults : null,
  getAnamneseResultsByPatientId: async(patientId: string)=> {
    try {
      const result = await fetchAnamneseResultsByPatientIdWithCache(patientId)
      set({anamneseResults: result.data})
    } catch (error) {
      console.log("Can't getAnamneseResultsByPatientId", error)
    }
  },
  updateBilanMedicauxResults: async(anamneseId: string|null|undefined)=> {
    try {
      const result = await fetchBilanMedicauxResultsByAnamneseId(anamneseId)
      set({bilanMedicauxResults: result.data})
    } catch (error) {
      console.log("Can't updateBilanMedicauxResults", error)
    }
  },
  anamneseResults: null,
  initializeAnamneseResultsByPatientId: async(patientId: string)=> {
    set({loadingAnamneseResults: true})
    try {
      const result = await fetchAnamneseResultsByPatientIdWithCache(patientId)
      set({anamneseResults: result.data})
      console.log(result.data?.bilanMedicauxResults)
      set({bilanMedicauxResults: result.data?.bilanMedicauxResults})
    } catch (error) {
      console.log("Can't getAnamneseResultsByPatientId", error)
    } finally {
      set({loadingAnamneseResults: false})
    }
  },
  temperamentsDescription: null,
  getListeTemperament: async()=> {
    try {
      const result = await fetchAllTemperaments()
      set({temperamentsDescription: result.data})
    } catch (error) {
      console.log("Can't getListeTemperament", error)
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
      console.log("Can't getDevPsyConfereList", error)
    }
  },
  getAnamneseDBByKeys: async(keys: (keyof Exclude<AnamneseResults, "bilanMedicauxResults">)[])=> {
    set({loadingData: true})
    try {
      const response = await fetchAnamneseByKeysWithCache(keys)
      set({ anamneseInDBByDomaine: response.data })

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys", error)
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
      console.log("Can't initializeChosenThemes", error)
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
      console.log("Can't getAnamneseDBByKeys", error)
    }
  },
  typeSensorialite: null,
  getTypeSensorialite : async()=> {
    try {
      const response = await fetchAllTypeSensorialite()
      set({ typeSensorialite: response.data })

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys", error)
    }
  }
}))