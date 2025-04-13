import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import TexteBrutAnamnese from './noteBrutes/TexteBrutAnamnese'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import AntecedentsPart from './antecedents/AntecedentsPart'
import FamillePart from './famille/FamillePart'
import DeveloppementPsyPart from './developpementPsy/DeveloppementPsyPart'
import MotricitePart from './motricite/MotricitePart'
import { useAnamnesePartStore } from '@/stores/partieAnamneseStore'
import ScolaritePart from './scolarite/ScolaritePart'
import QuoditienPart from './quotidien/QuoditienPart'

const AnamneseSection = () => {
  //const [partieAnamnese, setPartieAnamnese] = useState<number>(0)
  const {fetchAllPatients} = usePatientInfoStore()
  const {anamenesePart} = useAnamnesePartStore()

  useEffect(()=> {
    fetchAllPatients()
  }, [])
  
  return (
    <article>
      <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
        Anamnèse
      </Card>
      <div className='overflow-hidden'>
        <div className='transition-transform duration-100 w-full flex' style={{transform: `translateX(${anamenesePart * -100}%)`}} >
          <TexteBrutAnamnese />
          <FamillePart />
          <AntecedentsPart/>
          <DeveloppementPsyPart/>
          <MotricitePart/>
          <ScolaritePart/>
          <QuoditienPart/>
        </div>
      </div>
    </article>
  )
}

export default AnamneseSection
