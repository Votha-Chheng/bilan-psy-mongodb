import { AnamneseResults, anamneseResultsKeys } from "@/@types/Anamnese";

export const isKeyOf = <T extends object>(obj: T|null, key: unknown): key is keyof T => {
  return (
    obj !== null &&
    (typeof key === "string" || typeof key === "number" || typeof key === "symbol") && 
    key in obj
  );
}

export const isAnamneseResultsKey = (key: unknown): key is keyof AnamneseResults => {
  // On définit ici les clés valides de Person.
  const anamneseKeys: Array<keyof AnamneseResults> = [...anamneseResultsKeys]
  return typeof key === 'string' && anamneseKeys.includes(key as keyof AnamneseResults);
}