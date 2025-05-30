import { AnamneseResults } from "@/@types/Anamnese";
import { anamneseKeysAndLabels } from "@/datas/anamneseConstantes";
import { isAnamneseResultsKey } from "./typeGuards";
import { elementsInArrayAllEpmty } from "./checkIfNullOrEmptyFunctions";


export const getAnamneseLabelsWithKey = (key: keyof AnamneseResults): string|null=> {
  const res = anamneseKeysAndLabels.filter(keyAndLabel => key === keyAndLabel.key)
  if(!res[0]) return null
  return anamneseKeysAndLabels.filter(keyAndLabel => key === keyAndLabel.key)[0].label
}

export const getChosenThemeArray = (anamneseResults: AnamneseResults|null): string[]=> {
  let selectedThemes: string[] = []
  if(anamneseResults){
    for(const key in anamneseResults){
      if(isAnamneseResultsKey(key) && anamneseResults[key] ){
        if(Array.isArray(anamneseResults[key]) && elementsInArrayAllEpmty(anamneseResults[key])){
          selectedThemes = selectedThemes
        } else {
          const label = getAnamneseLabelsWithKey(key)
          if(label){
            selectedThemes.push(label)
          }
        }
      } else {
        selectedThemes = selectedThemes
      }
    }
  }
  return selectedThemes
}
