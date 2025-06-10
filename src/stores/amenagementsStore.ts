import { AmenagementItemDTO } from "@/@types/AmenagementsTypes"
import { ServiceResponse } from "@/@types/ServiceResponse"
import { fetchManyAmenagementItems } from "@/serverActions/amenagementsAction"
import { Amenagements } from "@prisma/client"
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
      const response = await fetch(`/api/many-amenagement-items?ids=${idsList.join(",")}`)
      const {data} = await response.json() as ServiceResponse<AmenagementItemDTO[]|null>
      console.log(data)
      // const response = await fetchManyAmenagementItems(idsList)
      set({manyAmenagementsItems: data})
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
      const response =await fetch(`/api/amenagements/${patientId}`)
      const {data} = await response.json() as ServiceResponse<Amenagements|null>

      set({amenagementsStateId: data?.id})
      set({amenagementItemsIds: data?.amenagementItemsIds})
    } catch (error) {
      console.log("Can't getAmenagementsByPatientId", error)
    } finally {
      set({loadingAmenagements: false})
    }
  },
  updateAmenagementsByPatientId: async(patientId: string)=> {
    try {
      const response = await fetch(`/api/amenagements/${patientId}`, {cache: "no-store"})
      const {data} = await response.json() as ServiceResponse<Amenagements|null>

      set({amenagementsStateId: data?.id})
      set({amenagementItemsIds: data?.amenagementItemsIds})
    } catch (error) {
      console.log("Can't getAllAmenagementItems", error)
    }
  },
  getAllAmenagementItems : async()=> {
    try {
      const response = await fetch("/api/amenagement-item")
      const parsedResponse = await response.json() as ServiceResponse<AmenagementItemDTO[]|null>
      const {data} = parsedResponse ?? {}
      set({allAmenagementItems: data})

      if(data){
        const categories = data.map(amenagementItem=> amenagementItem.category as string )
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