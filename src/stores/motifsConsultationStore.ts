import { Motif } from '@/@types/Anamnese'
import { fetchAllMotifsConsultation } from '@/serverActions/motifActions'
import { create } from 'zustand'

type MotifConsultationState = {
  listeMotifs: Motif[]|null
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
