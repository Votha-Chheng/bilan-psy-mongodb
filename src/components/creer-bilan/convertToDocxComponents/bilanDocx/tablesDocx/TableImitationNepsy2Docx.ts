import { ImitationPositionsNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { Table } from "docx"
import { generateRow } from "../../docxUtils"
import { defaultCellStyle } from "@/@types/DocxTypes"
import { getBgColorForDeviationStandard } from "@/utils/getColorCells"

export const TableImitationNepsy2Docx = (imitationNepsy2Results: ImitationPositionsNEPSY2ResultsDTO|null): Table|null=> {
  if(!imitationNepsy2Results) return null
  return(
    new Table({
      rows: [
        generateRow([
          {
            ...defaultCellStyle,
            text: "",
            cellWidth: 50,
            paddingVertical:20,
            alignment: "left",
            bold: true,
          },
          {
            ...defaultCellStyle,
            text: "Score en note étalonnée",
            cellWidth: 50,
            paddingVertical:20,
            alignment: "center",
            bold: true,
          }
        ]),
        generateRow([
          {
            ...defaultCellStyle,
            text: "Imitation des gestes des mains",
            cellWidth: 50,
            paddingVertical:20,
            alignment: "left",
            bold: true,
          },
          {
            ...defaultCellStyle,
            text: imitationNepsy2Results.imitationGestesMains ?? "Non déterminé",
            fill: getBgColorForDeviationStandard(imitationNepsy2Results.imitationGestesMains ? +imitationNepsy2Results.imitationGestesMains : 0 ).substring(0),
            cellWidth: 50,
            paddingVertical:20,
            alignment: "center",
          }
        ]),

      ]
    })
  )
}