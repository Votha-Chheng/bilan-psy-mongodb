"use client"

import { useMenuItemStore } from '@/stores/menuItemStore'
import React, { JSX, useEffect } from 'react'
import EnTete from './enTete/EnTete'
import AnamneseSection from './anamnese/AnamneseSection'
import BilanTestSection from './bilanSections/BilanTestSection'
import ConclusionSection from './bilanSections/ConclusionSection'
import AmenagementsSection from './bilanSections/AmenagementsSection'
import { arimo } from '@/fonts/arimo'
import { useParams } from 'next/navigation'
import { usePatientInfoStore } from '@/stores/patientInfoStore'

const CompleteBilanBody = () => {
  const {id} = useParams<{id: string}>()
  const {fetchSinglePatientById} = usePatientInfoStore()
  const {menuItem} = useMenuItemStore()
  
  useEffect(()=> {
    fetchSinglePatientById(id)
  }, [])

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
