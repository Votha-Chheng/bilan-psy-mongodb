import { AnamneseResults } from "@/@types/Anamnese"
import { generateEmptyParagraph } from "../ui/ParagraphFunctions"
import { Paragraph, TextRun } from "docx"
import { anamneseSubTitle, anamneseTitle } from "../ui/anamneseSubtitle"
import { generateAnamneseSimpleParagraph } from "./generateAnamneseParagraphs"

const Apprentissages = (anamneseResults: AnamneseResults|null)=> {
  if(!anamneseResults) return null
  const {apprentissages} = anamneseResults
  if(!apprentissages) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Apprentissages"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${apprentissages[0]}. ${apprentissages[1] !== "" ? ` ${apprentissages[1]}` : ""}`
      }),
    ]
  })
}

const OutilsScolaires = (anamneseResults: AnamneseResults|null)=> {
  if(!anamneseResults) return null
  const {outils} = anamneseResults
  if(!outils) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Utilisation des outils scolaires"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${outils[0]}. ${outils[1] !== "" ? ` ${outils[1]}` : ""}`
      }),
    ]
  })
}

const Ecriture = (anamneseResults: AnamneseResults|null)=> {
  if(!anamneseResults) return null
  const {ecriture} = anamneseResults
  if(!ecriture) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Écriture"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${ecriture[0]}. ${ecriture[1] !== "oui" ? " Des douleurs sont signalées pendant l'écriture." : " Aucune douleur signalée durant l'écriture."} ${ecriture[2] !== "" ? ` ${ecriture[2]}` : ""}`
      }),
    ]
  })
}

const Comportement = (anamneseResults: AnamneseResults|null)=> {
  if(!anamneseResults) return null
  const {comportement} = anamneseResults
  if(!comportement) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Comportement"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` l'enfant est décrit comme ${comportement[1]}. ${comportement[0] !== "" ? ` ${comportement[0]}` : ""}`
      }),
    ]
  })
}

const CartableBureau = (anamneseResults: AnamneseResults|null)=> {
  if(!anamneseResults) return null
  const {cartableBureau} = anamneseResults
  if(!cartableBureau) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Organisation du cartable et du bureau"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: `${cartableBureau[0] !== "" ? ` présence de difficultés ${cartableBureau[0]}.`:""} ${cartableBureau[1] !== "" ? ` ${cartableBureau[1]}` : ""}`
      }),
    ]
  })
}

const RelationsPairs = (anamneseResults: AnamneseResults|null)=> {
  if(!anamneseResults) return null
  const {relationsPairs} = anamneseResults
  if(!relationsPairs) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Relations avec les pairs"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${relationsPairs[0]} ${relationsPairs[1] !== "" ? ` ${relationsPairs[1]}` : ""}`
      }),
    ]
  })
}

const Attention = (anamneseResults: AnamneseResults|null)=> {
  if(!anamneseResults) return null
  const {attention} = anamneseResults
  if(!attention) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Sphère attentionnelle"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${attention[0]}. ${attention[1] !== "" ? ` ${attention[1]}` : ""}`
      }),
    ]
  })
}


export const ScolariteDocx = (anamneseResults: AnamneseResults|null): Paragraph[] => {
  if(!anamneseResults) return [generateEmptyParagraph()]
  const rawBody = [
    anamneseTitle("Scolarité"), 
    generateAnamneseSimpleParagraph(anamneseResults, "classe", "Classe"),
    Apprentissages(anamneseResults),
    OutilsScolaires(anamneseResults),
    Ecriture(anamneseResults),
    CartableBureau(anamneseResults),
    RelationsPairs(anamneseResults),
    Comportement(anamneseResults),
    Attention(anamneseResults),
    generateAnamneseSimpleParagraph(anamneseResults, "cahiers", "Observations des cahiers"),
    generateAnamneseSimpleParagraph(anamneseResults, "anterieur", "Scolarité antérieure"),
  ]

  return rawBody.filter(element=> element !== null) as Paragraph[]
}