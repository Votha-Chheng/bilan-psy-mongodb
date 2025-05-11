import { FlechesNEPSY2ResultsDTO } from "@/@types/BilanTests";
import { Table } from "docx";
import { generateRow } from "../../docxUtils";
import { defaultCellStyle } from "@/@types/DocxTypes";
import { getBgColorForDeviationStandard } from "@/utils/getColorCells";

export const TableFlechesNepsy2Docx = (flechesNepsy2Results: FlechesNEPSY2ResultsDTO|null): Table|null=> {
  if(!flechesNepsy2Results) return null
  return (
    new Table({
      rows: [
        generateRow([
          {
            ...defaultCellStyle,
            cellWidth: 50,
            paddingVertical:20,
            alignment: "left",
            bold: true,    
            text: "Score en note étalonnée",
          },
          {
            ...defaultCellStyle,
            cellWidth: 50,
            paddingVertical:20,
            alignment: "center",
            text: flechesNepsy2Results.score ?? "A REMPLIR",
            fill: getBgColorForDeviationStandard(+(flechesNepsy2Results?.score?? 0 )).substring(0)
          }
        ]),

      ]
    })
  )
}