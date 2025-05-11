import { Paragraph, Table, TableCell, TableRow, TextRun } from "docx"

export const GreyBgTitle = (title: string, textSize: number = 30, bold: boolean = true)=> {
  return (
    new Table({
      width: {size: 100, type:"pct"},
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: {size: 100, type: "pct"},
              margins: { top: 100, bottom: 100 },
              shading: { fill: "DDDDDD", type:"clear" },
              borders: {
                top: { style:"nil" }, // Pas de bordure en haut
                left: { style:"nil" }, // Pas de bordure à gauche
                bottom: { style:"nil" }, // Pas de bordure en bas
                right: { style:"nil" }, // Pas de bordure à droite
              },
              children: [
                new Paragraph({
                  alignment: "center",
                  children: [
                    new TextRun({
                      text: title,
                      font: "Calibri",
                      bold,
                      size: textSize,
                    }),
                  ]
                })
              ],
            }),
          ],
        }),
      ]
    })
  )
}