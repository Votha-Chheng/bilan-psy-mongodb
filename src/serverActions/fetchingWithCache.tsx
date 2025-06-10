// serverData.ts
import { cache } from 'react';
import { fetchAllEcoles } from './ecoleActions';
import { fetchAllMotifsConsultation } from './motifActions';

export const fetchAllEcoleWithCache = cache(fetchAllEcoles)

export const fetchAllMotifsConsultationWithCache = cache(fetchAllMotifsConsultation)

