import { Paragraph, TextRun } from "docx"

export const anamneseSubTitle = (subTitle: string): TextRun=> {
  return new TextRun({
    bold: true,
    italics: true,
    font: "Calibri",
    size: 24,
    text: `${subTitle} :`
  })
}

export const anamneseTitle = (title: string): Paragraph=> {
  return new Paragraph({
    spacing: {
      before:300,
    },
    children: [
      new TextRun({
        font: "Calibri",
        size: 20,
        text: `► `,
        bold: true
      }),
      new TextRun({
        font: "Calibri",
        size: 24,
        underline: {type: "single"},
        text: `${title}`,
        bold: true,
        italics: true
      })
    ]
  })
}