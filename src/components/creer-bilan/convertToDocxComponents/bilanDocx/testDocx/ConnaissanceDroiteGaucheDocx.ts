import { ConnaissancesDroiteGaucheResultsDTO } from "@/@types/BilanTests";
import { Paragraph, Table, TextRun } from "docx";
import { testByNames } from "@/datas/listeTests";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { generateRawTextRun } from "../../ui/ParagraphFunctions";

export const ConnaissanceDroiteGaucheDocx = (connaissancedroitegauche: ConnaissancesDroiteGaucheResultsDTO|null):(Paragraph|Table)[] => {
  if(!connaissancedroitegauche) return [new Paragraph({text: "IL FAUT REMPLIR LE TEST DE CONNAISSANCE DROITE/GAUCHE 2 OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const {surSoi, surAutruiACote, surAutruiReversibilite} = connaissancedroitegauche
    const rawBody = [
      new Paragraph({
        spacing: {
          before: 300,
        },
        alignment:"left",
        children: [
          generateRawTextRun("► "),
          generateRawTextRun(testByNames[0], {...defaultTextStyle, bold: true, italics: true}),
          new TextRun({
            ...defaultTextStyle,
            text:` : ` 
          }),
        ]
      }),
      new Paragraph({
        indent: {
          left: 200
        },
        spacing: {
          after:300
        },
        children: [
          new TextRun({
            ...defaultTextStyle,
            text:`• ` 
          }),
          new TextRun({
            ...defaultTextStyle,
            underline: {type: 'single'},
            text:`• Sur soi` 
          }),
          new TextRun({
            ...defaultTextStyle,
            text:` : ${surSoi} | ` 
          }),
          new TextRun({
            ...defaultTextStyle,
            text:`• ` 
          }),
          new TextRun({
            ...defaultTextStyle,
            underline: {type: 'single'},
            text:`Sur autrui à côté` 
          }),
          new TextRun({
            ...defaultTextStyle,
            text:` : ${surAutruiACote} | ` 
          }),
          new TextRun({
            ...defaultTextStyle,
            text:`• ` 
          }),
          new TextRun({
            ...defaultTextStyle,
            underline: {type: 'single'},
            text:`Sur autrui en réversibilité` 
          }),
          new TextRun({
            ...defaultTextStyle,
            text:` : ${surAutruiReversibilite}` 
          }),
        ]
      })
    ]
    return rawBody.filter(value => value !== null)
}