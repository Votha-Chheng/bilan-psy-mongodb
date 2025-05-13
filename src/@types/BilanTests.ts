export type BilanRaw = {
  id: string|null,
  patientId: string|null
  tests: string|null
  lateralite?: string|null
  tonus?: string|null
}

export type BilanDTO = {
  id?: string|null,
  patientId?: string|null
  tests?: string[]|null
  bhk?: BHKResultsDTO|null
  mabc2?: MABC2ResultsDTO|null
  visuomotricenepsy2?: VisuomotriceNEPSY2ResultsDTO|null
  praxiesgestuelles?: PraxiesGestuellesResultsDTO|null
  imitationpositionsnepsy2?: ImitationPositionsNEPSY2ResultsDTO|null
  lateralite?: string|null
  tonus?: string|null
  connaissancedroitegauche?: ConnaissancesDroiteGaucheResultsDTO|null
  flechesnepsy2?: FlechesNEPSY2ResultsDTO|null
  figuresreya?: FiguresReyAResultsDTO|null
  figuresreyb?: FiguresReyBResultsDTO|null
  epreuvecubesnepsy2?: EpreuveCubesNEPSY2ResultsDTO|null
}

export type TestBilan = {
  nom : string,
  domaine: string,
  description?: string
  keyTest: keyof BilanDTO
}

export type BHKResultsDTO = {
  id?: string|null
  bilanId?: string|null
  qualiteEcriture?: string|null
  vitesseEcriture?: string|null
  lecture?: string|null
  tenueOutilScripteur?: string[]|null
  fonctionnalite ?: string|null
  posturePoignet ?: string|null
  memorisation ?: string|null
  comportement ?: string|null
  ecriture?: string|null
  ressenti ?: string|null
  autres ?: string|null
}

export type MABC2ResultsDTO = {
  id?: string|null
  bilanId?: string|null
  dexteriteManuelle?: string|null
  viserAttraper?: string|null
  equilibre?: string|null
  total?: string|null
  competencesMotrices?: string|null
  precisionUnimanuelle?: string|null
  coordinationsBimanuelles?: string|null
  precisionVisuoMotrice?: string|null
  coordinationsGlobalesRattrapes?: string|null
  coordinationsGlobalesLancers?: string|null
  motriciteGlobaleUnipodal?: string|null
  motriciteGlobaleDynamique?: string|null
  motriciteGlobaleSauts?: string|null
  observationsComplementaires?: string|null
}

export type VisuomotriceNEPSY2ResultsDTO = {
  //patientId?: string
  id?: string|null
  bilanId?: string|null
  precisionVisuoMoteur?: string|null,
  vitesse?: string|null
  tenueCrayon?: string|null
  comportement?: string|null
  tonus?: string|null
}

export type PraxiesGestuellesResultsDTO = {
  id?: string|null
  bilanId?: string|null
  precisionDecoupage?: string|null
  tenueDecoupage?: string|null
  gestionTonusDecoupage?: string|null
  hyperHypoDecoupage?: string|null
  precisionCompas?: string|null
  tenueCompas?: string|null
  gestionTonusCompas?: string|null
  hyperHypoCompas?: string|null
  precisionEquerre ?: string|null
  tenueEquerre?: string|null
  gestionTonusEquerre?: string|null
  hyperHypoEquerre?: string|null

}

export type ImitationPositionsNEPSY2ResultsDTO = {
  id?: string|null
  bilanId?: string|null
  imitationGestesMains?: string|null
  observationsDiverses?: string|null
}

export type ConnaissancesDroiteGaucheResultsDTO = {
  id?: string|null
  bilanId?: string|null
  surSoi?: string|null
  surAutruiACote?: string|null
  surAutruiReversibilite?: string|null
}

export type FlechesNEPSY2ResultsDTO = {
  id?: string|null
  bilanId?: string|null
  score?: string|null
  observations?: string|null
}

export type FiguresReyAResultsDTO = {
  id?: string|null
  bilanId?: string|null
  copieModeleDS?: string|null
  copieModeleDureePercentile?: string|null
  memoireDS?: string|null
  memoirePercentile?: string|null
  planificationMemoire?: string|null
  planificationModele?: string|null
  observations?: string|null
}

export type FiguresReyBResultsDTO = {
  id?: string|null
  bilanId ?: string|null
  copieModeleDS?: string|null
  copieModeleDureeDS?: string|null
  copiePlanification?: string|null
  memoireModeleDS?: string|null
  memoireModeleDureeDS?: string|null
  memoirePlanification?: string|null
  observationsFigureB?: string|null 
}

export type EpreuveCubesNEPSY2ResultsDTO = {
  id?: string|null
  bilanId?: string|null
  scoreNS?: string|null
  observations?: string|null
}
