import { ImitationPositionsNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { Paragraph, Table, TextRun } from "docx"
import { TestTitle } from "../../ui/TestTitle"
import { allTests } from "@/datas/listeTests"
import { defaultTextStyle } from "@/@types/DocxTypes"
import { TableImitationNepsy2Docx } from "../tablesDocx/TableImitationNepsy2Docx"
import { LineBreak } from "../../ui/LineBreak"
import { generateDefaultParagraph, generateObservationsParagraphForBilan } from "../../ui/ParagraphFunctions"

export const ImitationNepsy2Docx = (imitationNepsy2Results: ImitationPositionsNEPSY2ResultsDTO|null): (Paragraph|Table)[]=> {
  if(!imitationNepsy2Results) return [new Paragraph({text: "IL FAUT REMPLIR LE TEST Imitation de positions de la Nepsy 2 OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const {observationsDiverses} = imitationNepsy2Results
  const rawBody = [
    TestTitle(allTests[5]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableImitationNepsy2Docx(imitationNepsy2Results),
    LineBreak(1),
    generateDefaultParagraph("Observations pertinentes résultant du test :", {spacing: {after: 75}}, {...defaultTextStyle, underline : {type: "single"}, bold: true}),
    generateObservationsParagraphForBilan("Observations diverses", observationsDiverses ?? null),
  ]
  return rawBody.filter(value=> value !== null)
}