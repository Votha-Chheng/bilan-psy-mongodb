import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAmenagementsStore } from '@/stores/amenagementsStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import GestionPlan from './GestionPlan'
import AffichagePlan from './AffichagePlan'

const AmenagementsSection = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {patientInfoGenerales} = usePatientInfoStore()
  const {nom, prenom} = patientInfoGenerales ?? {}
  const {getAmenagementsByPatientId, getAllAmenagementItems, getManyAmenagementItems, manyAmenagementsItems, amenagementItemsIds} = useAmenagementsStore()

  useEffect(()=> {
    getAmenagementsByPatientId(patientId)
    getAllAmenagementItems()
  }, [])
  
  useEffect(()=> {
    getManyAmenagementItems(amenagementItemsIds ?? [])
    
  }, [amenagementItemsIds])

  return (
    <article className='w-full'>
      <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
        annexe au bilan psychomoteur
      </Card>
      <h1 className='uppercase font-bold text-center text-lg'>Aménagements scolaires</h1>
      <h2 className='text-center'>{`${nom?.toUpperCase()} ${prenom}`}</h2>
      <Separator className='my-5'/>
      <p className='my-10 italic'>
        La liste d’aménagements ci-dessous est proposée à l’équipe pédagogique qui, avec les observations faites en classe, pourra mettre en application les idées lui semblant les plus pertinentes afin d’aider l’élève au mieux.
      </p>
      <div className='w-full flex'>
        <AffichagePlan/>
        <GestionPlan/>
      </div>
    </article>
  )
}

export default AmenagementsSection
