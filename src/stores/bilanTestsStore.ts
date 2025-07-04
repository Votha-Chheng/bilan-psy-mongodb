import { BHKResultsDTO, BilanRaw, ConnaissancesDroiteGaucheResultsDTO, EpreuveCubesNEPSY2ResultsDTO, FiguresReyAResultsDTO, FiguresReyBResultsDTO, FlechesNEPSY2ResultsDTO, ImitationPositionsNEPSY2ResultsDTO, MABC2ResultsDTO, PraxiesGestuellesResultsDTO, VisuomotriceNEPSY2ResultsDTO } from '@/@types/BilanTests'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { fetchBHKResults } from '@/serverActions/testsActions/bhkActions'
import { fetchConnaissanceDroiteGaucheResults } from '@/serverActions/testsActions/connaissancesDroiteGaucheAction'
import { fetchEpreuveCubesNepsy2Results } from '@/serverActions/testsActions/epreuveCubesNepsy2Action'
import { fetchFigureReyAResults } from '@/serverActions/testsActions/figureReyAActions'
import { fetchFigureReyBResults } from '@/serverActions/testsActions/figureReyBActions'
import { fetchNepsy2Results } from '@/serverActions/testsActions/flechesNepsy2Actions'
import { fetchImitationNepsy2 } from '@/serverActions/testsActions/imitationNepsy2Actions'
import { fetchMABC2Results } from '@/serverActions/testsActions/mabc2Actions'
import { fetchPraxiesGestuellesResults } from '@/serverActions/testsActions/praxiesGestuellesActions'
import { fetchVisuomotriceNepsy2Results } from '@/serverActions/testsActions/visuomotriceNepsy2Actions'
import { returnArrayIfJson } from '@/utils/arrayFunctions'
import { create } from 'zustand'

type BilanTestsState = {
  partieBilan: number
  setPartieBilan: (value: number)=> void
  bilanId: string|null|undefined,
  tests: string[]|null
  bhk: BHKResultsDTO|null
  updatebhk: (bilanId: string|null|undefined)=> Promise<void>
  mabc2: MABC2ResultsDTO|null 
  updatemabc2: (bilanId: string|null|undefined)=> Promise<void>
  visuomotricenepsy2: VisuomotriceNEPSY2ResultsDTO|null
  updatevisuomotricenepsy2: (bilanId: string|null|undefined)=> Promise<void>
  praxiesgestuelles: PraxiesGestuellesResultsDTO|null
  updatePraxiesGestuelles: (bilanId: string|null|undefined)=> Promise<void>
  imitationpositionsnepsy2: ImitationPositionsNEPSY2ResultsDTO|null
  updateImitationNepsy2: (bilanId: string|null|undefined)=> Promise<void>
  lateralite: string|null
  tonus : string|null
  connaissancedroitegauche: ConnaissancesDroiteGaucheResultsDTO|null
  updateConnaissancesDroiteGauche: (bilanId: string|null|undefined)=> Promise<void>
  flechesnepsy2: FlechesNEPSY2ResultsDTO|null
  updateFlechesNepsy2: (bilanId: string|null|undefined)=> Promise<void>
  figuresreya : FiguresReyAResultsDTO|null
  updateFiguresReya: (bilanId: string|null|undefined)=> Promise<void>
  figuresreyb: FiguresReyBResultsDTO|null
  updateFiguresReyb: (bilanId: string|null|undefined)=> Promise<void>
  epreuvecubesnepsy2 : EpreuveCubesNEPSY2ResultsDTO|null
  updateEpreuveCubesNepsy2: (bilanId: string|null|undefined)=> Promise<void>
  getBilanByPatientId: (patientId: string)=> Promise<void>
  updateBilanByPatientId: (patientId: string)=> Promise<void>
  loadingBilanResults: boolean
}

