import { AnamneseResults, BilanMedicauxResults } from "@/@types/Anamnese"

export const seriesGenerales = (anamneseResults: AnamneseResults|null)=> {
  return [
    {label: "Fratrie", content: anamneseResults?.fratrie},
    {label: "Composition familiale", content: anamneseResults?.compositionFamiliale},
  ]
} 

export const seriesBilanMedicaux = (bilanMedicaux: BilanMedicauxResults): {label: string, content: string[]|null}[] => {
  return [
    {label: "Bilan ORL", content: bilanMedicaux?.bilanORL ?? null},
    {label: "Bilan ophtalmologique", content: bilanMedicaux?.bilanOphtalmo ?? null},
    {label: "Bilan orthophonique", content: bilanMedicaux?.bilanOrthophonique ?? null},
    {label: "Bilan orthoptique", content: bilanMedicaux?.bilanOrthoptique ?? null},
    {label: "Bilan neuropsychologique", content: bilanMedicaux?.bilanNeuropsy ?? null},
    {label: "Bilan neuropédiatrique", content: bilanMedicaux?.bilanNeuropediatre ?? null},
  ]
}

export const seriesAntecedentsBody = (anamneseResults: AnamneseResults|null): {label: string, content: string|null}[] => {
  if(!anamneseResults) return []
  return [
    {label: "Maladies éventuelles", content: anamneseResults?.maladiesEventuelles ?? null},
    {label: "Accompagnements et suivis", content: anamneseResults?.accompagnementSuivi ?? null},
    {label: "Handicap", content: anamneseResults?.handicap ?? null},
    {label: "Autres (antécédents)", content: anamneseResults?.autresAntecedents ?? null},
  ]
}

export const seriesDevPsyBody = (anamneseResults: AnamneseResults|null): {label: string, content:string[]|string|null}[] => {
  if(!anamneseResults) return []
  return [
    {label: "Grossesse", content: anamneseResults?.grossesse ?? null},
    {label: "Accouchement", content: anamneseResults?.accouchement ?? null},
    {label: "Age de la station assise", content: anamneseResults?.stationAssise ?? null},
    {label: "Quadrupédie", content: anamneseResults?.quadrupedie ?? null},
    {label: "Âge de la marche", content: anamneseResults?.ageMarche ?? null},
    {label: "Acquisition du langage", content: anamneseResults?.acquisitionLangage ?? null},
    {label: "Continence", content: anamneseResults?.continence ?? null},
    {label: "Alimentation", content: anamneseResults?.alimentation ?? null},
    {label: "Autres (développement psychomoteur)", content: anamneseResults?.autresDevPsy ?? null},
  ]
}