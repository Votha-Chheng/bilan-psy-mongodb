import { Paragraph, TextRun } from "docx"

export const MotifConsultation = (motifConsultation: string|null)=> {
  return (
    new Paragraph({
      alignment: "left",
      spacing: {
        line: 220,
        lineRule: "auto"
      },
      children: [
        new TextRun({
          text: `Motif de consultation :`,
          font: "Calibri",
          bold: true,
          underline:{type:"single"},
          size: 24,
        }),
        new TextRun({
          text: ` ${motifConsultation ?? "Aucun motif enregistré."}`,
          font: "Calibri",
          size: 24,
        }),
        new TextRun({
          break:1,
        })
      ]
    })
  )
}