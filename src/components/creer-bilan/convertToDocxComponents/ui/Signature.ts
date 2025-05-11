

import { Paragraph, Table, TableCell, TableRow, TextRun } from "docx";
import { generateRawTextRun } from "./ParagraphFunctions";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { getWeekDayFR } from "@/utils/convertFunctions";

const dateFRFormat = (date:Date): string => {
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const frMonth = (month+1).toString().length === 1 ? `0${month+1}` : month+1
  return `${getWeekDayFR(date)} ${day}/${frMonth}/${year}`
}

export const Signature = new Table({
  borders: {
    top: { style:"nil" }, // Pas de bordure en haut
    left: { style:"nil" }, // Pas de bordure à gauche
    bottom: { style:"nil" }, // Pas de bordure en bas
    right: { style:"nil" }, // Pas de bordure à droite
  },
  alignment: "right", // Aligne le tableau entier à droite
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              alignment: "right",
              children: [
                generateRawTextRun("Estelle BÉTRY,", {...defaultTextStyle, bold: true}),
                new TextRun({break:1}),
                generateRawTextRun("Psychomotricienne D.E.", {...defaultTextStyle, bold: true}),
                new TextRun({break:1}),
                generateRawTextRun(`Rédigé à Mouriès le ${dateFRFormat(new Date(Date.now()))}`, {...defaultTextStyle, bold: true}),
                new TextRun({break:1}),
              ]
            })
          ]
        }),
      ],
    }),
  ],
});