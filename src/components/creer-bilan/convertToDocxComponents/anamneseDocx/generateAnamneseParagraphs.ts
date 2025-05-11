import { Paragraph, TextRun } from "docx"
import { generateEmptyParagraph } from "../ui/ParagraphFunctions"
import { AnamneseResults } from "@/@types/Anamnese"
import { anamneseSubTitle, anamneseTitle } from "../ui/anamneseSubtitle"

export const generateAnamneseItemsParagraphs = (anamneseResults: AnamneseResults|null|undefined, series : {label: string, content: string|null|undefined}[], subTitle: string): Paragraph[]=> {
  if(!anamneseResults) return [generateEmptyParagraph()]
  
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
  return [anamneseTitle(subTitle), ...result]
}

export const generateAnamneseSimpleParagraph = (anamneseResults: AnamneseResults|null, key: keyof AnamneseResults, subtitle: string): Paragraph|null=> {
  if(!anamneseResults) return null
  if(!anamneseResults[key]) return null
  return new Paragraph({
    spacing: {
      before: 75
    },
    indent: { left: 200 },
    children: [
      anamneseSubTitle(subtitle),
      new TextRun({
        font: "Calibri",
        size: 24,
        text: ` ${anamneseResults[key]}`
      })
    ]
  })

}