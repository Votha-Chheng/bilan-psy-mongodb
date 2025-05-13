import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type AnamnesePartStore = {
  anamenesePart: number
  setAnamnesePart: (value: number)=>void
}

export const useAnamnesePartStore = create<AnamnesePartStore>()(
  persist(
    (set) => ({
      anamenesePart: 0,
      setAnamnesePart: (part: number)=> set(()=> ({anamenesePart: part}))
    }),
    {
      name: 'partie-anamnese', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)