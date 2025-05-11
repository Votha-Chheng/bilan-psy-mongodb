import { defaultTextStyle } from "@/@types/DocxTypes";
import { Paragraph, TextRun } from "docx";
import { generateRawTextRun } from "../../ui/ParagraphFunctions";

export const LateraliteUsuelleDocx = (lateralite: string|null): Paragraph=> {
  if(!lateralite) return new Paragraph({text: "IL FAUT REMPLIR LE TEST LATERALITE USUELLE OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})
  return new Paragraph({
  spacing: {
    before: 300,
    after:300
  },
  alignment:"left",
  children: [
    generateRawTextRun("► "),
    generateRawTextRun("Latéralité usuelle", {...defaultTextStyle, bold: true, italics: true}),
    new TextRun({
      ...defaultTextStyle,
      text:` : ` 
    }),
    new TextRun({
      ...defaultTextStyle,
      text:`${lateralite}` 
    })
  ]
})
}