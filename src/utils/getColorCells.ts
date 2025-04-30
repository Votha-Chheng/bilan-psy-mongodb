//import { blue, green, red, yellow } from "./docxComponents/tables/fillColors"

import { blue, green, red, yellow } from "@/datas/fillColors"

export const getBgColorForTableTests = (variable: number|undefined): string => {
  if(!variable) return ""
  if(variable<=15)return "#fc7388"
  if(variable>15 && variable<=25) return "#eae55d"
  if(variable>25 && variable<=75) return "#88bf90"
  return "#8aade5"
}
  

export const getBgColorForNoteStandard = (variable: number|undefined): string => {
  if(!variable) return ""
  if(variable<=4)return "#fc7388"
  if(variable>4 && variable<=7) return "#eae55d"
  if(variable>6 && variable<=12) return "#88bf90"
  return "#8aade5"

}

export const getBgColorForDeviationStandard = (variable: number|undefined): string => {
  if(!variable) return "#ffffff"
  if(variable<=-2)return "#fc7388"
  if(variable>-2 && variable<=-1) return "#eae55d"
  if(variable>-1 && variable<=1) return "#88bf90"
  return "#8aade5"

}

export const getBgColorForPercentiles = (variable: number|undefined|null): string => {
  if(!variable) return "ffffff"
  if(variable<=15) return red
  if(variable>15 && variable<=25) return yellow
  if(variable>25 && variable<=75) return green
  return blue

}