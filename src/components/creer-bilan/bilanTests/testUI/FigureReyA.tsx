import { Card } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import React, { useEffect, useState } from 'react'
import FigureReyATable from './tables/FigureReyATable'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useObservationStore } from '@/stores/observationStore'
import { upsertFigureReyAByKeyValueAction } from '@/serverActions/testsActions/figureReyAActions'
import { FiguresReyAResultsDTO } from '@/@types/BilanTests'

const FigureReyA = () => {
  const {figuresreya, updateFiguresReya, bilanId} = useBilanTestsStore()
  const {observations} = figuresreya ?? {}
  const {figurereyaObservations, getFigureReyAObservations} = useObservationStore()

  const [observationsLocal, setObservationsLocal] = useState<string>("")

  const testName = "Epreuve visuoconstructive en deux dimensions (Figure de Rey A)"
  const figureReyATest = allTests.find(test => test.nom===testName)

  useEffect(()=> {
    if(!observations) return
    setObservationsLocal(observations)
  }, [observations])

  useEffect(()=> {
    getFigureReyAObservations()
  }, [])

  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertFigureReyAByKeyValueAction<string>(keyTest as keyof FiguresReyAResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertFigureReyAByKeyValueAction<string>(keyTest as keyof FiguresReyAResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertFigureReyAByKeyValueAction<string>(keyTest as keyof FiguresReyAResultsDTO, "", bilanId ?? "")
  }
  

  return (
    <Card className={`py-2 px-3.5 my-5 w-full gap-y-0`}>
      <p className='italic text-sm mb-5'>
        &#8227; <span className='font-bold'>{figureReyATest?.nom?? ""}</span> : {figureReyATest?.description ?? ` : ${figureReyATest?.description}.`}
      </p>
      <FigureReyATable/>
      <ThemeObservationGenerics
        theme="Observations" 
        test={testName} 
        stateLocal={observationsLocal}
        setStateLocal={setObservationsLocal}
        observationsTest={figurereyaObservations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={()=> updateFiguresReya(bilanId)} 
        updateObservationsListe={getFigureReyAObservations}
        keyTest='observations'
      />
    </Card>
  )
}

export default FigureReyA
