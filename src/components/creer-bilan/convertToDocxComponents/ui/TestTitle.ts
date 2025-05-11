import { TestBilan } from "@/@types/BilanTests"
import { Paragraph } from "docx"
import { generateRawTextRun } from "./ParagraphFunctions"
import { defaultTextStyle } from "@/@types/DocxTypes"

export const TestTitle = (test: TestBilan, before: number = 300, after: number = 300): Paragraph => {
  return (
    new Paragraph({
      spacing: {
        before: before,
        after:after
      },
      alignment:"left",
      children: [
        generateRawTextRun("► "),
        generateRawTextRun(test.nom, {...defaultTextStyle, bold: true, italics: true}),
        test.description ? generateRawTextRun(` : ${test.description}.`, {...defaultTextStyle, italics: true}) : generateRawTextRun(""),
      ]
    })
  )
  
}