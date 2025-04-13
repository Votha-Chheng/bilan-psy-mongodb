
import { AnamneseResults, BilanMedicauxResults } from '@/@types/Anamnese'
import { PatientInfosGenerales } from '@/@types/PatientTypes'
import { fetchBilanMedicalResultByKey } from '@/serverActions/anamneseActions'
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
  anamneseResults: AnamneseResults|null
  bilansMedicauxResults: BilanMedicauxResults|null
  updateBilanMedicalByKey : (key: keyof BilanMedicauxResults, anamneseId: string|null|undefined)=> Promise<void>
}

export const usePatientInfoStore = create<PatientInfoState>((set, get) => ({
  patientInfoGenerales: null,
  anamneseResults: null,
  bilansMedicauxResults: null,
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
          confereDevPsy: anamnese?.confereDevPsy,
          autres: anamnese?.autres,
          accouchement: anamnese?.accouchement,
          accouchementCommentaire: anamnese?.accouchementCommentaire,
          grossesse: anamnese?.grossesse,
          stationAssise: anamnese?.stationAssise,
          quadrupedie: anamnese?.quadrupedie,
          ageMarche: anamnese?.ageMarche,
          acquisitionLangage: anamnese?.acquisitionLangage,
          continence : anamnese?.continence,
          sommeil: anamnese?.sommeil,
          alimentation: anamnese?.alimentation,
          autresDevPsy: anamnese?.autresDevPsy,
          velo: anamnese?.velo,
          motriciteGlobale: anamnese?.motriciteGlobale,
          motriciteFine: anamnese?.motriciteFine,
          praxiesGestuelles: anamnese?.praxiesGestuelles,
          extraScolaire: anamnese?.extraScolaire,
          autresMotricite: anamnese?.autresMotricite,
          sensorialite: anamnese?.sensorialite,
        } as AnamneseResults
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
        } as BilanMedicauxResults
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
      const {anamnese} = data ?? {}
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
          confereDevPsy: anamnese?.confereDevPsy,
          accouchement: anamnese?.accouchement,
          accouchementCommentaire: anamnese?.accouchementCommentaire,
          grossesse: anamnese?.grossesse,
          stationAssise: anamnese?.stationAssise,
          quadrupedie: anamnese?.quadrupedie,
          ageMarche: anamnese?.ageMarche,
          acquisitionLangage: anamnese?.acquisitionLangage,
          continence : anamnese?.continence,
          sommeil: anamnese?.sommeil,
          alimentation: anamnese?.alimentation,
          autresDevPsy: anamnese?.autresDevPsy,
          velo: anamnese?.velo,
          motriciteGlobale: anamnese?.motriciteGlobale,
          motriciteFine: anamnese?.motriciteFine,
          praxiesGestuelles: anamnese?.praxiesGestuelles,
          extraScolaire: anamnese?.extraScolaire,
          autresMotricite: anamnese?.autresMotricite,
          sensorialite: anamnese?.sensorialite,
        }
      })
    } catch (error) {
      console.log("Can't fetch PatientById")
    }
  },
  updateBilanMedicalByKey :async (key: keyof BilanMedicauxResults, anamneseId: string|null|undefined)=> {
    try {
      const response = await fetchBilanMedicalResultByKey(key, anamneseId) 
      const prevState = get().bilansMedicauxResults
      console.log(response.data)
      
      set({bilansMedicauxResults: {
        ...prevState,
        ...response.data
      } })
      
      console.log({
        ...prevState,
        ...response.data
      })
    } catch (error) {
      
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
