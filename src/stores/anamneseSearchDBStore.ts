import { AnamneseRawData, AnamneseResults, BilanMedicauxResults, ListeAdjectifsDTO, ListeTypeSensorialite, ListeTypeSensorialiteDTO, TemperamentDescriptionDTO } from '@/@types/Anamnese'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { returnArrayIfJson } from '@/utils/arrayFunctions'
import { returnParseAnamneseResult, returnParseBilanMedicauxResults } from '@/utils/parsingDatasFunctions'
import { getChosenThemeArray } from '@/utils/sortAnamneseDatas'
import { ListeAdjectifs, TemperamentDescription } from '@prisma/client'
import { create } from 'zustand'

type AnamneseSearchDBState = {
  loadingAnamneseResults: boolean
  loadingBilansMedicaux: boolean
  bilanMedicauxResults : BilanMedicauxResults|null
  updateBilanMedicauxResults : (anamneseId: string|null|undefined)=> Promise<void>
  anamneseResults: AnamneseResults|null
  initializeAnamneseResultsByPatientId: (patientId: string)=> Promise<void>
  initializeBilansMedicauxResultsByAnamneseId: (anamneseId: string|null|undefined)=> Promise<void>
  updateAnamneseResultsByPatientId: (patientId: string)=> Promise<void>
  temperamentsDescription: TemperamentDescriptionDTO|null|undefined
  getListeTemperament: ()=> Promise<void>
  anamneseInDBByDomaine: (Omit<AnamneseResults, "bilanMedicauxResults">)[]|null
  devPsyConfereListe: string[]
  getDevPsyConfereList: ()=> Promise<void>
  getAnamneseDBByKeys : (keys: (keyof AnamneseResults)[])=> Promise<void>
  loadingData: boolean
  resetAnamneseDB: ()=> void
  chosenThemes: string[]
  initializeChosenThemes: ()=> void
  setChosenThemes: (value: string[])=> void
  listeAdjectifsId: string|null|undefined
  adjectifsComportement: string[]|null|undefined
  getListeAdjectifs : ()=> Promise<void>
  typeSensorialite:ListeTypeSensorialiteDTO | null | undefined
  getTypeSensorialite : ()=> Promise<void>
}

export const useAnamneseSearchDBStore = create<AnamneseSearchDBState>((set, get) => ({
  loadingAnamneseResults: false,
  loadingBilansMedicaux: false,
  bilanMedicauxResults : null,
  updateAnamneseResultsByPatientId: async(patientId: string)=> {
    try {
      const res = await fetch(`/api/anamnese/${patientId}`)
      const result: ServiceResponse<AnamneseRawData|null> = await res.json()
      const {data} = result ?? {}
      set({anamneseResults: returnParseAnamneseResult(data)})

    } catch (error) {
      console.log("Can't getAnamneseResultsByPatientId", error)
    }
  },
  updateBilanMedicauxResults: async(anamneseId: string|null|undefined)=> {
    try {
      const res = await fetch(`/api/bilan-medicaux?anamneseId=${anamneseId}`)
      const result = await res.json()
      const bilansParsed: BilanMedicauxResults = returnParseBilanMedicauxResults(result.data)
      console.log(bilansParsed)
      set({bilanMedicauxResults: bilansParsed})
    } catch (error) {
      console.log("Can't updateBilanMedicauxResults", error)
    }
  },
  anamneseResults: null,
  initializeBilansMedicauxResultsByAnamneseId: async(anamneseId: string|null|undefined)=> {
    set({loadingBilansMedicaux: true})
    try {
      const res = await fetch(`/api/bilan-medicaux?anamneseId=${anamneseId}`)
      const result = await res.json()
      const bilansParsed: BilanMedicauxResults = returnParseBilanMedicauxResults(result.data)
      console.log(bilansParsed)
      set({bilanMedicauxResults: bilansParsed})
    } catch (error) {
      console.log("Can't initializeBilansMedicauxResultsByAnamneseId", error)
    } finally {
      set({loadingBilansMedicaux: false})
    }
  },
  initializeAnamneseResultsByPatientId: async(patientId: string)=> {
    set({loadingAnamneseResults: true})
    try {
      const res = await fetch(`/api/anamnese/${patientId}`)
      const result: ServiceResponse<AnamneseRawData|null> = await res.json()
      const {data} = result ?? {}
      console.log(returnParseAnamneseResult(data))
      set({anamneseResults: returnParseAnamneseResult(data)})

    } catch (error) {
      console.log("Can't getAnamneseResultsByPatientId", error)
    } finally {
      set({loadingAnamneseResults: false})
    }
  },
  temperamentsDescription: null,
  getListeTemperament: async()=> {
    try {
      const response = await fetch("/api/temperament")
      const res: ServiceResponse<TemperamentDescription> = await response.json()
      const {data} = res ?? {}
      const parsed: TemperamentDescriptionDTO = {id: data?.id ?? "", temperamentListe: returnArrayIfJson<string[]|null>(res.data?.temperamentListe ?? null)}
      set({ temperamentsDescription: parsed })
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
      const response = await fetch(`/api/confere-liste`)
      const {data} = await response.json()
      set({ devPsyConfereListe: data ?? [] })

    } catch (error) {
      console.log("Can't getDevPsyConfereList", error)
    }
  },
  getAnamneseDBByKeys: async(keys: (keyof Exclude<AnamneseResults, "bilanMedicauxResults">)[])=> {
    set({loadingData: true})
    try {
      const response = await fetch(`/api/anamnese?keys=${JSON.stringify(keys)}`)
      const res: ServiceResponse<(Omit<AnamneseResults, "bilanMedicauxResults">)[]|null> = await response.json()
      set({ anamneseInDBByDomaine: res.data })

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys", error)
    } finally {
      set({loadingData: false})
    }
  },
  resetAnamneseDB: () => set({ anamneseInDBByDomaine: null }),
  chosenThemes: [],
  initializeChosenThemes: async()=> {
    try{
      const anamnese = get().anamneseResults
      const result = getChosenThemeArray(anamnese)
      set({ chosenThemes: result ?? []})

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
      const response = await fetch("/api/adjectifs")
      const res: ServiceResponse<ListeAdjectifs> = await response.json()
      const data: ListeAdjectifsDTO = {id: res.data?.id ?? "", adjectifsComportement: returnArrayIfJson<string[]|null>(res.data?.adjectifsComportement ?? null)}
      console.log(data)
      set({ adjectifsComportement: data.adjectifsComportement})
      set({ listeAdjectifsId: data.id})

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys", error)
    }
  },
  typeSensorialite: null,
  getTypeSensorialite : async()=> {
    try {
      const response = await fetch("/api/sensorialite")
      const res: ServiceResponse<ListeTypeSensorialite> = await response.json()
      const data = {id: res.data?.id ?? "", typesSensorialite: returnArrayIfJson<string[]|null>(res.data?.typesSensorialite ?? null)}
      console.log("ListeTypeSensorialiteDTO", res)
      set({ typeSensorialite: data })

    } catch (error) {
      console.log("Can't getAnamneseDBByKeys", error)
    }
  }
}))