import { TestBilan } from "@/@types/TestTypes";

export const allTests: TestBilan[] = [
  {
    nom:"M-ABC2", 
    domaine: "motricité", 
    description: "évaluation des compétences en dextérité manuelle, coordinations globales et en équilibre statique et dynamique"
  }, 
  {
    nom:"Epreuve visuomotrice de la Nepsy 2", 
    domaine: "motricité", 
    description : "évaluation de la précision visuomotrice corrélée avec la vitesse de la réalisation"
  }, 
  {
    nom:"Imitation de positions de la Nepsy 2", 
    domaine: "schéma corporel et praxies", 
    description : ""
  }, 
  {
    nom:"Praxies gestuelles", 
    domaine: "schéma corporel et praxies", 
    description : ""
  }, 
  {
    nom:"BHK (épreuve d'écriture)", 
    domaine: "graphisme", 
    description : "test d'écriture de 5 min en copie"
  }, 
  {
    nom:"Epreuve visuo-spatiale des flèches (Nepsy 2)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation de la précision visuo-spatiale"
  }, 
  {
    nom:"Epreuve visuoconstructive en deux dimensions (Figure de Rey A)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation des capacités visuo-constructives en deux dimensions"
  },  
  {
    nom:"Epreuve visuoconstructive en deux dimensions (Figure de Rey B)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation des capacités visuo-constructives en deux dimensions"
  },  
  {
    nom:"Epreuve des cubes (Nepsy 2)", 
    domaine: "structuration spatiale et temporelle", 
    description : "évaluation des praxies visuo-constructives en 3 dimensions"
  },  
]

export const testByNames = allTests.map((test: TestBilan)=> test.nom)

export const domainesTestsArray = Array.from(new Set(allTests.map(test => test.domaine)))