import { VisuomotriceNEPSY2ResultsDTO } from "@/@types/BilanTests";
import { Table } from "docx";
import { generateRow } from "../../docxUtils";
import { defaultCellStyle } from "@/@types/DocxTypes";
import { getBgColorForNoteStandard } from "@/utils/getColorCells";

export const TableVisuomotriceNepsy2Docx = (visuomotriceNepsy2Results: VisuomotriceNEPSY2ResultsDTO|null):Table|null => {
  if(!visuomotriceNepsy2Results) return null
  const {precisionVisuoMoteur} = visuomotriceNepsy2Results
  return new Table({
    width: {
      size: 75,
      type: "pct"
    },
    alignment: "left",
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
          text: "Précision visuomotrice",
          cellWidth: 50,
          paddingVertical:20,
          alignment: "left",
          bold: true,
        },
        {
          ...defaultCellStyle,
          fill: getBgColorForNoteStandard(+(precisionVisuoMoteur ?? 0)).substring(0),
          text: precisionVisuoMoteur ?? "PAS DE RESULTATS",
          cellWidth: 50,
          paddingVertical:20,
          alignment: "center",
        },
      ])
    ]
  })
}