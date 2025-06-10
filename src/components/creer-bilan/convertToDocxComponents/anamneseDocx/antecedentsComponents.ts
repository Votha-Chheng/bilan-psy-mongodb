import { AnamneseResults, BilanMedicauxResults } from "@/@types/Anamnese";
import { Paragraph, TextRun } from "docx";
import { generateDefaultParagraph, generateEmptyParagraph } from "../ui/ParagraphFunctions";
import { seriesAntecedentsBody, seriesBilanMedicaux } from "@/datas/seriesForAnamneseDocx";
import dayjs from "dayjs";
import { anamneseSubTitle, anamneseTitle } from "../ui/anamneseSubtitle";

export const ProposDocx = (anamneseResult: AnamneseResults|null): Paragraph|null => {
  const {proposPapaOuMaman} = anamneseResult ?? {}

  if(!anamneseResult) return null

  return new Paragraph({
    children: [
      new TextRun({
        text: proposPapaOuMaman ? `Les propos sont recueillis auprès ${proposPapaOuMaman} en présence de l'enfant.` : "NON REMPLI",
        bold: true,
        italics: true,
        font: "Calibri",
        size: 24,
      }),
    ]
  })
}

export const BilanMedicauxDocx = (bilanMedicauxResults: BilanMedicauxResults|null): Paragraph[]|null=> {
  if(!bilanMedicauxResults) return null
  let result: Paragraph[] = []

  const title = new Paragraph({
    spacing: {
      before: 75
    },
    indent: {
      left: 200
    },
    children: [
      anamneseSubTitle("Bilans médicaux effectués")
    ]
  })

  const series = seriesBilanMedicaux(bilanMedicauxResults)

  for(let i=0; i<series.length; i++){
    if(series && series[i]?.content){
      const paragraph = new Paragraph({
        spacing: {
          before: 75
        },
        indent: { left: 400 },
        children: [
          new TextRun({
            bold: true,
            font: "Calibri",
            italics: true,
            size: 24,
            text: `– ${series[i].label} :`
          }),
          new TextRun({
            font: "Calibri",
            size: 24,
            text: ` effectué le ${dayjs(series[i].content?.[0]).format("DD/MM/YYYY") ?? "Aucune date enregistrée"}`
          }),
          new TextRun({
            font: "Calibri",
            size: 24,
            text: ` | Dossier transmis : ${series[i].content?.[1] ?? "Aucune information"}`
          }),
          new TextRun({
            font: "Calibri",
            italics: true,
            size: 24,
            text: ` ${series[i].content?.[1] === "oui" ? "- (cf. compte-rendu)":""}`
          })
        ]
      })

      result = [...result, paragraph]
    }
  }
  return [title, ...result]
}

const DossierMDPH = (anamneseResult: AnamneseResults|null) : Paragraph|null=> {
  const {dossierMDPH} = anamneseResult ?? {}
  console.log("dossierMDPH", dossierMDPH)
  if(!dossierMDPH) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle("Dossier MDPH"),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${dossierMDPH[0]} ${dossierMDPH[1] ? `| ${dossierMDPH[1]}`:""} `
      }),

    ]
  })
}

const AntecedentsBody = (anamneseResult: AnamneseResults|null): Paragraph[]=> {
  if(!anamneseResult) return [generateEmptyParagraph()]
  const series = seriesAntecedentsBody(anamneseResult)
  let result: Paragraph[] = []
  for(let i=0; i<series.length; i++){
    if(series[i].content){
      const paragraph = new Paragraph({
        spacing: {
          before: 75
        },
        indent: { left: 200 },
        children: [
          anamneseSubTitle(series[i].label),
          new TextRun({
            font: "Calibri",
            size: 24,
            text: ` ${series[i].content}`
          })
        ]
      })

      result = [...result, paragraph]
    }
  }

  return result

}

export const AntecedentsDocx = (anamneseResult: AnamneseResults|null): Paragraph[] => {
  const {neant} = anamneseResult ?? {}

  if(!anamneseResult) return [generateEmptyParagraph()]

  if(neant === "true"){
    return [anamneseTitle("Antécédents médicaux personnels et suivis médicaux"), generateDefaultParagraph("Rien à signaler.")]
  }

  let rawBody = []
  if(BilanMedicauxDocx(anamneseResult?.bilanMedicauxResults ?? null)){
    // eslint-disable-next-line
    rawBody = [anamneseTitle("Antécédents médicaux personnels et suivis médicaux"), ...BilanMedicauxDocx(anamneseResult?.bilanMedicauxResults ?? null) as any[], DossierMDPH(anamneseResult), ...AntecedentsBody(anamneseResult)]
  } else {
    rawBody = [anamneseTitle("Antécédents médicaux personnels et suivis médicaux"), DossierMDPH(anamneseResult), ...AntecedentsBody(anamneseResult)]
  }
  return rawBody
}
