import { Card, CardContent } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import React, { useEffect, useState } from 'react'
import ImitationPosisitionNepsy2Table from './tables/ImitationPosisitionNepsy2Table'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useObservationStore } from '@/stores/observationStore'
import { upsertImitationNepsy2ByKeyValueAction } from '@/serverActions/testsActions/imitationNepsy2Actions'
import { imitationpositionsnepsy2 } from '@prisma/client'

const ImitationPosisitionNepsy2 = () => {
  const {imitationpositionsnepsy2, updateImitationNepsy2, bilanId} = useBilanTestsStore()
  const {getImitationNepsy2Observations, imitationNepsy2Observations} = useObservationStore()
  const {observationsDiverses} = imitationpositionsnepsy2 ?? {}

  const [observationsDiversesLocal, setobservationsDiversesLocal] = useState<string>("")
  const nameTest = "Imitation de positions de la Nepsy 2"
  const imitationsNEPSY2 = allTests.find(test => test.nom === nameTest)

  useEffect(()=> {
    if(!observationsDiverses) return
    setobservationsDiversesLocal(observationsDiverses)
  }, [observationsDiverses])

  useEffect(()=> {
    getImitationNepsy2Observations()
  }, [])

  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertImitationNepsy2ByKeyValueAction<string>(keyTest as keyof imitationpositionsnepsy2, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertImitationNepsy2ByKeyValueAction<string>(keyTest as keyof imitationpositionsnepsy2, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertImitationNepsy2ByKeyValueAction<string>(keyTest as keyof imitationpositionsnepsy2, "", bilanId ?? "")
  }

  const updateFunction = ()=> {
    updateImitationNepsy2(bilanId)
  }

  return (
    <Card className={`py-2 px-3.5 my-5 w-full`}>
      <p className='italic text-sm'>
        &#8227; <span className='font-bold'>Test {imitationsNEPSY2?.nom?? ""}</span> : {imitationsNEPSY2?.description ?? ` : ${imitationsNEPSY2?.description}.`}
      </p>
      <ImitationPosisitionNepsy2Table/>
      <CardContent className='p-2'>
        <h5 className='font-bold text-sm mb-2.5'>Observations :</h5>
        <ThemeObservationGenerics
          theme="Observations diverses"
          test={nameTest}
          stateLocal={observationsDiversesLocal}
          setStateLocal={setobservationsDiversesLocal}
          observationsTest={imitationNepsy2Observations}
          addToTestThemeAction={addToTestThemeAction}
          removeToTestThemeAction={removeToTestThemeAction}
          handleSetStateToNullAction={handleSetStateToNullAction}
          updateFunction={updateFunction}
          updateObservationsListe={getImitationNepsy2Observations}
          keyTest='observationsDiverses'
        />
      </CardContent>
    </Card>
  )
}

export default ImitationPosisitionNepsy2