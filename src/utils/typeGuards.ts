import { AnamneseResults, anamneseResultsKeys } from "@/@types/Anamnese";
import { mabc2Keys, TestsNames, testsNames } from "@/@types/TestTypes";
import { mabc2 } from "@prisma/client";

export const isAnamneseResultsKey = (key: unknown): key is keyof AnamneseResults => {
  // On définit ici les clés valides de Person.
  const anamneseKeys: Array<keyof AnamneseResults> = [...anamneseResultsKeys]
  return typeof key === 'string' && anamneseKeys.includes(key as keyof AnamneseResults);
}

export const isMABC2Key = (key: unknown): key is keyof mabc2 => {
  const copyKeys: Array<keyof mabc2> = [...mabc2Keys]
  return typeof key === 'string' && copyKeys.includes(key as keyof mabc2);
}

export const isTestNames = (testName: string): boolean => {
  const copyKeys = [...testsNames]
  return copyKeys.includes(testName as TestsNames);
}

// 1) Déclarez un type générique qui accepte n'importe quel objet
export function isKeyOf<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}