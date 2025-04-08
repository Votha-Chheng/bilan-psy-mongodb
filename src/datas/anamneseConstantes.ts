import { AnamneseResultsDomaineKeyLabel, AnamneseTheme } from "@/@types/Anamnese"


export const anamneseThemesDefault: AnamneseTheme[] = [
  {
    domaine: "Famille",
    theme: "Fratrie",
    keyTheme: "fratrie"
  },
  {
    domaine: "Famille",
    theme: "Composition familiale",
    keyTheme: "compositionFamiliale"
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    theme: "Maladies éventuelles",
    keyTheme: "maladiesEventuelles"
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    theme: "Handicap",
    keyTheme: "handicap"
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    theme: "Autres",
    keyTheme: "autres"
  },
] as const

export  const familleKeys = [
  "fratrie",
  "compositionFamiliale",
] as const

export const anamneseKeysAndLabels: AnamneseResultsDomaineKeyLabel[] = [
  {
    domaine: "Saisir des notes brutes pour l'anamnèse",
    label: "Notes brutes pour l'anamnèse",
    key: "notesBrutes",
    theme: false
  },
  {
    domaine: "Saisir des notes brutes pour l'anamnèse",
    label: "Propos recueillis",
    key: "proposPapaOuMaman",
    theme: false
  },
  {
    domaine: "Famille",
    label: "Fratrie",
    key: "fratrie",
    theme: true
  },
  {
    domaine: "Famille",
    label: "Composition familiale",
    key: "compositionFamiliale",
    theme: true
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    label: "Néant",
    key: "neant",
    theme: false
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    label: "Dossier MDPH",
    key: "dossierMDPH",
    theme: false
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    label: "Maladies éventuelles",
    key: "maladiesEventuelles",
    theme: true
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    label: "Accompagnements et suivis",
    key: "accompagnementSuivi",
    theme: true
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    label: "Handicap",
    key: "handicap",
    theme: true
  },
  {
    domaine: "Antécédents médicaux personnels et suivis médicaux",
    label: "Autres",
    key: "autres",
    theme: true
  },
]
