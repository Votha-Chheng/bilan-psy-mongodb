
import { PatientInfosGenerales } from '@/@types/PatientTypes'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { create } from 'zustand'

type PatientInfoState = {
  patientInfoGenerales: PatientInfosGenerales|null
  allPatients: PatientInfosGenerales[]|null
  loadingPatientInfoFromDB: boolean
  loadingAllPatients: boolean
  fetchAllPatients : ()=> Promise<void>
  updateAllPatients : ()=> Promise<void>
  fetchSinglePatientById: (id: string) => Promise<void>
  updatePatientInfoFromDB: (id: string) => Promise<void>
}

export const usePatientInfoStore = create<PatientInfoState>((set) => ({
  patientInfoGenerales: null,
  allPatients: [],
  loadingAllPatients: false,
  loadingPatientInfoFromDB: false,
  fetchAllPatients: async()=> {
    set({loadingAllPatients: true})
    try {
      const response = await fetch("/api/patients")
      const parsedResponse: ServiceResponse<PatientInfosGenerales[]|null> = await response.json()
      set({ allPatients: parsedResponse.data })

    } catch (error) {
      console.log("Can't fetch all patients", error)
    } finally {
      set({loadingAllPatients: false})
    }
  },
  fetchSinglePatientById: async (id: string) => {
    set({loadingPatientInfoFromDB: true})
    try {
      const response = await fetch(`/api/patients/${id}`)
      const res = await response.json() as ServiceResponse<PatientInfosGenerales|null>
      const {data} = res ?? {}
      set({ patientInfoGenerales: data })
      
    } catch (error) {
      console.log("Can't fetch PatientById", error)
    } finally {
      set({loadingPatientInfoFromDB: false})
    }
  },
  updatePatientInfoFromDB: async (id: string) => {
    try {
      const response = await fetch(`/api/patients/${id}`)
      const res = await response.json() as ServiceResponse<PatientInfosGenerales|null>
      const {data} = res ?? {}
      set({ patientInfoGenerales: data })
    } catch (error) {
      console.log("Can't fetch PatientById", error)
    }
  },
  updateAllPatients: async () => {
    try {
      const response = await fetch("/api/patients")
      const parsedResponse: ServiceResponse<PatientInfosGenerales[]|null> = await response.json()
      set({ allPatients: parsedResponse.data })
      
    } catch (error) {
      console.log("Can't fetch PatientById", error)
    }
  }
}))
