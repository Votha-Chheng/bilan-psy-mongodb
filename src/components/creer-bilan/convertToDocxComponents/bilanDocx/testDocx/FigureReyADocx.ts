import { FiguresReyAResultsDTO } from "@/@types/BilanTests"
import { Paragraph, Table, TextRun } from "docx"
import { TestTitle } from "../../ui/TestTitle"
import { defaultTextStyle } from "@/@types/DocxTypes"
import { allTests } from "@/datas/listeTests"
import { TableFigureReyADocx } from "../tablesDocx/TableFigureReyA"
import { LineBreak } from "../../ui/LineBreak"
import { generateObservationsParagraphForBilan } from "../../ui/ParagraphFunctions"

export const FigureReyADocx = (figureReyAResults: FiguresReyAResultsDTO|null): (Paragraph|Table)[]=> {
  if(!figureReyAResults) return [new Paragraph({text: "IL FAUT REMPLIR LE TEST DES FIGURES DE REY A OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const {observations} = figureReyAResults
  const rawBody = [
    TestTitle(allTests[9]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableFigureReyADocx(figureReyAResults),
    LineBreak(1),
    generateObservationsParagraphForBilan("Observations", observations ?? null),
  ]
  return rawBody.filter(value=> value !== null)
}