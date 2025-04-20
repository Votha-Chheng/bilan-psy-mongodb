import { string } from "zod"

export const anamneseResultsKeys = [
  "id",
  "notesBrutes",
  "proposPapaOuMaman",
  "fratrie",
  "compositionFamiliale",
  "dossierMDPH",
  "maladiesEventuelles",
  "handicap",
  "autresAntecedents",
  "confereDevPsy",
  "accouchement",
  "grossesse",
  "stationAssise",
  "quadrupedie",
  "ageMarche",
  "continence" ,
  "sommeil",
  "acquisitionLangage",
  "alimentation",
  "autresDevPsy",
  "listeAdjectifs",
  "velo",
  "motriciteGlobale",
  "motriciteFine",
  "praxiesGestuelles",
  "extraScolaire",
  "autresMotricite",
  "sensorialite",
  "listeSensorialite",
  "classe",
  "apprentissages",
  "outils" ,
  "ecriture",
  "cartableBureau",
  "relationsPairs",
  "comportement" ,
  "attention" ,
  "cahiers" ,
  "anterieur",
  "sommeilQuotidien",
  "decritAuQuotidien",
  "autonomie", 
  "ecouteConsignes",
  "agitationMotrice", 
  "devoirs", 
  "gestionEmotions", 
  "gestionTemps",
  "temperament", 
  "alimentationQuotidien", 
  "autresQuotidien",
  
] as const

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
  neant?: string
  dossierMDPH?: string|null
  maladiesEventuelles?: string|null
  accompagnementSuivi?: string|null
  autresAntecedents?: string|null
  handicap?: string|null
  bilansMedicauxResults ?: BilanMedicauxResults|null
  confereDevPsy?: string|null
  accouchement?: string[]|null                           //<-- JSON tranformé en string[] côté serveur
  grossesse?: string|null
  stationAssise?: string|null
  quadrupedie?: string|null
  alimentation?: string|null
  autresDevPsy?: string|null
  ageMarche?: string[]|null                                 //<-- JSON tranformé en string[] côté serveur
  acquisitionLangage?: string[]|null                        //<-- JSON tranformé en string[] côté serveur
  continence ?: string[]|null                        //<-- JSON tranformé en string[] côté serveur
  velo?: string[]|null                                 //<-- JSON tranformé en string[] côté serveur
  motriciteGlobale?: string[]|null                    //<-- JSON tranformé en string[] côté serveur
  motriciteFine?: string[]|null               //<-- JSON tranformé en string[] côté serveur
  praxiesGestuelles?: string|null
  extraScolaire?: string|null
  autresMotricite?: string|null
  sensorialite?: string[]|null                  //<--- JSON de type string[type, commentaires] transformé coté serveur   
  classe ?: string|null
  apprentissages?: string[]|null                //<--- JSON de type string[niveau, commentaires] transformé coté serveur   
  outils ?: string[]|null                       //<--- JSON de type string[type, commentaires] transformé coté serveur  
  ecriture?: string[]|null                       //<--- JSON de type [niveau, douleurs, observations] transformé coté serveur 
  cartableBureau?: string[]|null                    //<--- JSON de type [type difficultés, observations] transformé coté serveur 
  relationsPairs?: string[]|null                  //<--- JSON de type [sociable ou pas, observations] transformé coté serveur 
  comportement ?: string[]|null                   //<---JSON [observations, suite d'adjectifs...]
  attention ?: string[]|null                      //<---JSON [attentif, observations]
  cahiers ?: string|null
  anterieur?: string|null
  sommeilQuotidien?: string[]|null             //<---- [dort seul, difficultés à s'endormair, observations]
  decritAuQuotidien?: string[]|null             //<---- [commentaires, suite de descriptions...]
  autonomie?: string[]|null             //<---- [commentaires, suite de descriptions...]
  ecouteConsignes?: string|null
  agitationMotrice?: string|null
  devoirs ?: string|null
  gestionEmotions?: string[]|null         //<--------- [difficultés, observations]
  gestionTemps?: string[]|null         //<--------- [difficultés, observations] 
  temperament?: string[]|null         //<--------- [temperament, observations] 
  alimentationQuotidien?: string|null  
  autresQuotidien?: string|null 
}

export type AnamneseResults = {
  id?: string
  notesBrutes?: string|null
  patientId?: string
  proposPapaOuMaman?: string|null
  fratrie?: string|null
  compositionFamiliale?: string|null
  neant?: string
  dossierMDPH?: string|null
  maladiesEventuelles?: string|null
  accompagnementSuivi?: string|null
  autresAntecedents?: string|null
  handicap?: string|null
  confereDevPsy?: string|null
  accouchement?: string[]|null                        //<-- JSON tranformé en string[] côté serveur
  grossesse?: string|null
  stationAssise?: string|null
  quadrupedie?: string|null
  alimentation?: string|null
  autresDevPsy?: string|null
  ageMarche?: string[]|null                           //<-- JSON tranformé en string[] côté serveur
  acquisitionLangage?: string[]|null                  //<-- JSON tranformé en string[] côté serveur
  continence ?: string[]|null                        //<-- JSON tranformé en string[] côté serveur
  velo?: string[]|null                              //<-- JSON tranformé en string[] côté serveur
  motriciteGlobale?: string[]|null                      //<-- JSON tranformé en string[] côté serveur
  motriciteFine?: string[]|null               //<-- JSON tranformé en string[] côté serveur
  praxiesGestuelles?: string|null
  sensorialite?: string[]|null                  //<--- JSON de type string[type, commentaires] transformé coté serveur   
  extraScolaire?: string|null
  autresMotricite?: string|null
  classe ?: string|null
  apprentissages?: string[]|null 
  outils ?: string[]|null                       //<--- JSON de type string[type, commentaires] transformé coté serveur  
  ecriture?: string[]|null                        //<--- JSON de type [niveau, douleurs, observations] transformé coté serveur 
  cartableBureau?: string[]|null
  relationsPairs?: string[]|null                  //<--- JSON de type [sociable ou pas, observations] transformé coté serveur 
  comportement ?: string[]|null                   //<---JSON [observations, suite d'adjectifs...]
  attention ?: string[]|null                      //<---JSON [attentif, observations]
  cahiers ?: string|null
  anterieur?: string|null
  sommeilQuotidien?: string[]|null             //<---- [dort seul, difficultés à s'endormair, observations]
  decritAuQuotidien?: string[]|null             //<---- [commentaires, suite de descriptions...]
  autonomie?:string[]|null             //<---- [commentaires, suite de descriptions...]
  ecouteConsignes?: string|null
  agitationMotrice?: string|null
  devoirs ?: string|null
  gestionEmotions?: string[]|null         //<--------- [difficultés, observations] 
  gestionTemps?: string[]|null         //<--------- [difficultés, observations] 
  temperament?: string[]|null         //<--------- [temperament, observations] 
  alimentationQuotidien?: string|null 
  autresQuotidien?: string|null 
}

export type BilanMedicauxResults = {
  id?: string,
  anamneseId?: string,
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

export type ListeTypeSensorialiteDTO = {
  id: string
  typesSensorialite: string[]|null
}

export type ListeAdjectifsDTO = {
  id: string
  adjectifsComportement: string[]|null
}

export type AutonomieDescriptionDTO = {
  id: string
  descriptionsListe: string[]|null
}

export type TemperamentDescriptionDTO = {
  id: string
  temperamentListe: string[]|null
}

