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

import { AnamneseDTO } from "./Anamnese"
import { BilanDTO } from "./BilanTests"

export type PatientInfoFromDB = {
  id?: string
  nom: string,
  prenom: string,
  dateNaissance: string
  ecole?: string|null
  sexe?: "m"|"f",
  adulte: boolean,
  medecin?: string|null,
  motif?: string|null,
  dateBilan?: string|null
  userId?: string
  createdAt: Date
  updated : Date
  anamnese? : AnamneseDTO|null,
  // amenagements?: AmenagementsPlanDTO[]
  // conclusion?: Conclusion|null
  bilan?: BilanDTO|null
  // dateBilan?: DateBilan|null
}