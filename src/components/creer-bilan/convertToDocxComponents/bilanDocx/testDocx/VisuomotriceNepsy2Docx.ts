import { VisuomotriceNEPSY2ResultsDTO } from "@/@types/BilanTests"
import { Paragraph, Table, TextRun } from "docx"
import { TestTitle } from "../../ui/TestTitle"
import { allTests } from "@/datas/listeTests"
import { defaultTextStyle } from "@/@types/DocxTypes"
import { TableVisuomotriceNepsy2Docx } from "../tablesDocx/TableVisuomotriceNepsy2Docx"
import { LineBreak } from "../../ui/LineBreak"
import { generateDefaultParagraph, generateObservationsParagraphForBilan } from "../../ui/ParagraphFunctions"

const observationsVisuomotriceNepsy2 = (visuomotriceNepsy2Results: VisuomotriceNEPSY2ResultsDTO|null): Paragraph[]=> {
  const {vitesse, tenueCrayon, comportement, tonus} = visuomotriceNepsy2Results ?? {}
  const rawBody = [
    generateObservationsParagraphForBilan("Vitesse", vitesse ?? null),
    generateObservationsParagraphForBilan("Tenue du crayon", tenueCrayon ?? null),
    generateObservationsParagraphForBilan("Comportement", comportement ?? null),
    generateObservationsParagraphForBilan("Tonus", tonus ?? null),
  ]

  return rawBody.filter(val=> val !== null)
}

export const VisuomotriceNepsy2Docx = (visuomotriceNepsy2Results: VisuomotriceNEPSY2ResultsDTO|null): (Paragraph|Table)[]=> {
  if(!visuomotriceNepsy2Results) return [new Paragraph({text: "IL FAUT REMPLIR L'EPREUVE VISUOMOTRICE DE LA NEPSY 2 OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const rawBody = [
    TestTitle(allTests[4]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableVisuomotriceNepsy2Docx(visuomotriceNepsy2Results),
    LineBreak(1),
    generateDefaultParagraph("Observations pertinentes résultant du test :", {spacing: {after: 75}}, {...defaultTextStyle, underline : {type: "single"}, bold: true}),
    ...observationsVisuomotriceNepsy2(visuomotriceNepsy2Results)
  ]
  return rawBody.filter(value => value !== null)
}