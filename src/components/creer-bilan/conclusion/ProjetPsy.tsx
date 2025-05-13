import React from 'react'
import ThemeConclusion from './ThemeConclusion'
import { useConclusionStore } from '@/stores/conclusionStore'

const ProjetPsy = () => {
  const {conclusion} = useConclusionStore()
  const {projetPsy} = conclusion ?? {}
  return (
    <div className='min-w-full'>
      <h2 className='font-bold underline underline-offset-4 mb-2 pl-2'>Projet psychomoteur :</h2>
      <p className='ml-5 mb-2.5'>► <span className='font-bold'>Des séances de psychomotricité sont préconisées</span> (réévaluables en fonction de l’évolution du suivi) pour :</p>
      <div className='pl-7.5'>
        <ThemeConclusion profilOuProjet='projetPsy' profilProjetPsyFromDB={projetPsy} />
      </div>
      <p className='ml-5 my-5'>► Par ailleurs, des aménagements sont proposés pour l’école et la maison <span className='font-bold'>(cf. annexe au bilan psychomoteur ci-joint)</span>.</p>
    </div>
  )
}

export default ProjetPsy