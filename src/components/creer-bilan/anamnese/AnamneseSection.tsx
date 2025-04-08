import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import TexteBrutAnamnese from './noteBrutes/TexteBrutAnamnese'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import AntecedentsPart from './antecedents/AntecedentsPart'
import FamillePart from './famille/FamillePart'

const AnamneseSection = () => {
  const {id} = useParams<{id: string}>()
  const [partieAnamnese, setPartieAnamnese] = useState<number>(0)
  const {fetchSinglePatientById, fetchAllPatients} = usePatientInfoStore()

  useEffect(()=> {
    fetchAllPatients()
    fetchSinglePatientById(id)
  }, [])
  
  return (
    <article>
      <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
        Anamnèse
      </Card>
      <div className='overflow-hidden'>
        <div className='transition-transform duration-100 w-full flex' style={{transform: `translateX(${partieAnamnese * -100}%)`}} >
          <TexteBrutAnamnese setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese} />
          <FamillePart setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese} />
          <AntecedentsPart setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese} />
          {/* <InfosGenerauxScreen setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese} />
          <AntecedentScreen setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese} />
          <DevPsyScreen setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese}/>
          <MotriciteScreen setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese}/>
          <EcoleScreen setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese}/>
          <QuotidienScreen setPartieAnamnese={setPartieAnamnese} partieAnamnese={partieAnamnese} /> */}
        </div>
      </div>
    </article>
  )
}

export default AnamneseSection
