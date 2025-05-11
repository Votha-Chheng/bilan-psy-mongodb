import { Paragraph, TextRun } from "docx"

export const SeparationLine = (marginVertical: number = 6)=>{
  return (
    new Paragraph({
      spacing: {
        before: marginVertical * 20,
        after: marginVertical * 20
      },
      alignment: "center", // Centre la ligne horizontalement,
      children: [
        new TextRun({
          text: "___________________________",
        }),
      ],
    })
  )
}  
  