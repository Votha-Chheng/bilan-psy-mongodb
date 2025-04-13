export const anamneseResultsKeys = [
  "id",
  "notesBrutes",
  "proposPapaOuMaman",
  "fratrie",
  "compositionFamiliale",
  "dossierMDPH",
  "maladiesEventuelles",
  "handicap",
  "autres",
  "confereDevPsy",
  "accouchement",
  "accouchementCommentaire",
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
  "listeSensorialite"
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
  neant: string
  dossierMDPH?: string|null
  maladiesEventuelles?: string|null
  accompagnementSuivi?: string|null
  autres?: string|null
  handicap?: string|null
  bilansMedicauxResults ?: BilanMedicauxResults|null
  confereDevPsy?: string|null
  accouchement?: string[]|null                           //<-- JSON tranformé en string[] côté serveur
  accouchementCommentaire?: string|null
  grossesse?: string|null
  stationAssise?: string|null
  quadrupedie?: string|null
  sommeil?: string|null
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
}

export type AnamneseResults = {
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
  confereDevPsy?: string|null
  accouchement?: string[]|null                        //<-- JSON tranformé en string[] côté serveur
  accouchementCommentaire?: string|null
  grossesse?: string|null
  stationAssise?: string|null
  quadrupedie?: string|null
  sommeil?: string|null
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
  adjectifs: string[]|null
}