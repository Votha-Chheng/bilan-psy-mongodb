import { ServiceResponse } from "@/@types/ServiceResponse";
import { ZodSchema } from "zod"

export const validateWithZodSchema = (schema: ZodSchema, data: any): ServiceResponse<unknown>=>{
  const result = schema.safeParse(data)

  if (!result.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = data[key]?.toString() ?? undefined;
    }

    return {
      message: "Erreur de validation !",
      success: false,
      fields,
      issues: result.error.issues.map((issue) => Object.fromEntries([[issue.path, issue.message]])),
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: `Serveur validation: ${issue.message}`,
      })),
    };
  }

  return {
    data: result.data,
    success: true
  }
}