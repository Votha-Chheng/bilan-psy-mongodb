import { z } from "zod";

export const BilanMedicalSchema = z.object({
  bilanMedicalKey: z.string().min(1, "Il manque la propriété concernée."),
  value: z.array(z.string()),
  patientId: z.string().min(1, "Il manque l'identifiant du patient."),
  anamneseId: z.string().min(1, "Il manque l'identifiant de l'anamnèset.").optional()
})