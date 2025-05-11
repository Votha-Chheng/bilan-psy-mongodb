import { BHKResultsDTO } from "@/@types/BilanTests"
import { Table } from "docx"
import { generateRow } from "../../docxUtils"
import { defaultCellStyle } from "@/@types/DocxTypes"
import { getBgColorForDeviationStandard } from "@/utils/getColorCells"

export const TableBHKDocx = (bhkResults: BHKResultsDTO|null)=> {
  if(!bhkResults) return null
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
           text: "Score en déviation standard",
           cellWidth: 50,
           paddingVertical:20,
           bold:true,
           alignment: "center",
         }
       ]),
       generateRow([
         {
           ...defaultCellStyle,
           text: "Qualité d’écriture",
           bold: true,
           cellWidth: 50,
           paddingVertical:20,
           alignment: "left",
         },
         {
           ...defaultCellStyle,
           text: bhkResults.qualiteEcriture ? `${bhkResults.qualiteEcriture}`:"PAS DE RESULTATS",
           fill: getBgColorForDeviationStandard(bhkResults?.qualiteEcriture ? +bhkResults.qualiteEcriture : undefined ).substring(0),
           cellWidth: 50,
           paddingVertical:20,
           alignment: "center",
         }
       ]),
       generateRow([
         {
           ...defaultCellStyle,
           text: "Vitesse d’écriture",
           bold: true,
           cellWidth: 50,
           paddingVertical:20,
           alignment: "left",
         },
         {
           ...defaultCellStyle,
           text: bhkResults.vitesseEcriture ? `${bhkResults.vitesseEcriture}`:"PAS DE RESULTATS",
           fill: getBgColorForDeviationStandard(bhkResults?.vitesseEcriture ? +bhkResults.vitesseEcriture : undefined ),
           cellWidth: 50,
           paddingVertical:20,
           alignment: "center",
         }
       ]),
     ]
   })
 }