
import { PatientInfosGenerales } from '@/@types/PatientTypes'
import { fetchAllPatientsWithCache, fetchPatientByIdWithCache } from '@/serverActions/fetchingWithCache'
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

export const usePatientInfoStore = create<PatientInfoState>((set, get) => ({
  patientInfoGenerales: null,
  allPatients: [],
  loadingAllPatients: false,
  loadingPatientInfoFromDB: false,
  fetchAllPatients: async()=> {
    set({loadingAllPatients: true})
    try {
      const response = await fetchAllPatientsWithCache()
      set({ allPatients: response.data })

    } catch (error) {
      console.log("Can't fetch all patients")
    } finally {
      set({loadingAllPatients: false})
    }
  },
  fetchSinglePatientById: async (id: string) => {
    set({loadingPatientInfoFromDB: true})
    try {
      const response = await fetchPatientByIdWithCache(id)
      const {data} = response ?? {}
      set({ 
        patientInfoGenerales: {
          id: data?.id,
          nom: data?.nom ?? null,
          prenom: data?.prenom?? null,
          dateNaissance: data?.dateNaissance?? null,
          sexe: data?.sexe,
          adulte: data?.adulte ?? null,
          medecin: data?.medecin,
          motif: data?.motif,
          ecole: data?.ecole,
          dateBilan: data?.dateBilan?? null,
          createdAt: data?.createdAt?? null,
          updated: data?.updated?? null
        } 
      })
      
    } catch (error) {
      console.log("Can't fetch PatientById")
    } finally {
      set({loadingPatientInfoFromDB: false})
    }
  },
  updatePatientInfoFromDB: async (id: string) => {
    try {
      const response = await fetchPatientByIdWithCache(id)
      const {data} = response ?? {}
      set({ 
        patientInfoGenerales: {
          id: data?.id,
          nom: data?.nom ?? null,
          prenom: data?.prenom?? null,
          dateNaissance: data?.dateNaissance?? null,
          sexe: data?.sexe,
          adulte: data?.adulte ?? null,
          medecin: data?.medecin,
          motif: data?.motif,
          ecole: data?.ecole,
          dateBilan: data?.dateBilan?? null,
          createdAt: data?.createdAt?? null,
          updated: data?.updated?? null
        } 
      })
    } catch (error) {
      console.log("Can't fetch PatientById")
    }
  },
  updateAllPatients: async () => {
    try {
      const response = await fetchAllPatientsWithCache()
      set({ allPatients: response.data })
      
    } catch (error) {
      console.log("Can't fetch PatientById")
    }
  }
}))
