
import { fetchAllEcoles } from '@/serverActions/ecoleActions'
import { Ecole } from '@prisma/client'
import { create } from 'zustand'

type EcoleState = {
  listeEcoles: Ecole[]|null
  fetchListeEcoles : ()=> Promise<void>
  updateListeEcoles : ()=> Promise<void>
  
}

export const useEcoleStore = create<EcoleState>((set) => ({
  listeEcoles: null,
  fetchListeEcoles: async()=> {
    try {
      const response = await fetchAllEcoles()
      set({ listeEcoles: response.data })

    } catch (error) {
      console.log("Can't fetch all patients")
    }
  },
  updateListeEcoles: async () => {
    try {
      const response = await fetchAllEcoles()
      set({ listeEcoles: response.data })
      
    } catch (error) {
      console.log("Can't fetch PatientById")
      set({ listeEcoles: null })
    }
  }
}))