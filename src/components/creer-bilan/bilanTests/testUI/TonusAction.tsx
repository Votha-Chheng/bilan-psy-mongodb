import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useObservationStore } from '@/stores/observationStore'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { upsertBilanByKeyValueAction } from '@/serverActions/bilanActions'
import { useParams } from 'next/navigation'

const TonusAction = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {tonus, updateBilanByPatientId} = useBilanTestsStore()
  const {tonusObservations, getTonusObservations} = useObservationStore()

  const [tonusActionLocal, setTonusActionLocal] = useState<string>("")

  useEffect(()=> {
    getTonusObservations()
  }, [])

  useEffect(()=> {
    if(!tonus) return
    setTonusActionLocal(tonus)
  }, [tonus])

  const addToTestThemeAction = async (newStateLocal: string): Promise<ServiceResponse<any>> => {
    return await upsertBilanByKeyValueAction<string>("tonus", newStateLocal.trim(), patientId ?? "")
  }

  const removeToTestThemeAction = async (newStateLocal: string): Promise<ServiceResponse<any>> => {
    return await upsertBilanByKeyValueAction<string>("tonus", newStateLocal.trim(), patientId ?? "")
  }

  const setValueToNull = async (): Promise<ServiceResponse<any>> => {
    return await upsertBilanByKeyValueAction<string>("tonus", "", patientId ?? "")
  }

  const updateFunction = ()=> {
    updateBilanByPatientId(patientId)
  }

  return (
    <ThemeObservationGenerics
      theme="Tonus d'action"
      test="Tonus d'action"
      stateLocal={tonusActionLocal}
      setStateLocal={setTonusActionLocal}
      observationsTest={tonusObservations}
      addToTestThemeAction={addToTestThemeAction}
      removeToTestThemeAction={removeToTestThemeAction}
      handleSetStateToNullAction={setValueToNull}
      updateFunction={updateFunction}
      updateObservationsListe={getTonusObservations}
    />
  )
}

export default TonusAction
