import { BilanDTO } from "@/@types/BilanTests"
import { Paragraph, TextRun } from "docx"
import { generateEmptyParagraph } from "../ui/ParagraphFunctions"

export const TestsUtilisesDocx = (bilanTestResults: BilanDTO|null): Paragraph=> {
  if(!bilanTestResults) return generateEmptyParagraph()
  const {tests} = bilanTestResults
  if(!tests) return generateEmptyParagraph()

  const testTextRun: TextRun[] = tests.map((test, index)=> (
    new TextRun({
      text: `${index === tests.length-1 ?  test : test + " - "}` ,
      size:24,
      font:"Calibri",
      italics: true
    })
  ))

  return (
    new Paragraph({
      spacing: {
        before:175,
        after: 175, // 500 = 10 pts de marge (1 pt = 1/20e de twip)
      },
      children: [
        new TextRun({
          font: "Calibri",
          size: 24,
          text: `Tests utilisés`,
          bold: true,
          italics: true,
          underline: {type: "single"}
        }),
        new TextRun({
          font: "Calibri",
          size: 24,
          text: ` : `,
          bold: true,
        }),
        ...testTextRun
      ]
    })
  )
}