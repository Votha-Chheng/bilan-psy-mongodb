// serverData.ts
import { cache } from 'react';
import { fetchPatientById, fetchPatientsList } from './patientActions';
import { fetchAllEcoles } from './ecoleActions';
import { fetchAllMotifsConsultation } from './motifActions';
import { fetchAnamneseByKeys } from './anamneseActions';

export const fetchPatientByIdWithCache = cache(fetchPatientById);

export const fetchAllPatientsWithCache = cache(fetchPatientsList)

export const fetchAllEcoleWithCache = cache(fetchAllEcoles)

export const fetchAllMotifsConsultationWithCache = cache(fetchAllMotifsConsultation)

export const fetchAnamneseByKeysWithCache = cache(fetchAnamneseByKeys)


