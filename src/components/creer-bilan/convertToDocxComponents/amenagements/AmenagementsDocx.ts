import { AmenagementItemDTO, AmenagementsGlobal } from "@/@types/AmenagementsTypes";
import { generateDefaultParagraph, generateEmptyParagraph } from "../ui/ParagraphFunctions";
import { defaultTextStyle } from "@/@types/DocxTypes";
import { Paragraph, TextRun } from "docx";
import { LineBreak } from "../ui/LineBreak";
import { checkIfCategoryIsInAmenagementForPatient } from "@/utils/filterFunctions";

const generateItemList = (text: string): Paragraph=> {
  return new Paragraph({
    indent: {
      left: 200
    },
    spacing: {
      before: 50,
      after: 50
    },
    children: [
      new TextRun({
        text: "► "
      }),
      new TextRun({
        ...defaultTextStyle,
        text
      })
    ]
  })
}

const IntroAmenagements = generateDefaultParagraph("La liste d’aménagements ci-dessous est proposée à l’équipe pédagogique qui, avec les observations faites en classe, pourra mettre en application les idées lui semblant les plus pertinentes afin d’aider l’élève au mieux.", {alignment: "both"}, defaultTextStyle)

const ParagraphsList = (amenagementsItems: AmenagementItemDTO[]|null, categoriesList: string[]|null): Paragraph[]=> {
  if(!amenagementsItems) return [generateEmptyParagraph()]
  if(!categoriesList) return [generateEmptyParagraph()]
  let paragraphs: Paragraph[] = []

  for(let i=0; i<categoriesList.length-1; i++){
    if(checkIfCategoryIsInAmenagementForPatient(amenagementsItems, categoriesList[i])){
      const titleCategory = generateDefaultParagraph(categoriesList[i], {alignment: "center", spacing: {after: 100}}, {bold: true})
      const listeAmenagements = amenagementsItems.filter(amenagementItem => amenagementItem.category === categoriesList[i])
      const amenagementsParagraph = listeAmenagements.map(amenagementsItem=> (
        generateItemList(amenagementsItem.amenagement ?? '')
      ))
      paragraphs = [...paragraphs, titleCategory, ...amenagementsParagraph,  LineBreak()]

    }
  }
  return paragraphs
}

export const AmenagementsDocx = (amenagements: AmenagementsGlobal|null): Paragraph[]=> {
  if(!amenagements) return [generateEmptyParagraph()]
  const {listAmenagementsItems, categoriesList} = amenagements
  const rawBody = [
    IntroAmenagements,
    LineBreak(),
    ...ParagraphsList(listAmenagementsItems, categoriesList)
  ]
  return rawBody.filter(value => value !== null )
}