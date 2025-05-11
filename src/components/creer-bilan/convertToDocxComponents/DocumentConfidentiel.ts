import { Paragraph, TextRun } from "docx";

export const DocumentConfidentiel = (medecin: string|null)=> {
  return new Paragraph({
    alignment: "right",
    children: [
      new TextRun({
        text: "Document confidentiel, remis aux parents pour faire valoir ce que de droit.",
        font: "Calibri",
        italics: true,
        size: 16,
      }),
      new TextRun({
        break: 1,
      }),
      new TextRun({
        text: `Médecin prescripteur : `,
        font: "Calibri",
        bold: true,
        size: 16,
      }),
      new TextRun({
        text: `${medecin ?? "PAS DE MEDECIN"}`,
        font: "Calibri",
        size: 16,
      }),
    ]
  })
}