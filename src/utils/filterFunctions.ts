import { AmenagementItemDTO } from "@/@types/AmenagementsTypes"

export const checkIfCategoryIsInAmenagementForPatient = (amenagementsForPatient: AmenagementItemDTO[]|null, categoryToCheck: string): boolean=> {
  if(!amenagementsForPatient) return false
  const result = amenagementsForPatient.find(amenagement=> amenagement.category === categoryToCheck)
  return Boolean(result)
}

export const getAmenagementsForPatientByCategory = (category: string, amenagementsForPatient: AmenagementItemDTO[]): AmenagementItemDTO[]=> {
  return amenagementsForPatient.filter(amenagementItem=> amenagementItem.category === category)
}