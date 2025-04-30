import { Card } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import React, { useEffect, useState } from 'react'
import VisuomotriceNepsy2Table from './tables/VisuomotriceNepsy2Table'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useObservationStore } from '@/stores/observationStore'
import { upsertVisuomotriceNepsy2ByKeyValueAction } from '@/serverActions/testsActions/visuomotriceNepsy2Actions'
import { visuomotricenepsy2 } from '@prisma/client'

const VisuomotriceNepsy2 = () => {
  const {visuomotricenepsy2, updatevisuomotricenepsy2, bilanId} = useBilanTestsStore()
  const {vitesse, tenueCrayon, comportement, tonus} = visuomotricenepsy2 ?? {}
  const {visuomotriceNepsy2Observations, getVisuomotriceNepsy2Observations} = useObservationStore()

  const [vitesseLocal, setVitesseLocal] = useState<string>("")
  const [tenueCrayonLocal, setTenueCrayonLocal] = useState<string>("")
  const [comportementLocal, setComportementLocal] = useState<string>("")
  const [tonusLocal, setTonusLocal] = useState<string>("")

  const visuomotriceNepsy2Test = allTests.find(test => test.nom==="Epreuve visuomotrice de la Nepsy 2")
  
  useEffect(()=> {
    getVisuomotriceNepsy2Observations()
  }, [])

  useEffect(()=> {
    if(!visuomotricenepsy2) return
    setVitesseLocal(vitesse ?? "")
    setTenueCrayonLocal(tenueCrayon ?? "")
    setComportementLocal(comportement ?? "")
    setTonusLocal(tonus ?? "")
  }, [visuomotricenepsy2])

  const updateFunction = ()=> {
    updatevisuomotricenepsy2(bilanId)
  }

  const updateObservationsListe = ()=> {
    getVisuomotriceNepsy2Observations()
  }

  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertVisuomotriceNepsy2ByKeyValueAction<string>(keyTest as keyof visuomotricenepsy2, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertVisuomotriceNepsy2ByKeyValueAction<string>(keyTest as keyof visuomotricenepsy2, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertVisuomotriceNepsy2ByKeyValueAction<string>(keyTest as keyof visuomotricenepsy2, "", bilanId ?? "")
  }
  
  return (
    <Card className={`py-2 px-3.5 my-5 w-full` }>
      <p className='italic text-sm mb-5'>&#8227; 
        <span className='font-bold'>Test {visuomotriceNepsy2Test?.nom?? ""}</span> : {visuomotriceNepsy2Test?.description ?? ` : ${visuomotriceNepsy2Test?.description}`}.
      </p>
      <VisuomotriceNepsy2Table/>
      <ThemeObservationGenerics
        theme="Vitesse"
        test="Epreuve visuomotrice de la Nepsy 2"
        stateLocal={vitesseLocal}
        setStateLocal={setVitesseLocal}
        observationsTest={visuomotriceNepsy2Observations}
        updateFunction={updateFunction} 
        updateObservationsListe={updateObservationsListe}
        keyTest='vitesse'
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
      />
      <ThemeObservationGenerics
        theme="Tenue du crayon"
        test="Epreuve visuomotrice de la Nepsy 2"
        stateLocal={tenueCrayonLocal}
        setStateLocal={setTenueCrayonLocal}
        observationsTest={visuomotriceNepsy2Observations}
        updateFunction={updateFunction} 
        updateObservationsListe={updateObservationsListe}
        keyTest='tenueCrayon'
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
      />
      <ThemeObservationGenerics
        theme="Comportement"
        test="Epreuve visuomotrice de la Nepsy 2"
        stateLocal={comportementLocal}
        setStateLocal={setComportementLocal}
        observationsTest={visuomotriceNepsy2Observations}
        updateFunction={updateFunction} 
        updateObservationsListe={updateObservationsListe}
        keyTest='comportement'
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
      />
      <ThemeObservationGenerics
        theme="Tonus"
        test="Epreuve visuomotrice de la Nepsy 2"
        stateLocal={tonusLocal}
        setStateLocal={setTonusLocal}
        observationsTest={visuomotriceNepsy2Observations}
        updateFunction={updateFunction} 
        updateObservationsListe={updateObservationsListe}
        keyTest='tonus'
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
      />
    </Card>
  )
}

export default VisuomotriceNepsy2