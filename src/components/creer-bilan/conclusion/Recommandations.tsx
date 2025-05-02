import { MoveRight } from 'lucide-react'
import React from 'react'
import ThemeConclusion from './ThemeConclusion'
import { useConclusionStore } from '@/stores/conclusionStore'

const Recommandations = () => {
  const {conclusion} = useConclusionStore()
  const {profilPsy} = conclusion ?? {}
  return (
    <div className='px-5'>
      <div className='flex items-center mb-2.5'>
        <MoveRight className='mr-2'/> <span className='underline underline-offset-2 font-bold mr-2'>Je recommande</span> :
      </div>
      <ThemeConclusion profilOuProjet="profilPsy" profilProjetPsyFromDB={profilPsy} />

    </div>
  )
}

export default Recommandations