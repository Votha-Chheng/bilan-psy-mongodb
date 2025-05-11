import { Paragraph, TextRun } from "docx"

export const LineBreak = (numberOfBreak: number = 1)=> {
  return (
    new Paragraph({
      alignment: "center",
      children: [
        new TextRun({
          break:numberOfBreak,
        }),
      ]
    })
  )
} 
