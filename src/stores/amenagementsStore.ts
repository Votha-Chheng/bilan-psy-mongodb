import { AmenagementItemDTO } from "@/@types/AmenagementsTypes"
import { fetchAllAmenagementItems, fetchAmenagementsByPatientId, fetchManyAmenagementItems } from "@/serverActions/amenagementsAction"
import { create } from "zustand"

type AmenagementsState = {
  loadingAmenagements: boolean
  amenagementsStateId: string|null
  amenagementItemsIds: string[]|null
  categoriesList: string[]|null
  allAmenagementItems: AmenagementItemDTO[]|null
  getAllAmenagementItems : ()=> Promise<void>
  loadingManyAmenagementsItems: boolean
  manyAmenagementsItems: AmenagementItemDTO[]|null
  updateManyAmenagementItems : (idsList: string[])=> Promise<void>
  getManyAmenagementItems : (idsList: string[])=> Promise<void>
  getAmenagementsByPatientId: (patientId: string)=> Promise<void>
  updateAmenagementsByPatientId: (patientId: string)=> Promise<void>
}

export const useAmenagementsStore = create<AmenagementsState>((set) => ({
  amenagementItemsIds: null,
  amenagementsStateId: null,
  manyAmenagementsItems: null,
  getManyAmenagementItems : async(idsList: string[])=> {
    set({loadingManyAmenagementsItems: true})
    try {
      const response = await fetchManyAmenagementItems(idsList)
      set({manyAmenagementsItems: response.data})
    } catch (error) {
      console.log("Can't getManyAmenagementItems", error)
    } finally {
      set({loadingManyAmenagementsItems: false})
    }
  },
  categoriesList: null,
  loadingManyAmenagementsItems: false,
  loadingAmenagements: false,
  allAmenagementItems: null,
  amenagements: null,
  updateManyAmenagementItems : async(idsList: string[])=> {
    try {
      const response = await fetchManyAmenagementItems(idsList)
      set({manyAmenagementsItems: response.data})
    } catch (error) {
      console.log("Can't getAllAmenagementItems", error)
    } 
  },
  getAmenagementsByPatientId: async(patientId: string)=> {
    set({loadingAmenagements: true})
    try {
      const response = await fetchAmenagementsByPatientId(patientId)
      set({amenagementsStateId: response.data?.id})
      set({amenagementItemsIds: response.data?.amenagementItemsIds})
    } catch (error) {
      console.log("Can't getAmenagementsByPatientId", error)
    } finally {
      set({loadingAmenagements: false})
    }
  },
  updateAmenagementsByPatientId: async(patientId: string)=> {
    try {
      const response = await fetchAmenagementsByPatientId(patientId)
      set({amenagementsStateId: response.data?.id})
      set({amenagementItemsIds: response.data?.amenagementItemsIds})
    } catch (error) {
      console.log("Can't getAllAmenagementItems", error)
    }
  },
  getAllAmenagementItems : async()=> {
    try {
      const response = await fetchAllAmenagementItems()
      set({allAmenagementItems: response.data})

      if(response.data){
        const categories = response.data.map(amenagementItem=> amenagementItem.category as string )
        const setOfCategories = Array.from(new Set(categories))
        set({categoriesList: setOfCategories ?? null})
      } else {
        set({categoriesList: null})
      }
    } catch (error) {
      console.log("Can't getAllAmenagementItems", error)
    }
  },
}))