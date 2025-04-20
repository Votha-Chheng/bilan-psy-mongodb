export type BilanDTO = {
  id?: string|null,
  tests?: string[]|null
  bhk?: BHKResultsDTO|null
  mabc2?: MABC2ResultsDTO|null
  visuomotricenepsy2?: VisuomotriceNEPSY2ResultsDTO|null
  praxiesgestuelles?: PraxiesGestuellesResultsDTO|null
  imitationpositionsnepsy2?: ImitationPositionsNEPSY2ResultsDTO|null
  lateralitetonus?: LateraliteTonusResultsDTO|null
  connaissancedroitegauche?: ConnaissancesDroiteGaucheResultsDTO|null
  flechesnepsy2?: FlechesNEPSY2ResultsDTO|null
  figuresreya?: FiguresReyAResultsDTO|null
  epreuvecubesnepsy2?: EpreuveCubesNEPSY2ResultsDTO|null
}

export type BHKResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  qualiteEcriture?: string|null
  vitesseEcriture?: string|null
  lecture?: string[]|null
  tenueOutilScripteur ?: string[]|null
  memorisation ?: string|null
  comportement ?: string[]|null
  ecriture?: string[]|null
  ressenti ?: string|null
  autres ?: string[]|null
}

export type MABC2ResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  dexteriteManuelle?: string|null
  viserAttraper?: string|null
  equilibre?: string|null
  total?: string|null
  competencesMotrices?: string|null
  precisionUnimanuelle?: string[]|null
  coordinationsBimanuelles?: string[]|null
  precisionVisuoMotrice?: string[]|null
  coordinationsGlobalesRattrapes?: string[]|null
  coordinationsGlobalesLancers?: string[]|null
  motriciteGlobaleUnipodal?: string[]|null
  motriciteGlobaleDynamique?: string[]|null
  motriciteGlobaleSauts?: string[]|null
  observationsComplementaires?: string[]|null
}

export type VisuomotriceNEPSY2ResultsDTO = {
  patientId?: string
  id?: string|null
  bilanId?: string|null
  precisionVisuoMoteur?: string|null,
  vitesse?: string[]|null
  tenueCrayon?: string[]|null
  comportement?: string[]|null
  tonus?: string[]|null
}

export type PraxiesGestuellesResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  precisionDecoupage?: string[]|null
  tenueDecoupage?: string|null
  gestionTonusDecoupage?: string|null
  hyperHypoDecoupage?: string|null
  precisionCompas?: string[]|null
  tenueCompas?: string|null
  gestionTonusCompas?: string|null
  hyperHypoCompas?: string|null
  precisionEquerre ?: string[]|null
  tenueEquerre?: string|null
  gestionTonusEquerre?: string|null
  hyperHypoEquerre?: string|null

}

export type ImitationPositionsNEPSY2ResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  imitationGestesMains?: string|null
  observationsDiverses?: string[]|null
}

export type LateraliteTonusResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  lateraliteUsuelle?: string|null
  tonusAction?: string[]|null
}

export type ConnaissancesDroiteGaucheResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  connaissanceDroiteGauche?: string[]|null
}

export type FlechesNEPSY2ResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  score?: string|null
  observations?: string[]|null
}

export type FiguresReyAResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  copieModeleDS?: string|null
  copieModeleDureePercentile?: string|null
  memoireDS?: string|null
  memoirePercentile?: string|null
  planificationMemoire?: string|null
  planificationModele?: string|null
  observations?: string[]|null
}

export type EpreuveCubesNEPSY2ResultsDTO = {
  patientId?: string|null
  id?: string|null
  bilanId?: string|null
  scoreNS?: string|null
  observations?: string[]|null
}
