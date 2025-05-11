import { EpreuveCubesNEPSY2ResultsDTO } from "@/@types/BilanTests";
import { Table } from "docx";
import { generateRow } from "../../docxUtils";
import { defaultCellStyle } from "@/@types/DocxTypes";
import { getBgColorForNoteStandard } from "@/utils/getColorCells";

export const TableCubesNepsy2Docx = (epreuveCubesNepsy2: EpreuveCubesNEPSY2ResultsDTO|null): Table|null=> {
  if(!epreuveCubesNepsy2) return null
  return (
    new Table({
      width: {
        size: 65,
        type:'pct'
      },
      rows: [
        generateRow([
         {
          ...defaultCellStyle,
          cellWidth: 50,
          paddingVertical:20,
          alignment: "left",
          bold: true,    
          text: "Score en note standard",
        },
        {
          ...defaultCellStyle,
          cellWidth: 50,
          paddingVertical:20,
          alignment: "center",
          text: epreuveCubesNepsy2.scoreNS ?? "A REMPLIR",
          fill: getBgColorForNoteStandard(+(epreuveCubesNepsy2?.scoreNS?? 0 )).substring(0)
        }
        ])
      ]
    })
  )
}