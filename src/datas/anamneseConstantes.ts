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
  {
    domaine: "Développement psychomoteur",
    label: "Grossesse",
    key: "grossesse",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    label: "Accouchement",
    key: "accouchement",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    label: "Commentaire sur l'accouchement",
    key: "accouchementCommentaire",
    theme: false
  },
  {
    domaine: "Développement psychomoteur",
    label: "Age de la station assise",
    key: "stationAssise",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    key: "quadrupedie",
    label: "Quadrupédie",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    key: "ageMarche",
    label: "Âge de la marche",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    key: "acquisitionLangage",
    label: "Acquisition du langage",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    key: "continence",
    label: "Continence",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    key: "sommeil",
    label: "Sommeil",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    key: "alimentation",
    label: "Alimentation",
    theme: true
  },
  {
    domaine: "Développement psychomoteur",
    key: "autresDevPsy",
    label: "Autres",
    theme: true
  },
  {
    domaine: "Motricité",
    key: "motriciteGlobale",
    label: "Motricité globale",
    theme: true
  },
  {
    domaine: "Motricité",
    key: "motriciteFine",
    label: "Motricité fine",
    theme: true
  },
  {
    domaine: "Motricité",
    key: "velo",
    label: "Acquisition du vélo sans les roulettes",
    theme: true
  },
  {
    domaine: "Motricité",
    key: "praxiesGestuelles",
    label: "Praxies gestuelles",
    theme: true
  },
  {
    domaine: "Motricité",
    key: "extraScolaire",
    label: "Activités extra-scolaires",
    theme: true
  },
  {
    domaine: "Motricité",
    key: "sensorialite",
    label: "Sensorialité",
    theme: true
  },
  {
    domaine: "Motricité",
    key: "autresMotricite",
    label: "Autres",
    theme: true
  },

]
