import { MABC2ResultsDTO } from "@/@types/BilanTests"
import { Table } from "docx"
import { generateRow } from "../../docxUtils"
import { defaultCellStyle } from "@/@types/DocxTypes"
import { getBgColorForPercentiles } from "@/utils/getColorCells"

export const TableMabc2Docx = (mabc2Results: MABC2ResultsDTO|null ): Table|null=> {
  if(!mabc2Results) return null
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
          text: "Dextérité manuelle",
          cellWidth: 50,
          paddingVertical:20,
          alignment: "left",
          bold: true,
        },
        {
          ...defaultCellStyle,
          text: mabc2Results.dexteriteManuelle ? `${mabc2Results.dexteriteManuelle}`:"PAS DE RESULTATS"   ,
          fill: getBgColorForPercentiles(mabc2Results?.dexteriteManuelle ? +mabc2Results.dexteriteManuelle : undefined ),
          cellWidth: 50,
          paddingVertical:20,
          superscript:true,
          alignment: "center",
        }
      ]),
      generateRow([
        {
          ...defaultCellStyle,
          text: "Viser-attraper",
          cellWidth: 50,
          paddingVertical:20,
          alignment: "left",
          bold: true,
        },
        {
          ...defaultCellStyle,
          text: mabc2Results.viserAttraper ? `${mabc2Results.viserAttraper}`:"PAS DE RESULTATS",
          fill: getBgColorForPercentiles(mabc2Results?.viserAttraper ? +mabc2Results.viserAttraper : undefined ),
          cellWidth: 50,
          paddingVertical:20,
          superscript:true,
          alignment: "center",
        }
      ]),
      generateRow([
        {
          ...defaultCellStyle,
          text: "Équilibre",
          bold: true,
          cellWidth: 50,
          paddingVertical:20,
          alignment: "left",
        },
        {
          ...defaultCellStyle,
          text: mabc2Results.equilibre ? `${mabc2Results.equilibre}`:"PAS DE RESULTATS",
          fill: getBgColorForPercentiles(mabc2Results?.equilibre ? +mabc2Results.equilibre : undefined ),
          cellWidth: 50,
          paddingVertical:20,
          superscript:true,
          alignment: "center",
        }
      ]),
      generateRow([
        {
          ...defaultCellStyle,
          text: "Total",
          bold: true,
          cellWidth: 50,
          paddingVertical:20,
          alignment: "left",
        },
        {
          ...defaultCellStyle,
          text: mabc2Results.total ? `${mabc2Results.total}`:"PAS DE RESULTATS",
          fill: getBgColorForPercentiles(mabc2Results?.total ? +mabc2Results.total : undefined ),
          cellWidth: 50,
          paddingVertical:20,
          superscript:true,
          alignment: "center",
        }
      ]),
    ]
  })
}