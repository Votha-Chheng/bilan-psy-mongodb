
import { AmenagementsGlobal } from "./AmenagementsTypes"
import { AnamneseDTO } from "./Anamnese"
import { BilanDTO } from "./BilanTests"
import { ConclusionDTO } from "./ConclusionTypes"

export type PatientInfosGenerales = {
  id?: string
  nom: string|null
  prenom: string|null
  dateNaissance: string|null
  ecole?: string|null
  sexe?: "m"|"f"
  adulte: boolean|null
  medecin?: string|null
  motif?: string|null
  dateBilan?: string|null
  userId?: string
  createdAt: Date|null
  updated : Date|null
}

export type PatientInfoDocx = {
  id?: string
  nom: string|null
  prenom: string|null
  dateNaissance: string|null
  adulte: boolean|null
  medecin?: string|null
  motif?: string|null
  dateBilan?: string|null
  userId?: string
  createdAt: Date|null
  updated : Date|null
  ecole?: string|null
  sexe?: "m"|"f",
  anamnese? : AnamneseDTO|null,
  amenagements?: AmenagementsGlobal|null
  conclusion?: ConclusionDTO|null
  bilan?: BilanDTO|null
}

export type MedecinDTO = {
  id : string
  nom : string
}

export type EcoleDTO = {
  id : string
  nom : string
}

export type MotifConsultationDTO = {
  id: string
  motif: string
}

