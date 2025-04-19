import { RefObject } from "react";

export const setFocusOnInputRef = (lastEditTheme: string, refArray: RefObject<HTMLInputElement|null>[], themesArray: string[]): void=> {
  const lastEditThemeIndex = themesArray.findIndex(value => value === lastEditTheme)
  if(lastEditTheme === themesArray[lastEditThemeIndex]){
    refArray[lastEditThemeIndex]?.current?.focus()
  }
}