import { BHKResultsDTO, ConnaissancesDroiteGaucheResultsDTO, EpreuveCubesNEPSY2ResultsDTO, FiguresReyAResultsDTO, FiguresReyBResultsDTO, FlechesNEPSY2ResultsDTO, ImitationPositionsNEPSY2ResultsDTO, LateraliteTonusResultsDTO, MABC2ResultsDTO, PraxiesGestuellesResultsDTO, VisuomotriceNEPSY2ResultsDTO } from '@/@types/BilanTests'
import { create } from 'zustand'

type BilanTestsState = {
  testsUtilises: string[]|null
  bhk: BHKResultsDTO|null
  mabc2: MABC2ResultsDTO|null 
  visuomotricenepsy2: VisuomotriceNEPSY2ResultsDTO|null
  praxiesgestuelles: PraxiesGestuellesResultsDTO|null
  imitationpositionsnepsy2: ImitationPositionsNEPSY2ResultsDTO|null
  lateralitetonus : LateraliteTonusResultsDTO|null
  connaissancedroitegauche: ConnaissancesDroiteGaucheResultsDTO|null
  flechesnepsy2: FlechesNEPSY2ResultsDTO|null
  figuresreya : FiguresReyAResultsDTO|null
  figuresreyb: FiguresReyBResultsDTO|null
  epreuvecubesnepsy2 : EpreuveCubesNEPSY2ResultsDTO|null
  getBilanByPatientId: (patientId: string)=> Promise<void>
}

export const useBilanTestsStore = create<BilanTestsState>((set) => ({
  bhk: null,
  testsUtilises: null,
  mabc2:null,
  visuomotricenepsy2:null,
  praxiesgestuelles: null,
  imitationpositionsnepsy2: null,
  lateralitetonus : null,
  connaissancedroitegauche: null,
  flechesnepsy2: null,
  figuresreya : null,
  figuresreyb: null,
  epreuvecubesnepsy2 : null,
  getBilanByPatientId: async(patientId: string)=> {

  },

}))