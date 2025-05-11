import { Paragraph, TextRun } from "docx";

export const ConclusionSubtitle = (subtitle: string): Paragraph=> {
  return (
    new Paragraph({
      alignment: "left",
      spacing: {
        after: 100
      },
      children: [
        new TextRun({
          text: `${subtitle}`,
          font: "Calibri",
          bold: true,
          underline:{type:"single"},
          size: 24,
        })
      ]
    })
  )
}