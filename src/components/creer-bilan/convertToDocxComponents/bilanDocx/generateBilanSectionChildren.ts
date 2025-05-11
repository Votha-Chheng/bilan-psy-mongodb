import { BilanDTO } from "@/@types/BilanTests"
import { testByNames } from "@/datas/listeTests"
import { Paragraph, Table } from "docx"
import { LineBreak } from "../ui/LineBreak"
import { GreyBgTitle } from "../ui/GreyBigTitle"
import { Mabc2Docx } from "./testDocx/Mabc2Docx"
import { SeparationLine } from "../ui/SeparationLine"
import { VisuomotriceNepsy2Docx } from "./testDocx/VisuomotriceNepsy2Docx"
import { BhkDocx } from "./testDocx/BhkDocx"
import { ImitationNepsy2Docx } from "./testDocx/ImitationNepsy2Docx"
import { PraxiesGestuellesDocx } from "./testDocx/PraxiesGestuellesDocx"
import { LateraliteUsuelleDocx } from "./testDocx/LateraliteUsuelleDocx"
import { TonusActionDocx } from "./testDocx/TonusActionDocx"
import { FlechesNepsy2Docx } from "./testDocx/FlechesNepsy2Docx"
import { ConnaissanceDroiteGaucheDocx } from "./testDocx/ConnaissanceDroiteGaucheDocx"
import { FigureReyADocx } from "./testDocx/FigureReyADocx"
import { FigureReyBDocx } from "./testDocx/FigureReyBDocx"
import { CubesNepsy2Docx } from "./testDocx/CubesNepsy2Docx"


export const bilanSectionChildren = (bilanResults: BilanDTO|null): (Paragraph | Table)[]=> {
  const {mabc2, tests, visuomotricenepsy2, bhk, imitationpositionsnepsy2, praxiesgestuelles, lateralite, tonus, connaissancedroitegauche, flechesnepsy2, figuresreya, figuresreyb, epreuvecubesnepsy2} = bilanResults ?? {}
  let children: (Paragraph | Table)[] = []

  if(!bilanResults) return children

  if(((tests?.includes(testByNames[3])) || (tests?.includes(testByNames[4])))){
    children = [...children, LineBreak(1), GreyBgTitle("MOTRICITÉ", 24, true)]
  }

  if(tests?.includes(testByNames[3])){
    children = 
    [
      ...children, 
      ...Mabc2Docx(mabc2 ?? null),
      SeparationLine(),
    ]
  }

  if(tests?.includes(testByNames[4])){
    children = 
    [
      ...children,
      ...VisuomotriceNepsy2Docx(visuomotricenepsy2 ?? null),
    ]
  }

  if((tests?.includes(testByNames[7]))){
    children = [
      ...children, 
      LineBreak(1), 
      GreyBgTitle("GRAPHISME", 24, true),
      ...BhkDocx(bhk ?? null)
    ]
  }

  if(tests?.includes(testByNames[5]) || tests?.includes(testByNames[6])){
    children = [...children, LineBreak(1), GreyBgTitle("SCHÉMA CORPOREL ET PRAXIES", 24, true)]
  }

  if((tests?.includes(testByNames[5]))){
    children = [
      ...children, 
      ...ImitationNepsy2Docx(imitationpositionsnepsy2 ?? null),
      SeparationLine()
    ]
  }

  if((tests?.includes(testByNames[6]))){
    children = [
      ...children, 
      ...PraxiesGestuellesDocx(praxiesgestuelles ?? null)
    ]
  }

  if(tests?.includes(testByNames[1]) || tests?.includes(testByNames[2])){
    children = [
      ...children, 
      LineBreak(1), 
      GreyBgTitle("LATÉRALITÉ ET TONUS", 24, true),   
    ]
  }

  if(tests?.includes(testByNames[1])){
    children = [...children, LateraliteUsuelleDocx(lateralite ?? null)]
  }

  if(tests?.includes(testByNames[2])){
    children = [...children, TonusActionDocx(tonus ?? null)]
  }

  if(tests?.includes(testByNames[0]) || tests?.includes(testByNames[8]) || tests?.includes(testByNames[9]) || tests?.includes(testByNames[10]) || tests?.includes(testByNames[11])){
    children = [...children, LineBreak(1), GreyBgTitle("STRUCTURATION SPATIALE ET TEMPORELLE", 24, true)]
  }

    if(tests?.includes(testByNames[0])){
      children = [
        ...children,
        ...ConnaissanceDroiteGaucheDocx(connaissancedroitegauche?? null)
      ]
    }
    
  if(tests?.includes(testByNames[8])){
    children = [
      ...children,
      SeparationLine(),
      ...FlechesNepsy2Docx(flechesnepsy2 ?? null)
    ]
  }

  if(tests?.includes(testByNames[9])){
    children = [
      ...children,
      SeparationLine(),
      ...FigureReyADocx(figuresreya ?? null)
    ]
  }
  if(tests?.includes(testByNames[10])){
    children = [
      ...children,
      SeparationLine(),
      ...FigureReyBDocx(figuresreyb ?? null)
    ]
  }

  if(tests?.includes(testByNames[11])){
    children = [
      ...children,
      SeparationLine(),
      ...CubesNepsy2Docx(epreuvecubesnepsy2 ?? null)
    ]
  }
  return children
}