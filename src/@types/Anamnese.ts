import { Anamnese } from "@prisma/client"

export type BilanMedicalKeys = "bilanORL"|"bilanOphtalmo"|"bilanOrthophonique"| "bilanOrthoptique" | "bilanNeuropsy" | "bilanNeuropediatre"|"selectedBilans"
export const listeBilansMedicaux = ["Bilan ORL", "Bilan ophtalmologique", "Bilan orthophonique", "Bilan orthoptique", "Bilan neuropsychologique", "Bilan neuropédiatrique"] as const
export const bilanMedicalKeys = ["bilanORL", "bilanOphtalmo", "bilanOrthophonique", "bilanOrthoptique", "bilanNeuropsy", "bilanNeuropediatre" ] as const

export type AnamneseDTO = {
  id?: string
  notesBrutes?: string|null
  patientId?: string
  proposPapaOuMaman?: string|null
  fratrie?: string|null
  compositionFamiliale?: string|null
  neant: string
  dossierMDPH?: string|null
  maladiesEventuelles?: string|null
  accompagnementSuivi?: string|null
  autres?: string|null
  handicap?: string|null
  bilansMedicauxResults ?: BilanMedicalDTO|null
}

export type AnamneseResults = {
  id?: string|null
  notesBrutes?: string|null
  proposPapaOuMaman?: string|null
  neant: string
  fratrie?: string|null
  compositionFamiliale?: string|null
  accompagnementSuivi?: string|null
  dossierMDPH?: string|null
  maladiesEventuelles?: string|null
  handicap?: string|null
  autres?:string|null
}

export type BilanMedicauxResults = {
  id?: string,
  bilanORL?: string[],
  bilanOphtalmo?: string[],
  bilanOrthophonique?: string[],
  bilanOrthoptique?: string[], 
  bilanNeuropsy?: string[], 
  bilanNeuropediatre?: string[],
  selectedBilans?: string[]
}

export type BilanMedicalDTO = {
  id?: string,
  bilanORL?: string[],
  bilanOphtalmo?: string[],
  bilanOrthophonique?: string[],
  bilanOrthoptique?: string[], 
  bilanNeuropsy?: string[], 
  bilanNeuropediatre?: string[],
  selectedBilans?: string[]
}

export type AnamneseResultsDomaineKeyLabel = {
  domaine: string, 
  label: string, 
  key: keyof AnamneseResults
  theme: boolean
}

export type AnamneseTheme = {
  domaine: string
  theme: string
  keyTheme: keyof AnamneseDTO
  description?: string
}