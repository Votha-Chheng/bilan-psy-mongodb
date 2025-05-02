import { PatientInfosGenerales } from "@/@types/PatientTypes";

export const getPatientNameById = (patientsListe: PatientInfosGenerales[]|null, id: string): string|null=> {
  if(!patientsListe) return null
  const patient = patientsListe.find(patient=> patient.id === id)
  if(!patient) return null
  return `${patient.prenom} ${patient.nom?.toUpperCase()}`
}