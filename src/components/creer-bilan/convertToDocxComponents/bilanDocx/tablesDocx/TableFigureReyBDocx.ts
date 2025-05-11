import { FiguresReyBResultsDTO } from "@/@types/BilanTests";
import { defaultCellStyle } from "@/@types/DocxTypes";
import { Table } from "docx";
import { generateRow } from "../../docxUtils";
import { getBgColorForDeviationStandard } from "@/utils/getColorCells";

export const TableFigureReyBDocx = (figureReyBResults: FiguresReyBResultsDTO|null): Table|null=> {
  if(!figureReyBResults) return null
  const {copieModeleDS, copieModeleDureeDS, copiePlanification, memoireModeleDS, memoireModeleDureeDS, memoirePlanification} = figureReyBResults
  return (
    new Table({
      width: {
        size: 75,
        type: "pct"
      },
      rows: [
        generateRow([
          {
            text:""
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: "Score en DS"
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: "Durée en déviation standard"
          },
          {
            ...defaultCellStyle,
            bold: true,
            text:"Planification"
          },
        ]),
        generateRow([
          {
            ...defaultCellStyle,
            bold: true,
            text:"En copie avec modèle"
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: copieModeleDS ?? "A REMPLIR",
            fill: getBgColorForDeviationStandard(+(copieModeleDS ?? 0))
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: copieModeleDureeDS ?? "A REMPLIR",
            superscript: true,
            fill: getBgColorForDeviationStandard(+(copieModeleDureeDS ?? 0) ),
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: copiePlanification ? `Type ${copiePlanification}` :"A REMPLIR",
            //fill: getBgColorForDeviationStandard(+(figureReyAResults.planificationDS ?? 0))
          },
        ]),
        generateRow([
          {
            ...defaultCellStyle,
            bold: true,
            text:"De mémoire"
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: memoireModeleDS ?? "A REMPLIR",
            fill: getBgColorForDeviationStandard(+(memoireModeleDS ?? 0))
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            superscript: true,
            text: memoireModeleDureeDS ?? "A REMPLIR",
            fill: getBgColorForDeviationStandard(+(memoireModeleDureeDS ?? 0) ),
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: memoirePlanification ? `Type ${memoirePlanification}` : "A REMPLIR",
            //fill: getBgColorForPercentiles(+(figureReyAResults.planificationPercentile ?? 0) ),
          },
        ]),
      ]
    })
  )
}