import { Card } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import React, { useEffect, useState } from 'react'
import FlechesNepsy2Table from './tables/FlechesNepsy2Table'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useObservationStore } from '@/stores/observationStore'
import { upsertFlechesNepsy2ResultsAction } from '@/serverActions/testsActions/flechesNepsy2Actions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { FlechesNEPSY2ResultsDTO } from '@/@types/BilanTests'

const FlechesNepsy2 = () => {
  const {flechesnepsy2, updateFlechesNepsy2, bilanId} = useBilanTestsStore()
  const {observations} = flechesnepsy2 ?? {}
  const {flechesNepsy2Observations, getFlechesNepsy2Observations} = useObservationStore()

  const [observationsLocal, setObservationsLocal] = useState<string>("")

  const testName = "Epreuve visuo-spatiale des flèches (Nepsy 2)"
  const flechesNepsy2Test = allTests.find(test => test.nom===testName)

  useEffect(()=> {
    getFlechesNepsy2Observations()
  }, [])

  useEffect(()=> {
    if(!flechesnepsy2) return
    setObservationsLocal(observations ?? "")
  }, [flechesnepsy2])

  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertFlechesNepsy2ResultsAction<string>(keyTest as keyof FlechesNEPSY2ResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertFlechesNepsy2ResultsAction<string>(keyTest as keyof FlechesNEPSY2ResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertFlechesNepsy2ResultsAction<string>(keyTest as keyof FlechesNEPSY2ResultsDTO, "", bilanId ?? "")
  }

  const updateObservationsListe = ()=> {
    getFlechesNepsy2Observations()
  }
  const updateFunction = ()=> {
    updateFlechesNepsy2(bilanId)
  }
  return (
    <Card className={`py-2 px-3.5 my-5 w-full gap-y-0`}>
      <p className='italic text-sm mb-5'>
        &#8227; <span className='font-bold'>{flechesNepsy2Test?.nom?? ""}</span> : {flechesNepsy2Test?.description ?? ` : ${flechesNepsy2Test?.description}.`}
      </p>
      <FlechesNepsy2Table/>
      <ThemeObservationGenerics
        theme="Observations"
        test={testName}
        stateLocal={observationsLocal}
        setStateLocal={setObservationsLocal}
        observationsTest={flechesNepsy2Observations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={updateFunction}
        updateObservationsListe={updateObservationsListe}
        keyTest='observations'
      />
    </Card>
  )
}

export default FlechesNepsy2
