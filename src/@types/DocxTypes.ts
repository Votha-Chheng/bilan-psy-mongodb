export type CellStyleAndContent = {
  bold?: boolean
  italics?: boolean,
  color?:string
  fill?: string
  text?: string
  size?: number,
  paddingVertical?: number,
  cellWidth?: number,
  font?: string
  superscript?: boolean
  alignment?:"start" | "center" | "end" | "both" | "mediumKashida" | "distribute" | "numTab" | "highKashida" | "lowKashida" | "thaiDistribute" | "left" | "right" | undefined
}

export type TextStyles = {
  bold?: boolean,
  italics?: boolean,
  color?: string;
  font?: string;
  size?:number;
  underline?: {
    type?: "single"
  }
  // Ajoutez d'autres styles si nécessaire (underline, color, etc.)
}

export type ParagraphStyle = {
  alignment?: "start" | "center" | "end" | "both" | "mediumKashida" | "distribute" | "numTab" | "highKashida" | "lowKashida" | "thaiDistribute" | "left" | "right" | undefined
  spacing?: {
    before ?: number,
    after?: number
  },
  indent?: {
    left?: number,
    firstLine?: number
  }
}

export const defaultTextStyle: TextStyles = {
  bold: false,
  italics: false,
  color: "#000000",
  font: "Calibri",
  size:24
}

export const defaultCellStyle: CellStyleAndContent = {
  bold: false,
  italics: false,
  color: "#000000",
  font: "Calibri",
  size:22,
}