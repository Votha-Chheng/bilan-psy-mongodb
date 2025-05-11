import { PraxiesGestuellesResultsDTO } from "@/@types/BilanTests";
import { Paragraph, Table, TextRun } from "docx";
import { TestTitle } from "../../ui/TestTitle";
import { allTests } from "@/datas/listeTests";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { LineBreak } from "../../ui/LineBreak";

const subtitlePraxies = (subtitle: string, data: any): Paragraph|null=> {
  if(!data) return null

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
        text:`${subtitle}` 
      }),
    ] 
  })
}

const PrecisionDocx = (key: keyof PraxiesGestuellesResultsDTO, praxiesGestuellesResults: PraxiesGestuellesResultsDTO|null): Paragraph|null=> {
  if(!praxiesGestuellesResults) return null
  if(!praxiesGestuellesResults?.[key]) return null
  return new Paragraph({
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
        text:`– Précision du geste ${key === "precisionDecoupage" ? "en découpage": key === "precisionCompas" ? "avec un compas" : "avec une équerre"} : ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:`${praxiesGestuellesResults?.[key]}` 
      }),
    ] 
  })
}

const TenueDocx = (key: keyof PraxiesGestuellesResultsDTO, praxiesGestuellesResults: PraxiesGestuellesResultsDTO|null): Paragraph|null=> {
  if(!praxiesGestuellesResults) return null
  if(!praxiesGestuellesResults?.[key]) return null
  return new Paragraph({
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
        text:`– Tenue ${key === "tenueDecoupage" ? "des ciseaux": key === "tenueCompas" ? "du compas" : "de l'équerre"} : ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:`${praxiesGestuellesResults?.[key]}` 
      }),
    ] 
  })
}

const GestionTonusDocx = (key:"gestionTonusEquerre"|"gestionTonusCompas"|"gestionTonusDecoupage", keyHypHyper: "hyperHypoDecoupage"|"hyperHypoCompas"|"hyperHypoEquerre", praxiesGestuellesResults: PraxiesGestuellesResultsDTO|null): Paragraph|null=> {
  if(!praxiesGestuellesResults) return null
  if(!praxiesGestuellesResults?.[key]) return null
  return new Paragraph({
    indent: {
      left: 200
    },
    spacing: {
      after: 150
    },
    children: [
      new TextRun({
        ...defaultTextStyle,
        italics: true,
        text:`– Gestion du tonus : ` 
      }),
      new TextRun({
        ...defaultTextStyle,
        text:`${praxiesGestuellesResults?.[key]} ${praxiesGestuellesResults?.[keyHypHyper] ? `avec ${praxiesGestuellesResults?.[keyHypHyper]}`:""}` 
      }),
    ] 
  })
}

export const PraxiesGestuellesDocx = (praxiesGestuelles: PraxiesGestuellesResultsDTO|null): (Paragraph|Table)[]=> {
  if(!praxiesGestuelles) return [new Paragraph({text: "IL FAUT REMPLIR LE TEST PRAXIES GESTUELLES OU L'ENLEVER DE LA LISTE DES TESTS UTILISES !"})]
  const {precisionDecoupage, tenueDecoupage, gestionTonusDecoupage, hyperHypoDecoupage, precisionCompas, tenueCompas, gestionTonusCompas, hyperHypoCompas, precisionEquerre, tenueEquerre, gestionTonusEquerre, hyperHypoEquerre} = praxiesGestuelles
    const rawBody = [
      TestTitle(allTests[6], 0, 50),
      subtitlePraxies("Découpage", (precisionDecoupage && tenueDecoupage && gestionTonusDecoupage && hyperHypoDecoupage)),
      PrecisionDocx("precisionDecoupage", praxiesGestuelles),
      TenueDocx("tenueDecoupage", praxiesGestuelles),
      GestionTonusDocx("gestionTonusDecoupage", "hyperHypoDecoupage", praxiesGestuelles),
      subtitlePraxies("Utilisation du compas", (precisionCompas && tenueCompas && gestionTonusCompas && hyperHypoCompas)),
      PrecisionDocx("precisionCompas", praxiesGestuelles),
      TenueDocx("tenueCompas", praxiesGestuelles),
      GestionTonusDocx("gestionTonusCompas", "hyperHypoCompas", praxiesGestuelles),
      subtitlePraxies("Précision du geste avec une équerre", (precisionEquerre && tenueEquerre && gestionTonusEquerre && hyperHypoEquerre)),
      PrecisionDocx("precisionEquerre", praxiesGestuelles),
      TenueDocx("tenueEquerre", praxiesGestuelles),
      GestionTonusDocx("gestionTonusEquerre", "hyperHypoEquerre", praxiesGestuelles),
    ]
    return rawBody.filter(value => value !== null)
}