export const useBilanTestsStore = create<BilanTestsState>((set) => ({
  bilanId: null,
  partieBilan: 0,
  setPartieBilan: (value: number)=> {
    set({partieBilan: value})
  },
  bhk: null,
  updatebhk: async(bilanId: string|null|undefined)=> {
    try {
      const response = await fetchBHKResults(bilanId)
      set({bhk: response.data})
    } catch (error) {
      console.log("Can't updatebhk", error)
    }
  },
  tests: null,
  mabc2:null,
  updatemabc2: async(bilanId: string|null|undefined)=> {
    try {
      const response = await fetchMABC2Results(bilanId)
      set({mabc2: response.data})
    } catch (error) {
      console.log("Can't updatemabc2", error)
    }
  },
  visuomotricenepsy2:null,
  updatevisuomotricenepsy2: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchVisuomotriceNepsy2Results(bilanId)
      set({visuomotricenepsy2: response.data})
    } catch (error) {
      console.log("Can't updateConnaissancesDroiteGauche", error)
    }
  },
  praxiesgestuelles: null,
  updatePraxiesGestuelles: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchPraxiesGestuellesResults(bilanId)
      set({praxiesgestuelles: response.data})
    } catch (error) {
      console.log("Can't updateConnaissancesDroiteGauche", error)
    }
  },
  imitationpositionsnepsy2: null,
  updateImitationNepsy2: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchImitationNepsy2(bilanId)
      set({imitationpositionsnepsy2: response.data})
    } catch (error) {
      console.log("Can't updateConnaissancesDroiteGauche", error)
    }
  },
  lateralite: null,
  tonus : null,
  connaissancedroitegauche: null,
  updateConnaissancesDroiteGauche: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchConnaissanceDroiteGaucheResults(bilanId)
      set({connaissancedroitegauche: response.data})
    } catch (error) {
      console.log("Can't updateConnaissancesDroiteGauche", error)
    }
  },
  flechesnepsy2: null,
  updateFlechesNepsy2: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchNepsy2Results(bilanId)
      set({flechesnepsy2: response.data})
    } catch (error) {
      console.log("Can't updateConnaissancesDroiteGauche", error)
    }
  },
  figuresreya : null,
  updateFiguresReya: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchFigureReyAResults(bilanId)
      set({figuresreya: response.data})
    } catch (error) {
      console.log("Can't updateFiguresReya", error)
    }
  },
  figuresreyb: null,
  updateFiguresReyb: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchFigureReyBResults(bilanId)
      set({figuresreyb: response.data})
    } catch (error) {
      console.log("Can't updateFiguresReyb", error)
    }
  },
  epreuvecubesnepsy2 : null,
  updateEpreuveCubesNepsy2: async(bilanId: string|null|undefined) =>{
    try {
      const response = await fetchEpreuveCubesNepsy2Results(bilanId)
      set({epreuvecubesnepsy2: response.data})
    } catch (error) {
      console.log("Can't updateEpreuveCubesNepsy2", error)
    }
  },
  loadingBilanResults: false,
  getBilanByPatientId: async(patientId: string)=> {
    set({loadingBilanResults: true})
    try {
      const res = await fetch(`/api/bilan/${patientId}`)
      const parsed: ServiceResponse<BilanRaw|null> = await res.json()

      set({tests: returnArrayIfJson(parsed.data?.tests ?? null)})
      set({bilanId: parsed.data?.id})
      set({mabc2: parsed.data?.mabc2})
      set({connaissancedroitegauche: parsed.data?.connaissancedroitegauche})
      set({lateralite: parsed.data?.lateralite})
      set({tonus: parsed.data?.tonus})
      set({visuomotricenepsy2: parsed.data?.visuomotricenepsy2})
      set({imitationpositionsnepsy2: parsed.data?.imitationpositionsnepsy2})
      set({praxiesgestuelles: parsed.data?.praxiesgestuelles})

      const parsedBHK = {
        ...parsed.data?.bhk,
        tenueOutilScripteur: returnArrayIfJson<string[]>(parsed.data?.bhk?.tenueOutilScripteur ?? null)
      }

      set({bhk:parsedBHK})
      set({flechesnepsy2: parsed.data?.flechesnepsy2})
      set({figuresreya: parsed.data?.figuresreya})
      set({figuresreyb: parsed.data?.figuresreyb})
      set({epreuvecubesnepsy2: parsed.data?.epreuvecubesnepsy2})

    } catch (error) {
      console.log("Can't getBilanByPatientId", error)
    } finally {
      set({loadingBilanResults: false})
    }
  },
  updateBilanByPatientId: async(patientId: string)=> {
    try {
      try {
      const res = await fetch(`/api/bilan/${patientId}`)
      const parsed: ServiceResponse<BilanRaw|null> = await res.json()

      set({tests: returnArrayIfJson(parsed.data?.tests ?? null)})
      set({bilanId: parsed.data?.id})
      set({mabc2: parsed.data?.mabc2})
      set({connaissancedroitegauche: parsed.data?.connaissancedroitegauche})
      set({lateralite: parsed.data?.lateralite})
      set({tonus: parsed.data?.tonus})
      set({visuomotricenepsy2: parsed.data?.visuomotricenepsy2})
      set({imitationpositionsnepsy2: parsed.data?.imitationpositionsnepsy2})
      set({praxiesgestuelles: parsed.data?.praxiesgestuelles})

      const parsedBHK = {
        ...parsed.data?.bhk,
        tenueOutilScripteur: returnArrayIfJson<string[]>(parsed.data?.bhk?.tenueOutilScripteur ?? null)
      }

      set({bhk:parsedBHK})
      set({flechesnepsy2: parsed.data?.flechesnepsy2})
      set({figuresreya: parsed.data?.figuresreya})
      set({figuresreyb: parsed.data?.figuresreyb})
      set({epreuvecubesnepsy2: parsed.data?.epreuvecubesnepsy2})
      
    } catch (error) {
      console.log("Can't getBilanByPatientId", error)
    }
    } catch (error) {
      console.log("Can't updateBilanByPatientId", error)
    }
  },

}))