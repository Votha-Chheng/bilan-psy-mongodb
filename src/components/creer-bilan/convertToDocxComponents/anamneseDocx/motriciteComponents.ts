import { AnamneseResults } from "@/@types/Anamnese";
import { Paragraph, TextRun } from "docx";
import { generateEmptyParagraph } from "../ui/ParagraphFunctions";
import { anamneseSubTitle, anamneseTitle } from "../ui/anamneseSubtitle";
import { generateAnamneseSimpleParagraph } from "./generateAnamneseParagraphs";

const MotriciteGlobaleFine = (key: "motriciteFine"|"motriciteGlobale", anamneseResults: AnamneseResults|null): Paragraph|null=> {
  if(!anamneseResults?.[key]) return null
  const {motriciteFine, motriciteGlobale} = anamneseResults ?? {}

  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle(key === "motriciteGlobale" ? "Motricité globale": "Motricité fine"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${key === "motriciteGlobale" ? `${motriciteGlobale![0]}. ${motriciteGlobale?.[1] ?? ""}` :`${motriciteFine![0]}. ${motriciteFine?.[1] ?? ""}`}`
      }),
    ]
  })
}

const AcquisitionVelo = (anamneseResults: AnamneseResults|null): Paragraph|null=> {
  if(!anamneseResults) return null
  const {velo} =  anamneseResults ?? {}
  if(!velo) return null

  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Acquisition du vélo sans les roulettes"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` à l'âge de ${velo[0]} ans ${velo[1]}. ${velo[2] !== "" ? ` ${velo[2]}` : ""}`
      }),
    ]
  })
}

const Sensorialite = (anamneseResults: AnamneseResults): Paragraph|null=> {
  const {sensorialite} = anamneseResults ?? {}
  if(!anamneseResults) return null
  if(!sensorialite) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Sensorialité"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` de type ${sensorialite[0]}. ${sensorialite[1] !== "" ? ` ${sensorialite[1]}` : ""}`
      }),
    ]
  })
}

export const MotriciteDocx = (anamneseResults: AnamneseResults|null): Paragraph[] => {
  if(!anamneseResults) return [generateEmptyParagraph()]
  const rawBody = [
    anamneseTitle("Motricité"), 
    MotriciteGlobaleFine("motriciteGlobale", anamneseResults),
    MotriciteGlobaleFine("motriciteFine", anamneseResults),
    AcquisitionVelo(anamneseResults),
    generateAnamneseSimpleParagraph(anamneseResults, "praxiesGestuelles", "Praxies gestuelles"),
    generateAnamneseSimpleParagraph(anamneseResults, "extraScolaire", "Activités extra-scolaires"),
    Sensorialite(anamneseResults),
    generateAnamneseSimpleParagraph(anamneseResults, "autresMotricite", "Autres (motricité)"),
  ]

  return rawBody.filter(element=> element !== null) as Paragraph[]
}