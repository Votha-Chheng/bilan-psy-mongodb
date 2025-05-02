import React from 'react'
import ConclusionText from './ConclusionText'
import Recommandations from './Recommandations'
import { Separator } from '@/components/ui/separator'

const ProfilPsy = () => {
  return (
    <div className='min-w-full'>
      <h2 className='font-bold underline underline-offset-4 mb-2 pl-2'>Profil psychomoteur :</h2>
      <ConclusionText/>
      <Separator className='mb-5 mt-10' />
      <Recommandations/>
    </div>
  )
}

export default ProfilPsy