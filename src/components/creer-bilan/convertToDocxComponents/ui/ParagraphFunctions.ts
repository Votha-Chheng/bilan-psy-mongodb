import { defaultTextStyle, ParagraphStyle, TextStyles } from "@/@types/DocxTypes"
import { Paragraph, TextRun } from "docx"

export const generateEmptyParagraph = (): Paragraph=> {
  return new Paragraph({
    text:""
  })
}

export const generateRawTextRun = (text: string, style: TextStyles = {}): TextRun=> {
  return new TextRun({
    text,
    ...style
  })
}

export const generateDefaultParagraph = (text: string, paragraphStyle: ParagraphStyle = {}, style: TextStyles = {}): Paragraph=> {
  return new Paragraph({
    ...paragraphStyle,
    children: [
      new TextRun({
        ...defaultTextStyle,
        ...style,
        text: text
      })
    ]
  })
}

export const generateTitleListe = (title: string): Paragraph=> {
  return (
    new Paragraph({
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
          text:`${title}` 
        }),
        new TextRun({
          ...defaultTextStyle,
          text:` : ` 
        }),
      ] 
    })
  )
}

export const generateSubtitleForBilan = (title: string, associatedData: string|null): Paragraph|null=> {
  if(!associatedData) return null
  return generateTitleListe(title)
}

export const generateObservationsParagraphForBilan = (title: string, observationList: string|null, leftIndent: number = 100): Paragraph |null=> {
  if(!observationList) return null

  return new Paragraph({
    indent: {
      left: leftIndent
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
        text:`${title}` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:` : ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text: observationList
      }),
    ] 
  })
}
