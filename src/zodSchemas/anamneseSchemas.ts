
import { isAnamneseResultsKey } from "@/utils/typeGuards";
import { z } from "zod";

export const AnamneseDescriptionSchema = z.object({
  domaine : z.string().min(1, "Le domaine est nécessaire."),             
  theme : z.string().min(1, "Le thème est nécessaire."),
  description : z.string().min(1, "La description est nécessaire."),
  patientId: z.string().min(1, "L'identifiant du patient est nécessaire.")
})

export const AnamneseDataSchema = z.object({
  patientId: z.string().min(1, "L'identifiant du patient est nécessaire."),
  fratrie: z.string().optional(),
  compositionFamiliale: z.string().optional(),
})

export const KeyValueAnamneseSchema = z.object({
  key: z.string().min(1, "La clé est nécessaire.").refine(value=> isAnamneseResultsKey(value)),
  value: z.string().min(1, "La valeur est nécessaire."),
  patientId: z.string().min(1, "L'identifiant du patient est nécessaire.")

})
