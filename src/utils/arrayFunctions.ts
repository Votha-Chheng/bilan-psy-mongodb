import { BilanDTO, BilanRaw } from "@/@types/BilanTests"
import { allTests } from "@/datas/listeTests"
import { orderedDomains } from "@/datas/orderedDomainsTests"

export const returnArrayIfJson = <T>(json: string|null): T|null=> {
  return json ? JSON.parse(json) as T : null
}

export const returnParsedBilanResults = (bilan: BilanRaw): BilanDTO => {
  const {tests, bhk, ...rest} = bilan ?? {}

  return {
    tests: returnArrayIfJson(tests),
    bhk: {
      ...bhk,
      tenueOutilScripteur: returnArrayIfJson<string[]>(bhk?.tenueOutilScripteur ?? null)
    },
    ...rest
  }
}

export const removeElementAtIndex = <T>(array: T[], indexToSkip: number): T[]=> {
  return array.filter((_el, index) => index !== indexToSkip);
}
// eslint-disable-next-line
export const arrayExists = (array: any[]|null|undefined): boolean => {
  return Array.isArray(array) && array.length > 0
}

export const returnSetOfDomains = (selectedTestsNames: string[]|null): string[]|null => {
  if(!selectedTestsNames) return null
  const selectedTestsBilans = allTests.filter(test => selectedTestsNames.includes(test.nom))
  const arrayOfDomains = selectedTestsBilans.map(test => test.domaine)
  const domains = Array.from(new Set(arrayOfDomains))

  return orderedDomains.filter(value=> domains.includes(value))
}
