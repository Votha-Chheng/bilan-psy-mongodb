import { EpreuveCubesNEPSY2ResultsDTO } from "@/@types/BilanTests";
import { Paragraph, Table, TextRun } from "docx";
import { TestTitle } from "../../ui/TestTitle";
import { allTests } from "@/datas/listeTests";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { TableCubesNepsy2Docx } from "../tablesDocx/TableCubesNepsy2Docx";
import { LineBreak } from "../../ui/LineBreak";
import { generateObservationsParagraphForBilan } from "../../ui/ParagraphFunctions";

export const CubesNepsy2Docx = (epreuveCubesNepsy2: EpreuveCubesNEPSY2ResultsDTO|null): (Paragraph|Table)[]=> {
  if(!epreuveCubesNepsy2) return [new Paragraph({text: "IL FAUT REMPLIR L'EPREUVE DES CUBES DE LA NEPSY 2 OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const {observations} = epreuveCubesNepsy2
  const rawBody = [
    TestTitle(allTests[11]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableCubesNepsy2Docx(epreuveCubesNepsy2),
    LineBreak(1),
    generateObservationsParagraphForBilan("Observations (épreuve des cubes de la Nepsy 2)", observations ?? null),
  ]
  return rawBody.filter(value=> value !== null)
}