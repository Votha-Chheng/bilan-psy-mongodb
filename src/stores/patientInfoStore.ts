
import { AnamneseDTO, AnamneseResults, BilanMedicauxResults } from '@/@types/Anamnese'
import { PatientInfosGenerales } from '@/@types/PatientTypes'
import { fetchPatientById, fetchPatientsList } from '@/serverActions/patientActions'
import { Anamnese, BilanMedical } from '@prisma/client'
import { create } from 'zustand'

type PatientInfoState = {
  patientInfoGenerales: PatientInfosGenerales|null
  allPatients: Partial<PatientInfosGenerales>[]|null
  loadingPatientInfoFromDB: boolean
  loadingAllPatients: boolean
  fetchAllPatients : ()=> Promise<void>
  updateAllPatients : ()=> Promise<void>
  fetchSinglePatientById: (id: string) => Promise<void>
  updatePatientInfoFromDB: (id: string) => Promise<void>
  anamneseResults: AnamneseResults|null
  bilansMedicauxResults: BilanMedicauxResults|null
}

export const usePatientInfoStore = create<PatientInfoState>((set) => ({
  patientInfoGenerales: null,
  anamneseResults: null,
  bilansMedicauxResults: null,
  allPatients: [],
  loadingAllPatients: false,
  loadingPatientInfoFromDB: false,
  fetchAllPatients: async()=> {
    set({loadingAllPatients: true})
    try {
      const response = await fetchPatientsList()
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
      const response = await fetchPatientById(id)
      const {data} = response ?? {}
      const {anamnese} = data ?? {}
      const {bilansMedicauxResults} = anamnese ?? {}
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
      set({ 
        anamneseResults:{
          id: anamnese?.id,
          notesBrutes: anamnese?.notesBrutes,
          proposPapaOuMaman: anamnese?.proposPapaOuMaman,
          fratrie: anamnese?.fratrie,
          neant: anamnese?.neant ?? "false",
          compositionFamiliale: anamnese?.compositionFamiliale,
          dossierMDPH: anamnese?.dossierMDPH,
          maladiesEventuelles: anamnese?.maladiesEventuelles,
          handicap: anamnese?.handicap,
          autres: anamnese?.autres,
        }
      })

      set({
        bilansMedicauxResults:{
          id: bilansMedicauxResults?.id,
          selectedBilans: bilansMedicauxResults?.selectedBilans,
          bilanOphtalmo: bilansMedicauxResults?.bilanOphtalmo,
          bilanOrthophonique: bilansMedicauxResults?.bilanOrthophonique,
          bilanOrthoptique: bilansMedicauxResults?.bilanOrthoptique,
          bilanNeuropsy: bilansMedicauxResults?.bilanNeuropsy,
          bilanNeuropediatre: bilansMedicauxResults?.bilanNeuropediatre,
          bilanORL: bilansMedicauxResults?.bilanORL
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
      const response = await fetchPatientById(id)
      const {data} = response ?? {}
      const {anamnese} = data ?? {}
      const {bilansMedicauxResults} = anamnese ?? {}
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
      set({ 
        anamneseResults:{
          id: anamnese?.id,
          notesBrutes: anamnese?.notesBrutes,
          proposPapaOuMaman: anamnese?.proposPapaOuMaman,
          fratrie: anamnese?.fratrie,
          compositionFamiliale: anamnese?.compositionFamiliale,
          neant: anamnese?.neant ?? "false",
          dossierMDPH: anamnese?.dossierMDPH,
          maladiesEventuelles: anamnese?.maladiesEventuelles,
          handicap: anamnese?.handicap,
          autres: anamnese?.autres,
        }
      })

      set({
        bilansMedicauxResults:{
          id: bilansMedicauxResults?.id,
          selectedBilans: bilansMedicauxResults?.selectedBilans,
          bilanOphtalmo: bilansMedicauxResults?.bilanOphtalmo,
          bilanOrthophonique: bilansMedicauxResults?.bilanOrthophonique,
          bilanOrthoptique: bilansMedicauxResults?.bilanOrthoptique,
          bilanNeuropsy: bilansMedicauxResults?.bilanNeuropsy,
          bilanNeuropediatre: bilansMedicauxResults?.bilanNeuropediatre,
          bilanORL: bilansMedicauxResults?.bilanORL
        }
      })
    } catch (error) {
      console.log("Can't fetch PatientById")
    }
  },
  updateAllPatients: async () => {
    try {
      const response = await fetchPatientsList()
      set({ allPatients: response.data })
      
    } catch (error) {
      console.log("Can't fetch PatientById")
    }
  }
}))
