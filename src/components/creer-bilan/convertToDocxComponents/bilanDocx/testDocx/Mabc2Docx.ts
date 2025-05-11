import { MABC2ResultsDTO } from "@/@types/BilanTests"
import { allTests } from "@/datas/listeTests"
import { Paragraph, Table, TextRun } from "docx"
import { TestTitle } from "../../ui/TestTitle"
import { defaultTextStyle } from "@/@types/DocxTypes"
import { TableMabc2Docx } from "../tablesDocx/TableMabc2Docx"
import { LineBreak } from "../../ui/LineBreak"
import { generateDefaultParagraph, generateObservationsParagraphForBilan, generateSubtitleForBilan } from "../../ui/ParagraphFunctions"

const CompetencesMotrices = (mabc2Results: MABC2ResultsDTO|null): Paragraph|null =>{
  if(!mabc2Results) return null
  const {competencesMotrices} = mabc2Results
  if(!competencesMotrices) return null
  return  new Paragraph({
    indent: {
      left: 75
    },
    spacing: {
      after: 50
    },
    children: [
      new TextRun({
        ...defaultTextStyle,
        text:`▪ ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        underline: {type: "single"},
        text: "Les compétences motrices"
      }),
      new TextRun({
        ...defaultTextStyle,
        text: ` sont ${competencesMotrices}.` 
      }),
    ]
  })
}

const coordinationGlobaleRattrappees = (mabc2Results: MABC2ResultsDTO|null): Paragraph|null=> {
  if(!mabc2Results) return null
  const {coordinationsGlobalesRattrapes} = mabc2Results
  if(!coordinationsGlobalesRattrapes) return null
  return  new Paragraph({
    indent: {
      left: 200
    },
    spacing: {
      after: 50
    },
    children: [
      new TextRun({
        ...defaultTextStyle,
        italics: true,
        text: "– Rattrapées :"
      }),
      new TextRun({
        ...defaultTextStyle,
        text: ` ${coordinationsGlobalesRattrapes}` 
      }),
    ]
  })
}

const coordinationGlobaleLancers = (mabc2Results: MABC2ResultsDTO|null): Paragraph|null=> {
  if(!mabc2Results) return null
  const {coordinationsGlobalesLancers} = mabc2Results
  if(!coordinationsGlobalesLancers) return null
  return  new Paragraph({
    indent: {
      left: 200
    },
    spacing: {
      after: 50
    },
    children: [
      new TextRun({
        ...defaultTextStyle,
        italics: true,
        text: "– Lancers :"
      }),
      new TextRun({
        ...defaultTextStyle,
        text: ` ${coordinationsGlobalesLancers}` 
      })
    ]
  })
}

const motriciteGlobaleUnipodalDocx = (mabc2Results: MABC2ResultsDTO|null): Paragraph|null=> {
  if(!mabc2Results) return null
  const {motriciteGlobaleUnipodal} = mabc2Results
  if(!motriciteGlobaleUnipodal) return null
  return  new Paragraph({
    indent: {
      left: 200
    },
    spacing: {
      after: 50
    },
    children: [
      new TextRun({
        ...defaultTextStyle,
        italics: true,
        text: "– Équilibre unipodal :"
      }),
      new TextRun({
        ...defaultTextStyle,
        text: ` ${motriciteGlobaleUnipodal}` 
      })
    ]
  })
}

const motriciteGlobaleDynamiqueDocx = (mabc2Results: MABC2ResultsDTO|null): Paragraph|null=> {
  if(!mabc2Results) return null
  const {motriciteGlobaleDynamique} = mabc2Results
  if(!motriciteGlobaleDynamique) return null
  return  new Paragraph({
    indent: {
      left: 200
    },
    spacing: {
      after: 50
    },
    children: [
      new TextRun({
        ...defaultTextStyle,
        italics: true,
        text: "– Équilibre dynamique :"
      }),
      new TextRun({
        ...defaultTextStyle,
        text: ` ${motriciteGlobaleDynamique}` 
      })
    ]
  })
}

const motriciteGlobaleSautsDocx = (mabc2Results: MABC2ResultsDTO|null): Paragraph|null=> {
  if(!mabc2Results) return null
  const {motriciteGlobaleSauts} = mabc2Results
  if(!motriciteGlobaleSauts) return null
  return  new Paragraph({
    indent: {
      left: 200
    },
    spacing: {
      after: 50
    },
    children: [
      new TextRun({
        ...defaultTextStyle,
        italics: true,
        text: "– Sauts :"
      }),
      new TextRun({
        ...defaultTextStyle,
        text: ` ${motriciteGlobaleSauts}` 
      })
    ]
  })
}

const observationsMabc2 = (mabc2Results: MABC2ResultsDTO|null): Paragraph[]=> {
  const {precisionUnimanuelle, coordinationsBimanuelles, precisionVisuoMotrice, coordinationsGlobalesRattrapes, coordinationsGlobalesLancers, motriciteGlobaleUnipodal, motriciteGlobaleDynamique, motriciteGlobaleSauts, observationsComplementaires} = mabc2Results ?? {}
  const rawBody = [
    CompetencesMotrices(mabc2Results),
    generateObservationsParagraphForBilan("Précision unimanuelle", precisionUnimanuelle ?? null),
    generateObservationsParagraphForBilan("Coordinations bimanuelles", coordinationsBimanuelles ?? null),
    generateObservationsParagraphForBilan("Précision visuomotrice", precisionVisuoMotrice ?? null),
    generateSubtitleForBilan("Coordinations globales", ((coordinationsGlobalesRattrapes ?? null) && (coordinationsGlobalesLancers ?? null))),
    coordinationGlobaleRattrappees(mabc2Results),
    coordinationGlobaleLancers(mabc2Results),
    generateSubtitleForBilan("Motricité globale", ((motriciteGlobaleUnipodal ?? null) && (motriciteGlobaleSauts ?? null) && (motriciteGlobaleDynamique ?? null))),
    motriciteGlobaleUnipodalDocx(mabc2Results),
    motriciteGlobaleDynamiqueDocx(mabc2Results),
    motriciteGlobaleSautsDocx(mabc2Results),
    generateObservationsParagraphForBilan("Observations complémentaires", observationsComplementaires ?? null),

  ]

  return rawBody.filter(val=> val !== null)
}

export const Mabc2Docx = (mabc2Results: MABC2ResultsDTO|null): (Paragraph|Table)[]=> {
  if(!mabc2Results) return [new Paragraph({text: "IL FAUT REMPLIR LE TEST M-ABC2 OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const rawBody = [
    TestTitle(allTests[3]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableMabc2Docx(mabc2Results),
    LineBreak(1),
    generateDefaultParagraph("Observations pertinentes résultant du test :", {spacing: {after: 75}}, {...defaultTextStyle, underline : {type: "single"}, bold: true}),
    ...observationsMabc2(mabc2Results)
  ]
  return rawBody.filter(value=> value !== null)
}