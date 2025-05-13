
import { MedecinDTO } from '@/@types/Anamnese'
import { fetchAllMedecins } from '@/serverActions/medecinActions'
import { create } from 'zustand'

type MedecinState = {
  listeMedecins: MedecinDTO[]|null
  fetchListeMedecins : ()=> Promise<void>
  updateListeMedecins : ()=> Promise<void>
  
}

export const useMedecinStore = create<MedecinState>((set) => ({
  listeMedecins: null,
  fetchListeMedecins: async()=> {
    try {
      const response = await fetchAllMedecins()
      set({ listeMedecins: response.data })

    } catch (error) {
      console.log("Can't fetch all patients", error)
    }
  },
  updateListeMedecins: async () => {
    try {
      const response = await fetchAllMedecins()
      set({ listeMedecins: response.data })
      
    } catch (error) {
      console.log("Can't fetch PatientById", error)
    }
  }
}))
