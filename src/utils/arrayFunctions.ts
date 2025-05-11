import { AnamneseDTO } from "@/@types/Anamnese"
import { BilanDTO, TestBilan } from "@/@types/BilanTests"
import { allTests } from "@/datas/listeTests"
import { orderedDomains } from "@/datas/orderedDomainsTests"
import { Anamnese, Bilan } from "@prisma/client"
import { Paragraph } from "docx"

export const returnArrayIfJson = <T>(json: string|null): T|null=> {
  return json ? JSON.parse(json) as T : null
}

export const returnParsedBilanResults = (bilan: Bilan): BilanDTO => {
  const {tests, ...rest} = bilan ?? {}

  return {
    tests: returnArrayIfJson(tests),
    ...rest
  }
}

export const returnParseAnamneseResult = (anamnese: Anamnese): AnamneseDTO => {
  const {
    ageMarche,
    acquisitionLangage,
    continence,
    accouchement,
    motriciteGlobale,
    motriciteFine,
    velo,
    sensorialite,
    apprentissages,
    outils,
    ecriture,
    cartableBureau,
    relationsPairs,
    comportement,
    attention,
    decritAuQuotidien,
    sommeilQuotidien,
    autonomie,
    gestionEmotions,
    gestionTemps,
    temperament,
    ...rest
  } = anamnese ?? {}

  return {
    ageMarche: returnArrayIfJson(ageMarche), 
    acquisitionLangage: returnArrayIfJson(acquisitionLangage), 
    continence: returnArrayIfJson(continence), 
    accouchement: returnArrayIfJson(accouchement),
    motriciteGlobale: returnArrayIfJson(motriciteGlobale),
    motriciteFine: returnArrayIfJson(motriciteFine),
    velo: returnArrayIfJson(velo),
    sensorialite: returnArrayIfJson(sensorialite),
    apprentissages: returnArrayIfJson(apprentissages),
    outils: returnArrayIfJson(outils),
    ecriture: returnArrayIfJson(ecriture),
    cartableBureau: returnArrayIfJson(cartableBureau),
    relationsPairs: returnArrayIfJson(relationsPairs),
    comportement: returnArrayIfJson(comportement),
    attention: returnArrayIfJson(attention),
    decritAuQuotidien: returnArrayIfJson(decritAuQuotidien),
    sommeilQuotidien: returnArrayIfJson(sommeilQuotidien),
    autonomie: returnArrayIfJson(autonomie),
    gestionEmotions: returnArrayIfJson(gestionEmotions),
    gestionTemps: returnArrayIfJson(gestionTemps),
    temperament: returnArrayIfJson(temperament),
    ...rest
  }
}

export const removeElementAtIndex = <T>(array: T[], indexToSkip: number): T[]=> {
  return array.filter((_el, index) => index !== indexToSkip);
}

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
