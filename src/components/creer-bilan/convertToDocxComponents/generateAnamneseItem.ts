import { AnamneseResults } from "@/@types/Anamnese";
import { Paragraph, TextRun } from "docx";
import { anamneseSubTitle } from "./ui/anamneseSubtitle";

export const generateAnamneseItem = (key: keyof AnamneseResults, anamneseResult: AnamneseResults|null, label: string): Paragraph|null=> {
  if(!anamneseResult) return null
  if(!anamneseResult[key]) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle(label),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${anamneseResult[key]}`
      })
    ]
  })
}