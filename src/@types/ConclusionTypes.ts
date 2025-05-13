export type ConclusionRawData = {
  id: string
  patientId: string|null
  conclusionCommentaires: string|null
  profilPsy: string|null 
  projetPsy: string|null
}

export type ConclusionDTO = {
  id?: string
  patientId?: string
  conclusionCommentaires?: string|null
  profilPsy?: string[]|null
  projetPsy?: string[]|null 
}

export type ProjetPsyItemDTO = {
  id: string
  proposition: string
}

export type ProfilPsyItemDTO = {
  id: string
  recommandation: string
}