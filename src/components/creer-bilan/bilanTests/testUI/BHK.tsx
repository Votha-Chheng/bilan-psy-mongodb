import { Card } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import React, { useEffect, useState } from 'react'
import BHKTable from './tables/BHKTable'
import ThemeObservationGenerics from '../ThemeObservationGenerics'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useObservationStore } from '@/stores/observationStore'
import { upsertBHKResultsAction } from '@/serverActions/testsActions/bhkActions'
import OutilScripteurCard from '../OutilScripteurCard'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { BHKResultsDTO } from '@/@types/BilanTests'

const BHK = () => {

  const {bhk, updatebhk, bilanId} = useBilanTestsStore()
  const {lecture, memorisation, comportement, ecriture, ressenti, autres} = bhk ?? {}
  const {bhkObservations, getBHKObservations} = useObservationStore()
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<string|null>(null)

  const [lectureLocal, setLectureLocal] = useState<string>("")
  const [memorisationLocal, setMemorisationLocal] = useState<string>("")
  const [comportementLocal, setComportementLocal] = useState<string>("")
  const [ecritureLocal, setEcritureLocal] = useState<string>("")
  const [ressentiLocal, setRessentiLocal] = useState<string>("")
  const [autresLocal, setAutresLocal] = useState<string>("")

  const nameTest = "BHK (épreuve d'écriture)"
  const bhkTest = allTests.find(test => test.nom === nameTest)

  useEffect(()=> {
    getBHKObservations()
  }, [])

  useEffect(()=> {
    if(!bhk) return
    setLectureLocal(lecture ?? "")
    setMemorisationLocal(memorisation ?? "")
    setComportementLocal(comportement ?? "")
    setEcritureLocal(ecriture ?? "")
    setRessentiLocal(ressenti ?? "")
    setAutresLocal(autres ?? "")
  }, [bhk])

  const updateFunction = ()=> {
    updatebhk(bilanId)
  }

  const updateObservationsListe = ()=> {
    getBHKObservations()
  }
  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertBHKResultsAction<string>(keyTest as keyof BHKResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertBHKResultsAction<string>(keyTest as keyof BHKResultsDTO, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertBHKResultsAction<string>(keyTest as keyof BHKResultsDTO, "", bilanId ?? "")
  }

  const handleChangeValue = async(value: string, key: keyof BHKResultsDTO)=> {
    if(value===memorisation) return
    setIsPending(key)
    const res = await upsertBHKResultsAction(key, value, bilanId ?? "")
    if(res.success) {
      // eslint-disable-next-line
      key === "memorisation" && setMemorisationLocal(value)
      // eslint-disable-next-line
      key === "ressenti" && setRessentiLocal(value)
    }
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(null)
  }

  useToast({state, updateFunction})

  return (
    <Card className={`py-2 px-3.5 my-5 w-full gap-y-1`}>
      <p className='italic text-sm mb-3'>
        &#8227; <span className='font-bold'>Test {bhkTest?.nom?? ""}</span> : {bhkTest?.description ?? ` : ${bhkTest?.description}.`}
      </p>
      <BHKTable/>
      <h5 className='font-bold text-sm ml-2.5'>Observations :</h5>
      <ThemeObservationGenerics
        theme="Lecture"
        test={nameTest}
        stateLocal={lectureLocal}
        setStateLocal={setLectureLocal}
        observationsTest={bhkObservations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={updateFunction}
        updateObservationsListe={updateObservationsListe}
        keyTest='lecture'
      />
      <OutilScripteurCard/>
      <Card className='mb-2.5'>
        <div className='flex items-center gap-2'>
          <p className='text-sm ml-4 flex items-center'>
            <span>&ndash; <span className='underline underline-offset-4 pr-2.5'>Mémorisation</span> :</span>
          </p>
          <Input 
            disabled={isPending === "memorisation"}
            onBlur={()=> handleChangeValue(memorisationLocal, "memorisation")} 
            value={memorisationLocal} 
            onChange={(event)=> setMemorisationLocal(event.currentTarget.value)} 
            type='number' 
            className='w-16' 
          />
          <span className='text-sm'>mots avant de regarder le modèle.</span>
        </div>
      </Card>
      <ThemeObservationGenerics
        theme="Comportement"
        test={nameTest}
        stateLocal={comportementLocal}
        setStateLocal={setComportementLocal}
        observationsTest={bhkObservations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={updateFunction}
        updateObservationsListe={updateObservationsListe}
        keyTest='comportement'
      />
      <ThemeObservationGenerics
        theme="Observations de l'écriture"
        test={nameTest}
        stateLocal={ecritureLocal}
        setStateLocal={setEcritureLocal}
        observationsTest={bhkObservations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={updateFunction}
        updateObservationsListe={updateObservationsListe}
        keyTest='ecriture'
      />
      <Card className='mb-2.5'>
        <div className='flex items-center gap-2'>
          <p className='text-sm ml-4 flex items-center'>
            <span>&ndash; <span className='underline underline-offset-4'>Le ressenti</span> de l’enfant à propos de l’écriture est :</span>
          </p>
          <Select value={ressentiLocal} onValueChange={(value)=> handleChangeValue(value, "ressenti")} disabled={isPending==="ressenti"}>
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"positif"}>positif</SelectItem>
              <SelectItem value={"négatif"}>négatif</SelectItem>
            </SelectContent>
          </Select>
          .
          {isPending === "ressenti" && <Loader2 className='animate-spin' />}
        </div>
      </Card>
      <ThemeObservationGenerics
        theme="Autres remarques"
        test={nameTest}
        stateLocal={autresLocal}
        setStateLocal={setAutresLocal}
        observationsTest={bhkObservations}
        addToTestThemeAction={addToTestThemeAction}
        removeToTestThemeAction={removeToTestThemeAction}
        handleSetStateToNullAction={handleSetStateToNullAction}
        updateFunction={updateFunction}
        updateObservationsListe={updateObservationsListe}
        keyTest='autres'
      />
    </Card>
  )
}

export default BHK