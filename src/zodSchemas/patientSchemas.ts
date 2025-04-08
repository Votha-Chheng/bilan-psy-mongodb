import { z } from "zod";

export const CreatePatientSchema = z.object({
  nom: z.string().min(1, "Nom nécessaire."),
  prenom: z.string().min(1, "Prénom nécessaire."),
  dateNaissance: z.string().min(1, "Date de naissance nécessaire."),
  sexe: z.enum(["m", "f"]),
  adulte: z.enum(['false', 'true'], {message: "Il faut choisr entre adulte ou enfant."}).transform(val => val === "true" ? true : false),
  medecin: z.string().min(1, "Médecin nécessaire."),
  motif: z.string().min(1, "Motif nécessaire."),
  ecole: z.string().optional(),
  userId: z.string().min(1, "Le patient doit être relié à votre identifiant."),
}).superRefine((data, ctx) => {
  // Si la personne n'est pas adulte, l'école est obligatoire
  if (!data.adulte && (!data.ecole || data.ecole.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "L'école est obligatoire pour un enfant.",
      path: ["ecole"],
    });
  }
});
