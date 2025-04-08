import { AnamneseResults } from "@/@types/Anamnese";
import { Anamnese } from "@prisma/client";


export const anamneseResultsKeys = ["id", "notesBrutes", "proposPapaOuMaman", "fratrie", "compositionFamiliale", "dossierMDPH", "maladiesEventuelles", "handicap", "autres"] as const

export const isKeyOf = <T extends object>(obj: T|null, key: unknown): key is keyof T => {
  return (
    obj !== null &&
    (typeof key === "string" || typeof key === "number" || typeof key === "symbol") && 
    key in obj
  );
}

export const isAnamneseResultsKey = (key: unknown): key is keyof AnamneseResults => {
  // On définit ici les clés valides de Person.
  const anamneseKeys: Array<keyof AnamneseResults> = ["id", "notesBrutes", "proposPapaOuMaman", "fratrie", "compositionFamiliale", "dossierMDPH", "maladiesEventuelles", "handicap", "autres"]
  return typeof key === 'string' && anamneseKeys.includes(key as keyof AnamneseResults);
}