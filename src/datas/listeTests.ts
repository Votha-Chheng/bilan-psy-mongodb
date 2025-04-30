import { TestBilan } from "@/@types/BilanTests"

export const allTests: TestBilan[] = [
  {
    nom:"Connaissance droite/gauche", 
    domaine: "structuration spatiale et temporelle", 
    description: "",
    keyTest: "connaissancedroitegauche"
  }, 
  {
    nom:"Latéralité usuelle", 
    domaine: "latéralité et tonus", 
    description: "",
    keyTest: "lateralite"
  }, 
  {
    nom:"Tonus d'action", 
    domaine: "latéralité et tonus", 
    description: "",
    keyTest: "tonus"
  }, 
  {
    nom:"M-ABC2", 
    domaine: "motricité", 
    description: "évaluation des compétences en dextérité manuelle, coordinations globales et en équilibre statique et dynamique",
    keyTest: "mabc2"
  }, 
  {
    nom:"Epreuve visuomotrice de la Nepsy 2", 
    domaine: "motricité", 
    description : "évaluation de la précision visuomotrice corrélée avec la vitesse de la réalisation",
    keyTest: "visuomotricenepsy2"
  }, 
  {
    nom:"Imitation de positions de la Nepsy 2", 
    domaine: "schéma corporel et praxies", 
    description : "",
    keyTest: "imitationpositionsnepsy2"
  }, 
  {
    nom:"Praxies gestuelles", 
    domaine: "schéma corporel et praxies", 
    description : "",
    keyTest: "praxiesgestuelles"
  }, 
  {
    nom:"BHK (épreuve d'écriture)", 
    domaine: "graphisme", 
    description : "test d'écriture de 5 min en copie",
    keyTest: "bhk"
  }, 
  {
    nom:"Epreuve visuo-spatiale des flèches (Nepsy 2)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation de la précision visuo-spatiale",
    keyTest: "flechesnepsy2"
  }, 
  {
    nom:"Epreuve visuoconstructive en deux dimensions (Figure de Rey A)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation des capacités visuo-constructives en deux dimensions",
    keyTest: "figuresreya"
  },  
  {
    nom:"Epreuve visuoconstructive en deux dimensions (Figure de Rey B)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation des capacités visuo-constructives en deux dimensions",
    keyTest: "figuresreyb"
  },  
  {
    nom:"Epreuve des cubes (Nepsy 2)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation des praxies visuo-constructives en 3 dimensions",
    keyTest: "epreuvecubesnepsy2"
  },  
]

export const testByNames = allTests.map((test: TestBilan)=> test.nom)

export const domainesTestsArray = Array.from(new Set(allTests.map(test => test.domaine)))