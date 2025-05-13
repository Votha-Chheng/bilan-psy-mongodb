import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import FigureReyBTable from './tables/FigureReyBTable'
import { allTests } from '@/datas/listeTests'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useObservationStore } from '@/stores/observationStore'
import { upsertFigureReyBByKeyValueAction } from '@/serverActions/testsActions/figureReyBActions'
import { FiguresReyBResultsDTO } from '@/@types/BilanTests'

const FigureReyB = () => {
  const {figuresreyb, updateFiguresReyb, bilanId} = useBilanTestsStore()
  const {observationsFigureB} = figuresreyb ?? {}
  const {getFigureReyBObservations, figurereybObservations} = useObservationStore()     

  const [observationsLocal, setObservationsLocal] = useState<string>("")

  useEffect(()=> {
    if(!observationsFigureB) return
    setObservationsLocal(observationsFigureB)
  }, [observationsFigureB])

  useEffect(()=> {
    getFigureReyBObservations()
  }, [])
  
  const testName = "Epreuve visuoconstructive en deux dimensions (Figure de Rey B)"
  const figureReyBTest = allTests.find(test => test.nom===testName)

  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertFigureReyBByKeyValueAction<string>(keyTest as keyof FiguresReyBResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertFigureReyBByKeyValueAction<string>(keyTest as keyof FiguresReyBResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertFigureReyBByKeyValueAction<string>(keyTest as keyof FiguresReyBResultsDTO, "", bilanId ?? "")
  }

  return (
    <Card className={`py-2 px-3.5 my-5 w-full gap-y-0`}>
      <p className='italic text-sm mb-5'>
        &#8227; <span className='font-bold'>{figureReyBTest?.nom?? ""}</span> : {figureReyBTest?.description ?? ` : ${figureReyBTest?.description}.`}
      </p>
      <FigureReyBTable/>
      <ThemeObservationGenerics
        theme="Observations (figure de Rey B)" 
        test={testName} 
        stateLocal={observationsLocal}
        setStateLocal={setObservationsLocal}
        observationsTest={figurereybObservations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={()=> updateFiguresReyb(bilanId)} 
        updateObservationsListe={getFigureReyBObservations}
        keyTest='observationsFigureB'
      />
    </Card>
  )
}

export default FigureReyB
