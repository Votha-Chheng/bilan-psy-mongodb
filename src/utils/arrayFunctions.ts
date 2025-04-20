import { AnamneseDTO } from "@/@types/Anamnese"
import { BilanDTO } from "@/@types/BilanTests"
import { Anamnese, Bilan } from "@prisma/client"

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