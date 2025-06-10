"use client"

import { useMenuItemStore } from '@/stores/menuItemStore'
import React, { JSX } from 'react'
import EnTete from './enTete/EnTete'
import AnamneseSection from './anamnese/AnamneseSection'
import BilanTestSection from './bilanTests/BilanTestSection'
import ConclusionSection from './conclusion/ConclusionSection'
import { arimo } from '@/fonts/arimo'
import AmenagementsSection from './amenagements/AmenagementsSection'

const CompleteBilanBody = () => {
  const {menuItem} = useMenuItemStore()

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
