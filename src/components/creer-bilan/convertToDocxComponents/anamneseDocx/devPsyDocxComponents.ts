import { AnamneseResults } from "@/@types/Anamnese";
import { Paragraph, TextRun } from "docx";
import { generateEmptyParagraph } from "../ui/ParagraphFunctions";
import { generateAnamneseItem } from "../generateAnamneseItem";
import { anamneseSubTitle, anamneseTitle } from "../ui/anamneseSubtitle";

export const ConfereDocx = (anamneseResult: AnamneseResults|null): Paragraph|null=> {
  const {confereDevPsy} = anamneseResult ?? {}
  if(!confereDevPsy) return generateEmptyParagraph()
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Confère"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` cf. ${confereDevPsy}.`
      })
    ]
  })
}

export const AccouchementDocx = (anamneseResult: AnamneseResults|null): Paragraph|null=> {
  const {accouchement} = anamneseResult ?? {}
  if(!accouchement) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Accouchement"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` à ${accouchement[0]} semaines d’aménorrhées + ${accouchement[1]} jours par ${accouchement[2]}.`
      }),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: accouchement[3] !== "" ? ` ${accouchement[3]}`: ""
      }),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: accouchement[4] !== "" ? ` ${accouchement[4]}`: ""
      })
    ]
  })
}

export const AgeMarcheDocx = (anamneseResult: AnamneseResults|null): Paragraph|null=> {
  const {ageMarche} = anamneseResult ?? {}
  if(!ageMarche) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Âge de la marche"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` à ${ageMarche[0]} mois chez un enfant décrit comme ${ageMarche[1]}.`
      })
    ]
  })
}

export const AcquisitionLangageDocx = (anamneseResult: AnamneseResults|null): Paragraph|null=> {
  const {acquisitionLangage} = anamneseResult ?? {}
  if(!acquisitionLangage) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Acquisition du langage"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${acquisitionLangage[0]}. Niveau actuel : ${acquisitionLangage[1]}.`
      }),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: acquisitionLangage[2] !== "" ? ` ${acquisitionLangage[2]}`: ""
      })
    ]
  })
}

export const ContinenceDocx = (anamneseResult: AnamneseResults|null): Paragraph|null=> {
  const {continence} = anamneseResult ?? {}
  if(!continence) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Continence"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` la continence diurne est ${continence[0] === "diurne acquise" ? `acquise depuis l'âge de ${continence[1]} mois.`:"non-acquise."}`
      }),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` La continence diurne est ${continence[2] === "nocturne acquise" ? `acquise depuis l'âge de ${continence[3]} mois.`:"non-acquise."}`
      })
    ]
  })
}

export const DevPsyDocx = (anamneseResult: AnamneseResults|null): Paragraph[] => {
  const rawBody = [
    anamneseTitle("Développement psychomoteur"), 
    ConfereDocx(anamneseResult), 
    generateAnamneseItem("grossesse", anamneseResult, "Grossesse"),
    AccouchementDocx(anamneseResult),
    generateAnamneseItem("stationAssise", anamneseResult, "Age de la station assise"),
    generateAnamneseItem("quadrupedie", anamneseResult, "Quadrupédie"),
    AgeMarcheDocx(anamneseResult),
    AcquisitionLangageDocx(anamneseResult),
    ContinenceDocx(anamneseResult),
    generateAnamneseItem("alimentation", anamneseResult, "Alimentation"),
    generateAnamneseItem("autresDevPsy", anamneseResult, "Autres (développement psychomoteur)"),
  ]

  return rawBody.filter(element=> element !== null) as Paragraph[]
}