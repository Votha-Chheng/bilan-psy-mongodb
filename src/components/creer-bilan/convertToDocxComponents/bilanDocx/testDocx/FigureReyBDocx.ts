import { FiguresReyBResultsDTO } from "@/@types/BilanTests";
import { Paragraph, Table, TextRun } from "docx";
import { TestTitle } from "../../ui/TestTitle";
import { allTests } from "@/datas/listeTests";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { TableFigureReyBDocx } from "../tablesDocx/TableFigureReyBDocx";
import { LineBreak } from "../../ui/LineBreak";
import { generateObservationsParagraphForBilan } from "../../ui/ParagraphFunctions";

export const FigureReyBDocx = (figureReyBResults: FiguresReyBResultsDTO|null): (Paragraph|Table)[] => {
  if(!figureReyBResults) return [new Paragraph({text: "IL FAUT REMPLIR LE TEST DES FIGURES DE REY B OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const {observationsFigureB} = figureReyBResults
  const rawBody = [
    TestTitle(allTests[10]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableFigureReyBDocx(figureReyBResults),
    LineBreak(1),
    generateObservationsParagraphForBilan("Observations (figure de Rey B)", observationsFigureB ?? null),
  ]
  return rawBody.filter(value=> value !== null)
}