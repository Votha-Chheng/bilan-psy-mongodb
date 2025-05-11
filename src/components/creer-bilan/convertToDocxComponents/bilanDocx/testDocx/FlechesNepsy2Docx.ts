import { FlechesNEPSY2ResultsDTO } from "@/@types/BilanTests";
import { Paragraph, Table, TextRun } from "docx";
import { TestTitle } from "../../ui/TestTitle";
import { allTests } from "@/datas/listeTests";
import { TableFlechesNepsy2Docx } from "../tablesDocx/TableFlechesNepsy2Docx";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { LineBreak } from "../../ui/LineBreak";
import { generateObservationsParagraphForBilan } from "../../ui/ParagraphFunctions";

export const FlechesNepsy2Docx = (flechesNepsy2Results: FlechesNEPSY2ResultsDTO|null): (Paragraph|Table)[]=> {
  if(!flechesNepsy2Results) return [new Paragraph({text: "IL FAUT REMPLIR L'EPREUVE DES FLECHES DE LA NEPSY 2 OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const {observations} = flechesNepsy2Results
  const rawBody = [
    TestTitle(allTests[8]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableFlechesNepsy2Docx(flechesNepsy2Results),
    LineBreak(1),
    generateObservationsParagraphForBilan("Observations", observations ?? null),
  ]
  return rawBody.filter(value => value !== null)
}