import { AnamneseDTO } from "@/@types/Anamnese";
import { BHKResultsDTO, BilanDTO } from "@/@types/BilanTests";
import { PatientInfoFromDB } from "@/@types/PatientTypes";

//Anamnèse
export const anamneseSelectOptions : Record<Partial<keyof AnamneseDTO>, any> = {
  id: true,
  patientId: true,
  proposPapaOuMaman: true,
  notesBrutes: true,
  fratrie: true,
  compositionFamiliale: true,
  neant: true,
  dossierMDPH: true,
  maladiesEventuelles : true,
  accompagnementSuivi: true,
  autresAntecedents : true,
  handicap: true,
  bilansMedicauxResults: true,
  confereDevPsy: true,
  accouchement: true,
  grossesse: true,
  stationAssise: true,
  quadrupedie: true,
  ageMarche: true,
  acquisitionLangage: true,
  continence : true,
  alimentation: true,
  autresDevPsy: true,
  velo: true,
  motriciteGlobale: true,
  motriciteFine: true,
  praxiesGestuelles: true,
  extraScolaire: true,
  sensorialite: true,
  autresMotricite: true,
  classe: true,
  apprentissages: true,
  outils: true,
  ecriture: true,
  cartableBureau: true,
  relationsPairs: true,
  comportement: true,
  attention: true,
  cahiers: true,
  anterieur: true,
  decritAuQuotidien: true, 
  autonomie: true, 
  ecouteConsignes: true,
  agitationMotrice: true, 
  devoirs: true, 
  gestionEmotions: true, 
  gestionTemps: true,
  temperament: true, 
  sommeilQuotidien: true, 
  alimentationQuotidien: true, 
  autresQuotidien: true
}

//Bilan
export const bilanSelectOptions: Record<Partial<keyof BilanDTO>, boolean> = {
  id: true,
  tests: true, 
  bhk:true,
  mabc2:true,
  visuomotricenepsy2:true,
  praxiesgestuelles: true,
  imitationpositionsnepsy2: true,
  lateralitetonus: true,
  connaissancedroitegauche: true,
  flechesnepsy2: true,
  figuresreya: true,
  epreuvecubesnepsy2: true, 
}

//Patient
export const patientSelectOptions : Record<Partial<keyof PatientInfoFromDB>, any> = {
  id: true,
  userId: true,
  nom: true,
  prenom: true,
  dateNaissance: true,
  sexe: true,
  adulte: true,
  medecin: true,
  motif: true,
  createdAt: true,
  updated: true,
  ecole: true,
  dateBilan: true,
  anamnese: {
    select: anamneseSelectOptions
  },
  bilan:{
    select: bilanSelectOptions
  }
}



//Tests
export const bhkSelectOptions: Record<keyof BHKResultsDTO, boolean> = {
  id: true,
  patientId: true,
  bilanId: true,
  qualiteEcriture: true,
  vitesseEcriture: true,
  lecture: true,
  tenueOutilScripteur: true,
  memorisation: true,
  comportement: true,
  ecriture: true,
  ressenti: true,
  autres: true
}