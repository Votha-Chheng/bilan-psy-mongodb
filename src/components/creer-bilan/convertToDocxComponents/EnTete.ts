import { Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from "docx";

export const EnTete = new Table({
  width: {
    size: 100,
    type:WidthType.PERCENTAGE
  },
  margins: {
    top: 500,
    bottom: 500,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 75,
            type:WidthType.PERCENTAGE
          },
          borders: {
            top: { style:"nil" }, // Pas de bordure en haut
            left: { style:"nil" }, // Pas de bordure à gauche
            bottom: { style:"nil" }, // Pas de bordure en bas
            right: { style:"nil" }, // Pas de bordure à droite
          },
          children: [
            new Paragraph({
              alignment: "left",
              spacing: {
                line: 220,
                lineRule: "auto"
              },
              children: [
                new TextRun({
                  text: "Espace paramédical du Devenson",
                  font: "Calibri",
                  size: 20,
                }),
                new TextRun({
                  break: 1,
                }),
                new TextRun({
                  text: "Route de Maussane",
                  font: "Calibri",
                  size: 20,
                }),
                new TextRun({
                  break: 1,
                }),
                new TextRun({
                  text: "13890 MOURIES",
                  font: "Calibri",
                  size: 20,
                }),
                new TextRun({
                  break: 1,
                }),
                new TextRun({
                  text: "06 44 85 18 00",
                  font: "Calibri",
                  size: 20,
                }),
                new TextRun({
                  break: 1,
                }),
                new TextRun({
                  text: "betry.estelle@gmail.com",
                  font: "Calibri",
                  size: 20,
                }),
              ]
            })
          ],
        }),
        new TableCell({
          width: {
            size: 25,
            type:"pct"
          },
          borders: {
            top: { style:"nil" }, // Pas de bordure en haut
            left: { style:"nil" }, // Pas de bordure à gauche
            bottom: { style:"nil" }, // Pas de bordure en bas
            right: { style:"nil" }, // Pas de bordure à droite
          },
          children: [
            new Paragraph({
                alignment: "left",
                children: [
                  new TextRun({
                    text: "Numéro ADELI : 13 96 0261 9",
                    font: "Calibri",
                    size: 20,
                  }),
                  new TextRun({
                    break: 1,
                  }),
                  new TextRun({
                    text: "Siret : 80108143100034",
                    font: "Calibri",
                    size: 20,
                  }),
                ],
            }),
          ],
        }),
      ],
    }),
  ],
})
