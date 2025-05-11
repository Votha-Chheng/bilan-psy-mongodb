import { AnamneseResults } from "@/@types/Anamnese";
import { Paragraph, TextRun } from "docx";
import { generateEmptyParagraph } from "../ui/ParagraphFunctions";
import { anamneseSubTitle, anamneseTitle } from "../ui/anamneseSubtitle";
import { generateAnamneseSimpleParagraph } from "./generateAnamneseParagraphs";

const CaractereQuotidien = (anamneseResults: AnamneseResults|null): Paragraph|null => {
  if(!anamneseResults) return null
  const {decritAuQuotidien} = anamneseResults
  if(!decritAuQuotidien) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      new TextRun({
        font: "Calibri",
        size: 24,
        bold: true,
        italics: true,
        text: `Le patient est décrit comme `
      }),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: `${decritAuQuotidien.join(", ")}.`
      }),
    ]
  })
}

const Autonomie = (anamneseResults: AnamneseResults|null): Paragraph|null => {
  if(!anamneseResults) return null
  const {autonomie} = anamneseResults
  if(!autonomie) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Autonomie"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${autonomie[0]}. ${autonomie[1] !== "" ? ` ${autonomie[1]}` : ""}`
      }),
    ]
  })
}

const GestionEmotions = (anamneseResults: AnamneseResults|null): Paragraph|null => {
  if(!anamneseResults) return null
  const {gestionEmotions} = anamneseResults
  if(!gestionEmotions) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Gestion des émotions"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${gestionEmotions[0]}. ${gestionEmotions[1] !== "" ? ` ${gestionEmotions[1]}` : ""}`
      }),
    ]
  })
}

const GestionTemps = (anamneseResults: AnamneseResults|null): Paragraph|null => {
  if(!anamneseResults) return null
  const {gestionTemps} = anamneseResults
  if(!gestionTemps) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Gestion du temps"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${gestionTemps[0]}. ${gestionTemps[1] !== "" ? ` ${gestionTemps[1]}` : ""}`
      }),
    ]
  })
}

const Temperament = (anamneseResults: AnamneseResults|null): Paragraph|null => {
  if(!anamneseResults) return null
  const {temperament} = anamneseResults
  if(!temperament) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Tempérament et personnalité"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${temperament[0]} ${temperament[1] !== "" ? ` ${temperament[1]}` : ""}`
      }),
    ]
  })
}

const Sommeil = (anamneseResults: AnamneseResults|null): Paragraph|null => {
  if(!anamneseResults) return null
  const {sommeilQuotidien} = anamneseResults
  if(!sommeilQuotidien) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Sommeil"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${sommeilQuotidien[0]}. Endormissement : ${sommeilQuotidien[1]}. ${sommeilQuotidien[2] !== "" ? ` ${sommeilQuotidien[2]}` : ""}`
      }),
    ]
  })
}

export const QuotidienDocx = (anamneseResults: AnamneseResults|null): Paragraph[]=> {
  if(!anamneseResults) return [generateEmptyParagraph()]
    const rawBody = [
      anamneseTitle("Quotidien"), 
      CaractereQuotidien(anamneseResults),
      Autonomie(anamneseResults),
      generateAnamneseSimpleParagraph(anamneseResults, "ecouteConsignes", "Écoute des consignes"),
      generateAnamneseSimpleParagraph(anamneseResults, "agitationMotrice", "Agitation motrice"),
      generateAnamneseSimpleParagraph(anamneseResults, "devoirs", "Devoirs"),
      GestionEmotions(anamneseResults),
      GestionTemps(anamneseResults),
      Temperament(anamneseResults),
      Sommeil(anamneseResults),
      generateAnamneseSimpleParagraph(anamneseResults, "alimentationQuotidien", "Alimentation au quotidien"),
      generateAnamneseSimpleParagraph(anamneseResults, "autresQuotidien", "Autres (quotidien)"),
    ]
  
    return rawBody.filter(element=> element !== null) as Paragraph[]
}