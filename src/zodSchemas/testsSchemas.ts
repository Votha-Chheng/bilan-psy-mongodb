import { z } from "zod";

export const MABC2ResultsSchema = z.object({
  id: z.string().nullable().optional(),
  bilanId: z.string().nullable().optional(),
  dexteriteManuelle: z.string().nullable().optional(),
  viserAttraper: z.string().nullable().optional(),
  equilibre: z.string().nullable().optional(),
  total: z.string().nullable().optional(),
  competencesMotrices: z.string().nullable().optional(),
  precisionUnimanuelle: z.array(z.string()).nullable().optional(),
  coordinationsBimanuelles: z.array(z.string()).nullable().optional(),
  precisionVisuoMotrice: z.array(z.string()).nullable().optional(),
  coordinationsGlobalesRattrapes: z.array(z.string()).nullable().optional(),
  coordinationsGlobalesLancers: z.array(z.string()).nullable().optional(),
  motriciteGlobaleUnipodal: z.array(z.string()).nullable().optional(),
  motriciteGlobaleDynamique: z.array(z.string()).nullable().optional(),
  motriciteGlobaleSauts: z.array(z.string()).nullable().optional(),
  observationsComplementaires: z.string().nullable().optional(),
})