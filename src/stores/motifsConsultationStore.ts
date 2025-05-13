import { fetchAllMotifsConsultation } from '@/serverActions/motifActions'
import { MotifConsultation } from '@prisma/client'
import { create } from 'zustand'

type MotifConsultationState = {
  listeMotifs: MotifConsultation[]|null
  fetchListeMotifs : ()=> Promise<void>
  updateListeMotifs : ()=> Promise<void>
  
}

export const useMotifsConsultationStore = create<MotifConsultationState>((set) => ({
  listeMotifs: null,
  fetchListeMotifs: async()=> {
    try {
      const response = await fetchAllMotifsConsultation()
      set({ listeMotifs: response.data })

    } catch (error) {
      console.log("Can't fetch AllMotifsConsultation", error)
    }
  },
  updateListeMotifs: async () => {
    try {
      const response = await fetchAllMotifsConsultation()
      set({ listeMotifs: response.data })
      
    } catch (error) {
      console.log("Can't fetch AllMotifsConsultation", error)
    }
  }
}))
