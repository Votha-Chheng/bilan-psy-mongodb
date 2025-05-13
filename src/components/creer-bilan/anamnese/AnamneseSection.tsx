import { Card } from '@/components/ui/card'
import React, { useEffect } from 'react'
import TexteBrutAnamnese from './noteBrutes/TexteBrutAnamnese'
import { useParams } from 'next/navigation'
import AntecedentsPart from './antecedents/AntecedentsPart'
import FamillePart from './famille/FamillePart'
import DeveloppementPsyPart from './developpementPsy/DeveloppementPsyPart'
import MotricitePart from './motricite/MotricitePart'
import { useAnamnesePartStore } from '@/stores/partieAnamneseStore'
import ScolaritePart from './scolarite/ScolaritePart'
import QuoditienPart from './quotidien/QuoditienPart'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2 } from 'lucide-react'

const AnamneseSection = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {initializeChosenThemes, initializeAnamneseResultsByPatientId, loadingAnamneseResults} = useAnamneseSearchDBStore()
  const {anamenesePart} = useAnamnesePartStore()


  useEffect(()=> {
    initializeChosenThemes(patientId)
  }, [])

  useEffect(()=> {
    initializeAnamneseResultsByPatientId(patientId)
  }, [])


  return (
    <article>
      <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
        Anamnèse
      </Card>
      <div className='overflow-hidden w-full'>
        {
          loadingAnamneseResults
          ?
          <div className='flex flex-col w-full items-center justify-center'>
            <p>Chargement des données...</p>
            <Loader2 className='animate-spin' />
          </div>
          :
          <div className='transition-transform duration-200 w-full flex-nowrap flex' style={{transform: `translateX(${anamenesePart * -100}%)`}} >
            <TexteBrutAnamnese />
            <FamillePart  />
            <AntecedentsPart/>
            <DeveloppementPsyPart/>
            <MotricitePart/>
            <ScolaritePart/>
            <QuoditienPart/>
          </div>
        }
      </div>
    </article>
  )
}

export default AnamneseSection
