import { TestsNames } from "@/@types/TestTypes"

export type ObservationDTO = {
  id: string|null
  test: TestsNames|null
  theme:string
  listeObservations: string[]|null 
}