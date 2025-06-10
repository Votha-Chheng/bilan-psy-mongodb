import { TestsNames } from "@/@types/TestTypes"

export type ObservationTest = {
  id : string|null 
  testNameAndThemeId: string|null 
  testName : string|null 
  theme: string|null 
  listeObservations: string|null 
}

export type ObservationDTO = {
  testNameAndThemeId: string|null 
  id: string|null
  testName: TestsNames|null
  theme:string|null
  listeObservations: string[]|null 
}

export type ObservationResponseJSON = {
  id: string
  testNameAndThemeId: string|null 
  theme: string
  testName: TestsNames
  listeObservations: string|null
}
