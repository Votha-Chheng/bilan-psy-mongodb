import { AnamneseDTO } from '@/@types/Anamnese'
import { fetchAnamneseByKeys } from '@/serverActions/anamneseActions'

import { create } from 'zustand'

type AnamneseSearchDBState = {
  anamneseInDBByDomaine: AnamneseDTO[]|null
  getAnamneseDBByKeys : (keys: (keyof AnamneseDTO)[])=> Promise<void>
  resetAnamneseDB: ()=> void
}

export const useAnamneseSearchDBStore = create<AnamneseSearchDBState>((set) => ({
  anamneseInDBByDomaine: null,
  getAnamneseDBByKeys: async(keys: (keyof AnamneseDTO)[])=> {
    try {
      const response = await fetchAnamneseByKeys(keys)
      set({ anamneseInDBByDomaine: response.data })

    } catch (error) {
      console.log("Can't fetch all patients")
    }
  },
  resetAnamneseDB: () => set({ anamneseInDBByDomaine: null })
}))