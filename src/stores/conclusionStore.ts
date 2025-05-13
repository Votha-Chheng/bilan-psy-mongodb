
import { ConclusionDTO } from '@/@types/ConclusionTypes'
import { fetchAllConclusion, fetchAllProfilPsyItems, fetchAllProjetPsyItems, fetchConclusionPatientId } from '@/serverActions/conclusionActions'
import { ProfilPsyItem, ProjetPsyItem } from '@prisma/client'
import { create } from 'zustand'

type ConclusionState = {
  consclusionId: string|null
  conclusionListe: {conclusionCommentaires: string|null, patientName: string|null}[]|null
  getConclusionList: ()=> Promise<void>
  loadingConclusionList: boolean
  loadingConclusionData: boolean
  conclusion : ConclusionDTO|null
  getConclusionByPatientId: (patientId: string)=> Promise<void>
  updateConclusionByPatientId: (patientId: string)=> Promise<void>
  profilPsyItems: ProfilPsyItem[]|null
  getProfilPsyItems : ()=> Promise<void>
  projetPsyItems: ProjetPsyItem[]|null
  getProjetPsyItems : ()=> Promise<void>
  
}

export const useConclusionStore = create<ConclusionState>((set) => ({
  consclusionId: null,
  loadingConclusionList: false,
  conclusionListe: null,
  getConclusionList: async()=> {
    set({loadingConclusionList: true})
    try {
      const response = await fetchAllConclusion()
      set({conclusionListe: response.data ?? null})
    } catch (error) {
      console.log("Can't fetch getConclusionList", error)
    } finally {
      set({loadingConclusionList: false})
    }
  },
  projetPsyItems: null,
  getProjetPsyItems : async()=> {
    try {
      const response = await fetchAllProjetPsyItems()
      set({projetPsyItems: response.data})
    } catch (error) {
      console.log("Can't fetch getProjetPsyItems", error)
    }
  },
  profilPsyItems: null,
  getProfilPsyItems : async()=> {
    try {
      const response = await fetchAllProfilPsyItems()
      set({profilPsyItems: response.data})
    } catch (error) {
      console.log("Can't fetch getProfilPsyItems", error)
    }
  },
  loadingConclusionData: false,
  conclusion: null,
  getConclusionByPatientId: async(patientId: string)=> {
    set({loadingConclusionData: true})
    try {
      const response = await fetchConclusionPatientId(patientId)
      set({ conclusion: response.data })

    } catch (error) {
      console.log("Can't fetch getConclusionByPatientId", error)
    } finally {
      set({loadingConclusionData: false})
    }
  },
  updateConclusionByPatientId: async (patientId: string) => {
    try {
      const response = await fetchConclusionPatientId(patientId)
      set({ conclusion: response.data })
      
    } catch (error) {
      console.log("Can't fetch PatientById", error)
    }
  }
}))