import { saveTextBrutAnamneseAction } from '@/serverActions/anamneseActions'
import { create } from 'zustand'

type TextBrutAnamneseState = {
  updateTextBrut : (textBrut: string, patientId: string)=> Promise<void>
  message: string|null
  success: boolean|undefined
}

export const useTextBrutAnamneseStore = create<TextBrutAnamneseState>((set) => ({
  message: null,
  success: undefined,
  updateTextBrut: async (textBrut: string, patientId: string) => {
    try {
      const response = await saveTextBrutAnamneseAction(textBrut, patientId)
      set({ message: response.message})
      set({ success: response.success})
      setTimeout(()=> {
        set({ message: null})
        set({ success: undefined})
      }, 1000)
      
    } catch (error) {
      console.log("Can't fetch AllMotifsConsultation", error)
      set({ message: "Impossible d'enregistrer à cause d'une erreur côté serveur."})
    }
  }
}))