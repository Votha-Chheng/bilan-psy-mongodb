import { ServiceResponse } from "@/@types/ServiceResponse"

export const validationError = (data: ServiceResponse<any>)=> {
  return {
    message:`Erreur --> ${data.errors?.map(err => `${err.message}`).join(" - ")}`,
    success: false,
    fields: data.fields,
    issues: data.issues,
    errors: data.errors
  }
}

export const dataBaseError = (message?: string)=> {
  return {
    success: false,
    message:`Erreur --> ${message ?? "la base de données semble inaccessible pour l'instant..."}`,
    data: null
  }
}

export const serverError = (error: unknown, message?: string)=> {
  let errorMessage = undefined

  if(error instanceof Error){
    errorMessage = error.message
  }
  return {
    success: false,
    message: message ? `Le serveur a renvoyé ce message d'erreur : ${errorMessage}` : "Erreur serveur : patient introuvable ou base de données momentanément inaccessible."
  }
}