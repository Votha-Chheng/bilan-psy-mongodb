export type Domaines = "motricité"|"graphisme"|"schéma corporel et praxies"|"latéralité et tonus"|"structuration spatiale et temporelle"
export type TestsNames = "Connaissance droite/gauche"|"Latéralité usuelle"|"Tonus d'action"|"M-ABC2"|"Epreuve visuomotrice de la Nepsy 2"|"Imitation de positions de la Nepsy 2"|"Praxies gestuelles"|"BHK (épreuve d'écriture)"|"Epreuve visuo-spatiale des flèches (Nepsy 2)"|"Epreuve visuoconstructive en deux dimensions (Figure de Rey A)"|"Epreuve visuoconstructive en deux dimensions (Figure de Rey B)"|"Epreuve des cubes (Nepsy 2)"

export const testsNames = [
  "Connaissance droite/gauche",
  "Latéralité usuelle",
  "Tonus d'action",
  "M-ABC2",
  "Epreuve visuomotrice de la Nepsy 2",
  "Imitation de positions de la Nepsy 2",
  "Praxies gestuelles",
  "BHK (épreuve d'écriture)",
  "Epreuve visuo-spatiale des flèches (Nepsy 2)",
  "Epreuve visuoconstructive en deux dimensions (Figure de Rey A)",
  "Epreuve visuoconstructive en deux dimensions (Figure de Rey B)",
  "Epreuve des cubes (Nepsy 2)"
] as const

export const mabc2Keys = [
  "id", 
  "bilanId",
  "dexteriteManuelle",
  "viserAttraper",
  "equilibre",
  "total",
  "competencesMotrices",
  "precisionUnimanuelle",
  "coordinationsBimanuelles",
  "precisionVisuoMotrice",
  "coordinationsGlobalesRattrapes",
  "coordinationsGlobalesLancers",
  "motriciteGlobaleUnipodal",
  "motriciteGlobaleDynamique",
  "motriciteGlobaleSauts",
  "observationsComplementaires",
] as const

export type TestBilan = {
  nom : string,
  domaine: Domaines,
  description?: string
}

export type ObservationTestDTO = {
  id: string
  theme: string
  test: TestsNames
  listeObservations: string[]|null
}
