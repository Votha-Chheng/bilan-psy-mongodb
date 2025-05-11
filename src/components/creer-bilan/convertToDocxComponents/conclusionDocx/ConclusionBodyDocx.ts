import { ConclusionDTO } from "@/@types/ConclusionTypes";
import { Paragraph, TextRun } from "docx";
import { generateEmptyParagraph, generateRawTextRun } from "../ui/ParagraphFunctions";
import { ConclusionSubtitle } from "./ConclusionSubtitle";
import { generateParagraphFromTextarea } from "../ui/generateParagraphFromTextArea";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { LineBreak } from "../ui/LineBreak";

const RecommandationsDocx = (profilPsy: string[]|null): Paragraph[]=> {
  if(!profilPsy) return [generateEmptyParagraph()]
  const start =  new Paragraph({
    indent: {
      left: 150,
    },
    spacing: {
      before: 150
    },
    alignment: "left",
    children : [generateRawTextRun("Je recommande :", defaultTextStyle)]
  })

  const paragraphs = profilPsy.map(profil => (
    new Paragraph({
      indent: {
        left: 500,
      },
      alignment: "left",
      children : [new TextRun({...defaultTextStyle, text: "– "}), generateRawTextRun(profil, defaultTextStyle)]
    })
  
  ))
  return [start, ...paragraphs]
}

const Propositions = (projetPsy: string[]|null): Paragraph[]=> {
  if(!projetPsy) return [generateEmptyParagraph()]
  const start =  new Paragraph({
    indent: {
      left: 150,
    },
    spacing: {
      before: 150,
      after: 50
    },
    alignment: "left",
    children : [
      generateRawTextRun("► ", defaultTextStyle), 
      generateRawTextRun("Des séances de psychomotricité sont préconisées ", {...defaultTextStyle, bold: true}),
      generateRawTextRun("(réévaluables en fonction de l'évolution du suivi), pour travailler :", defaultTextStyle), 
    ]
  })
  const paragraphs = projetPsy.map(projet => (
    new Paragraph({
      indent: {
        left: 500,
      },
      alignment: "left",
      children : [new TextRun({...defaultTextStyle, text: "– "}), generateRawTextRun(projet, defaultTextStyle)]
    })
  ))
  const end =  new Paragraph({
    indent: {
      left: 150,
    },
    spacing: {
      before: 150
    },
    alignment: "left",
    children : [
      generateRawTextRun("► ", defaultTextStyle), 
      generateRawTextRun("Par ailleurs, des aménagements sont proposés pour l'école et la maison ", defaultTextStyle), 
      generateRawTextRun("(cf. annexe au bilan psychomoteur ci-joint).", {...defaultTextStyle, bold: true, italics: true}),
    ]
  })
  return [start, ...paragraphs, end]
}

const ConclusionParagraph = (conclusionCommentaire: string|null): Paragraph[]=> {
  if(!conclusionCommentaire) return [generateEmptyParagraph()]

  return generateParagraphFromTextarea(conclusionCommentaire)
}

export const ConclusionBodyDocx = (conclusion: ConclusionDTO|null): Paragraph[]=> {
  if(!conclusion) return [generateEmptyParagraph()]
  const {conclusionCommentaires, profilPsy, projetPsy} = conclusion
  const rawBody = [
    ConclusionSubtitle("Profil psychomoteur"),
    ...ConclusionParagraph(conclusionCommentaires ?? null),
    ...RecommandationsDocx(profilPsy ?? null),
    LineBreak(),
    ConclusionSubtitle("Projet psychomoteur"),
    ...Propositions(projetPsy ?? null)
  ]
  return rawBody.filter(value => value !== null )
}