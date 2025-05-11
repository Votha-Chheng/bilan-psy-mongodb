import { Paragraph, TextRun } from "docx";

export const Title = new Paragraph({
  alignment: "center",
  spacing: {
    line: 220,
    lineRule: "auto"
  },
  children: [
    new TextRun({
      text: "Estelle BÉTRY",
      font: "Calibri",
      bold: true,
      size: 28,
    }),
    new TextRun({
      break: 1,
    }),
    new TextRun({
      text: "Psychomotricienne D.E.",
      font: "Calibri",
      bold: true,
      size: 24,
    }),
  ]
})
