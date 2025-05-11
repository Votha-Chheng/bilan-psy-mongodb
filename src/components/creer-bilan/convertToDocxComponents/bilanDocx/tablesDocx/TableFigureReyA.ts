import { FiguresReyAResultsDTO } from "@/@types/BilanTests";
import { defaultCellStyle } from "@/@types/DocxTypes";
import { getBgColorForDeviationStandard, getBgColorForPercentiles } from "@/utils/getColorCells";
import { Table } from "docx";
import { generateRow } from "../../docxUtils";

export const TableFigureReyADocx = (figureReyAResults: FiguresReyAResultsDTO): Table|null=> {
  if(!figureReyAResults) return null
  const {copieModeleDS, copieModeleDureePercentile, planificationModele, memoireDS, memoirePercentile, planificationMemoire} = figureReyAResults
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
            text: "Durée en percentile"
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
            text: figureReyAResults.copieModeleDureePercentile ?? "A REMPLIR",
            superscript: true,
            fill: getBgColorForPercentiles(+(copieModeleDureePercentile ?? 0) ),
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: planificationModele ? `Type ${planificationModele}` :"A REMPLIR",
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
            text: memoireDS ?? "A REMPLIR",
            fill: getBgColorForDeviationStandard(+(memoireDS ?? 0))
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            superscript: true,
            text: memoirePercentile ?? "A REMPLIR",
            fill: getBgColorForPercentiles(+(memoirePercentile ?? 0) ),
          },
          {
            ...defaultCellStyle,
            alignment: "center",
            text: planificationMemoire ? `Type ${planificationMemoire}` : "A REMPLIR",
            //fill: getBgColorForPercentiles(+(figureReyAResults.planificationPercentile ?? 0) ),
          },
        ]),
      ]
    })
  )
}