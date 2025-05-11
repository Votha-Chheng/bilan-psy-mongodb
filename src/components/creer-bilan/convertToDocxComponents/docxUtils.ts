import { CellStyleAndContent, defaultCellStyle } from "@/@types/DocxTypes"
import { Paragraph, TableCell, TableRow, TextRun } from "docx"

export const cellContainsExposant = (cellContent: CellStyleAndContent): TextRun[] => {
  return [
    new TextRun({
      text: cellContent.text ?? "PAS DE RESULTAT",
      bold: cellContent.bold,
      italics: cellContent.italics,
      ...defaultCellStyle
    }),
    new TextRun({
      text: !cellContent.text ? "": (cellContent.text && +cellContent?.text === 1 ? "er" :  "ème"),
      superScript: true,
      ...defaultCellStyle
    }),
    new TextRun({
      text: " percentile",
      ...defaultCellStyle
    }),

  ]
}

export const generateRow = (cellContent: CellStyleAndContent[]): TableRow=> {
  const row = new TableRow({
    cantSplit: true,
    children: cellContent.map((cell: CellStyleAndContent) => (
      new TableCell({
        margins: {
          top:cell.paddingVertical ?? 0,
          bottom:cell.paddingVertical ?? 0,
          left: 50,
          right: 50
        },
        width: cell.cellWidth ? { size: cell.cellWidth, type: "pct"} : undefined,
        verticalAlign:"center",
        shading: {fill: cell.fill ?? "ffffff"},
        children: [
          new Paragraph({
            alignment: cell.alignment,
            children: 
              cell.superscript
              ?
              [...cellContainsExposant(cell)]
              : 
              [
                new TextRun({
                  font: "Calibri",
                  italics: cell.italics,
                  size: cell.size,
                  bold: cell.bold,
                  text: cell.text
                })
              ]
          })
        ]
      })
    ))
  })
  

  return row

}