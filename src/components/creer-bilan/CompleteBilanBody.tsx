"use client"

import { useMenuItemStore } from '@/stores/menuItemStore'
import React, { JSX, useEffect } from 'react'
import EnTete from './enTete/EnTete'
import AnamneseSection from './anamnese/AnamneseSection'
import BilanTestSection from './bilanTests/BilanTestSection'
import ConclusionSection from './conclusion/ConclusionSection'
import { arimo } from '@/fonts/arimo'
import { useParams } from 'next/navigation'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import AmenagementsSection from './amenagements/AmenagementsSection'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { useAmenagementsStore } from '@/stores/amenagementsStore'
import { useConclusionStore } from '@/stores/conclusionStore'

const CompleteBilanBody = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {menuItem} = useMenuItemStore()
  const { fetchSinglePatientById, loadingPatientInfoFromDB} = usePatientInfoStore()
  const {anamneseResults, updateBilanMedicauxResults, initializeAnamneseResultsByPatientId, loadingAnamneseResults} = useAnamneseSearchDBStore()
  const { getBilanByPatientId, loadingBilanResults} = useBilanTestsStore()
  const { getConclusionByPatientId, loadingConclusionData } = useConclusionStore()
  const { loadingAmenagements, getAmenagementsByPatientId} = useAmenagementsStore()

  useEffect(()=> {
    if(patientId) {
      fetchSinglePatientById(patientId)
      initializeAnamneseResultsByPatientId(patientId)
      getBilanByPatientId(patientId),
      getConclusionByPatientId(patientId)
      getAmenagementsByPatientId(patientId)
    }

  }, [patientId, menuItem])

  useEffect(()=> {
    if(!anamneseResults) return
    updateBilanMedicauxResults(anamneseResults?.id)
  }, [anamneseResults?.id])

  const returnComponent = (menuItem: string|null): JSX.Element=> {
    switch(menuItem){
      case "anamnese": return <AnamneseSection/>
      case "bilan" : return  <BilanTestSection />
      case "conclusion": return <ConclusionSection/>
      case "amenagements" : return <AmenagementsSection />
      default : return <EnTete/>
    }
  }
  return (
    <section className={`${arimo.className} py-2.5 mx-5`}>
      { returnComponent(menuItem) }
    </section>
  )
}

export default CompleteBilanBody
