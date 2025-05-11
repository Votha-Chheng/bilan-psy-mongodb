export type AmenagementItemDTO = {
  id?: string
  amenagement?: string|null
  category?: string|null
}

export type AmenagementsDTO = {
  id?: string
  patientId?: string
  amenagementItems?: AmenagementItemDTO[]|null
  amenagementItemsIds: string[]
}

export type AmenagementCategoriesDTO = {
  id?: string
  categoriesListe: string[]|null
}

export type AmenagementsGlobal = {
  amenagementsId: string|null
  listAmenagementsItems: AmenagementItemDTO[]|null
  categoriesList: string[]|null
}
