import { z } from "zod";

export const SignInCredentialsSchema = z.object({
  email: z.string().min(1, "Une adresse e-mail est nécessaire.").email({message: "Format d'e-mail incorrect."}),
  password: z.string().min(1, "Un mot de passe est nécessaire."),
})

export const SignUpCredentialsSchema = z.object({
  name: z.string().min(1, "Un nom est nécessaire."),
  email: z.string().min(1, "Une adresse e-mail est nécessaire.").email({message: "Format d'e-mail incorrect."}),
  password: z.string().min(1, "Un mot de passe est nécessaire."),
})