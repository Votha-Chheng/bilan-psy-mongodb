import { BHKResultsDTO } from "@/@types/BilanTests";
import { Paragraph, Table, TextRun } from "docx";
import { TestTitle } from "../../ui/TestTitle";
import { allTests } from "@/datas/listeTests";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { TableBHKDocx } from "../tablesDocx/TableBhkDocx";
import { LineBreak } from "../../ui/LineBreak";
import { generateDefaultParagraph, generateObservationsParagraphForBilan } from "../../ui/ParagraphFunctions";

const OutilScripteurDocx = (bhkResults: BHKResultsDTO|null)=> {
  if(!bhkResults) return null
  const {tenueOutilScripteur, fonctionnalite, posturePoignet} = bhkResults
  return new Paragraph({
    indent: {
      left: 100
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
        text:`Outil scripteur` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:` : ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text: tenueOutilScripteur ? `La tenue de l'outil scripteur est ${tenueOutilScripteur[0]}, avec une tenue en ${tenueOutilScripteur[1]} de la main ${tenueOutilScripteur[2]}. ` : ""
      }),
      new TextRun({
        ...defaultTextStyle,
        text: fonctionnalite ? `${fonctionnalite === "mobilité des doigts adaptée" ? "La mobilité des doigts est adaptée. " :"Il y a une faible mobilité des doigts. "}`: ""
      }),
      new TextRun({
        ...defaultTextStyle,
        text: posturePoignet ? `La posture du poignet est ${posturePoignet}.`: ""
      }),
    ] 
  })
}

const MemorisationDocx = (memorisation: string|null): Paragraph|null=> {
  if(!memorisation) return null
  return new Paragraph({
    indent: {
      left: 100
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
        text:`Mémorisation` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:` : ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text: `${memorisation} mots avant de regarder le modèle.`
      }),
    ] 
  })
}

const RessentiDocx = (ressenti: string|null): Paragraph|null=> {
  if(!ressenti) return null
  return new Paragraph({
    indent: {
      left: 100
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
        text:`Le ressenti` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:` de l'enfant à propos de l'écriture est ${ressenti}.` 
      }),
    ] 
  })
}

const observationsBhkDocx = (bhkResults: BHKResultsDTO|null): Paragraph[]=> {
  const {lecture, memorisation, comportement, ecriture, ressenti, autres} = bhkResults ?? {}
  const rawBody = [
    generateObservationsParagraphForBilan("Lecture", lecture ?? null),
    OutilScripteurDocx(bhkResults),
    MemorisationDocx(memorisation ?? null),
    generateObservationsParagraphForBilan("Comportement", comportement ?? null),
    generateObservationsParagraphForBilan("Observations de l'écriture", ecriture ?? null),
    RessentiDocx(ressenti ?? null),
    generateObservationsParagraphForBilan("Autres remarques", autres ?? null),
    
  ]

  return rawBody.filter(val=> val !== null)
}

export const BhkDocx = (bhkResults: BHKResultsDTO|null) : (Paragraph|Table)[]=> {
  if(!bhkResults) return [new Paragraph({text: "IL FAUT REMPLIR LE TEST BHK OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const rawBody = [
    TestTitle(allTests[7]),
    new Paragraph({children: [new TextRun({...defaultTextStyle, bold: true, text: "Résultats :"})]}),
    TableBHKDocx(bhkResults),
    LineBreak(1),
    generateDefaultParagraph("Observations pertinentes résultant du test :", {spacing: {after: 75}}, {...defaultTextStyle, underline : {type: "single"}, bold: true}),
    ...observationsBhkDocx(bhkResults)
  ]
  return rawBody.filter(value => value !== null)
}