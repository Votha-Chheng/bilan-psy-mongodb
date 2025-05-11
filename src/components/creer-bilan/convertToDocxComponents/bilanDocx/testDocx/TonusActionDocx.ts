import { Paragraph, TextRun } from "docx"
import { generateRawTextRun } from "../../ui/ParagraphFunctions"
import { defaultTextStyle } from "@/@types/DocxTypes"

export const TonusActionDocx = (tonus: string|null): Paragraph=> {
  if(!tonus) return new Paragraph({text: "IL FAUT REMPLIR LE TEST TONUS D'ACTION OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})
  return new Paragraph({
    spacing: {
      before: 300,
      after:300
    },
    alignment:"left",
    children: [
      generateRawTextRun("► "),
      generateRawTextRun("Tonus d'action", {...defaultTextStyle, bold: true, italics: true}),
      new TextRun({
        ...defaultTextStyle,
        text:` : ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:`${tonus}` 
      })
    ]
  })
}