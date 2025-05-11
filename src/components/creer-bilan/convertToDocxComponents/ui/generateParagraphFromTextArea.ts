import { Paragraph, TextRun } from "docx";
import { generateRawTextRun } from "./ParagraphFunctions";
import { defaultCellStyle, defaultTextStyle } from "@/@types/DocxTypes";

export function generateParagraphFromTextarea(text: string): Paragraph[] {
  const lines = text.split("\n");
  
  const runs: Paragraph[] = [];

  lines.forEach((line) => {
    const paragraph = new Paragraph({
      indent: {
        left: 150,
        firstLine: 350 
      },
      alignment: "both",
      children : [generateRawTextRun(line, defaultTextStyle)]
    })
    // Ajoute le texte de la ligne
    runs.push(paragraph);
  });

  return runs
}