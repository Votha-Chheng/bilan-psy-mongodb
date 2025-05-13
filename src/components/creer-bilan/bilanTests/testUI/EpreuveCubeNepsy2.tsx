import { Card } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import React, { useEffect, useState } from 'react'
import EpreuveCubeNepsy2Table from './tables/EpreuveCubeNepsy2Table'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { epreuvecubesnepsy2 } from '@prisma/client'
import { upsertEpreuveCubesNepsy2ByKeyValueAction } from '@/serverActions/testsActions/epreuveCubesNepsy2Action'
import { useObservationStore } from '@/stores/observationStore'

const EpreuveCubeNepsy2 = () => {
  const {epreuvecubesnepsy2, bilanId, updateEpreuveCubesNepsy2} = useBilanTestsStore()
  const {observations} = epreuvecubesnepsy2 ?? {}

  const {epreuvecubesnepsy2Observations, getEpreuveCubesNepsy2Observations} = useObservationStore()

  const [observationsLocal, setObservationsLocal] = useState<string>("")

  useEffect(()=> {
    if(!observations) return
    setObservationsLocal(observations)
  }, [observations])

  useEffect(()=> {
    getEpreuveCubesNepsy2Observations()
  }, [])

  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertEpreuveCubesNepsy2ByKeyValueAction<string>(keyTest as keyof epreuvecubesnepsy2, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertEpreuveCubesNepsy2ByKeyValueAction<string>(keyTest as keyof epreuvecubesnepsy2, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertEpreuveCubesNepsy2ByKeyValueAction<string>(keyTest as keyof epreuvecubesnepsy2, "", bilanId ?? "")
  }
    

  const testName = "Epreuve des cubes (Nepsy 2)"
  const epreuveCubesNepsy2 = allTests.find(test => test.nom===testName)

  return (
    <Card className={`py-2 px-3.5 my-5 w-full gap-y-0`}>
      <p className='italic text-sm mb-5'>
        &#8227; <span className='font-bold'>{epreuveCubesNepsy2?.nom?? ""}</span> : {epreuveCubesNepsy2?.description ?? ` : ${epreuveCubesNepsy2?.description}.`}
      </p>
      <EpreuveCubeNepsy2Table/>
      <ThemeObservationGenerics
        theme="Observations (épreuve des cubes de la Nepsy 2)" 
        test={testName} 
        stateLocal={observationsLocal}
        setStateLocal={setObservationsLocal}
        observationsTest={epreuvecubesnepsy2Observations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={()=> updateEpreuveCubesNepsy2(bilanId)} 
        updateObservationsListe={getEpreuveCubesNepsy2Observations}
        keyTest='observations'
      />
    </Card>
  )
}

export default EpreuveCubeNepsy2
