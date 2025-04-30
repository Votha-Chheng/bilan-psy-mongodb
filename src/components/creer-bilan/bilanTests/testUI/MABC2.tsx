import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card, CardContent } from '@/components/ui/card'
import { allTests } from '@/datas/listeTests'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import React, { useEffect, useState } from 'react'
import MABCTable from './tables/MABCTable'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {mabc2} from '@prisma/client'
import { upsertMABC2ByKeyValueAction } from '@/serverActions/testsActions/mabc2Actions'
import { Loader2 } from 'lucide-react'
import { useObservationStore } from '@/stores/observationStore'
import { useToast } from '@/customHooks/useToast'
import ThemeObservationGenerics from '../ThemeObservationGenerics'

const MABC2 = () => {
  const {mabc2, updatemabc2, bilanId} = useBilanTestsStore()
  const {getMABC2Observations, mabc2Observations} = useObservationStore()
  const {competencesMotrices, precisionUnimanuelle, coordinationsBimanuelles, coordinationsGlobalesRattrapes, precisionVisuoMotrice, coordinationsGlobalesLancers, motriciteGlobaleUnipodal, motriciteGlobaleDynamique, motriciteGlobaleSauts} = mabc2 ?? {}

  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const [competencesMotricesLocal, setCompetencesMotricesLocal] = useState<string>("")
  const [precisionUnimanuelleLocal, setPrecisionUnimanuelleLocal] = useState<string>("")
  const [coordinationsBimanuellesLocal, setCoordinationsBimanuellesLocal] = useState<string>("")
  const [precisionVisuoMotriceLocal, setPrecisionVisuoMotriceLocal] = useState<string>("")
  const [coordinationsGlobalesRattrapesLocal, setCoordinationsGlobalesRattrapesLocal] = useState<string>("")
  const [coordinationsGlobalesLancersLocal, setCoordinationsGlobalesLancersLocal] = useState<string>("")
  const [motriciteGlobaleUnipodalLocal, setMotriciteGlobaleUnipodalLocal] = useState<string>("")
  const [motriciteGlobaleDynamiqueLocal, setMotriciteGlobaleDynamiqueLocal] = useState<string>("")
  const [motriciteGlobaleSautsLocal, setMotriciteGlobaleSautsLocal] = useState<string>("")
  const [observationsComplementairesLocal, setObservationsComplementairesLocal] = useState<string>("")
  const mabc2Test = allTests.find(test => test.nom==="M-ABC2")

  useEffect(()=> {
    getMABC2Observations()
  }, [])

  useEffect(()=> {
    if(!mabc2) return
    setCompetencesMotricesLocal(competencesMotrices ?? "")
    setPrecisionUnimanuelleLocal(precisionUnimanuelle ?? "")
    setCoordinationsBimanuellesLocal(coordinationsBimanuelles ?? "")
    setPrecisionVisuoMotriceLocal(precisionVisuoMotrice ?? "")
    setCoordinationsGlobalesRattrapesLocal(coordinationsGlobalesRattrapes ?? "")
    setCoordinationsGlobalesLancersLocal(coordinationsGlobalesLancers ?? "")
    setMotriciteGlobaleUnipodalLocal(motriciteGlobaleUnipodal?? "")
    setMotriciteGlobaleDynamiqueLocal(motriciteGlobaleDynamique ?? "")
    setMotriciteGlobaleSautsLocal(motriciteGlobaleSauts ?? "")
    setObservationsComplementairesLocal(observationsComplementairesLocal ?? "")
  }, [mabc2])

  const handleChangeMABC2Action = async(key: keyof mabc2, value: string): Promise<void>=> {
    setIsPending(true)
    const res = await upsertMABC2ByKeyValueAction(key, value, bilanId ?? null)
    res && setState(res)
    res && setIsPending(false)
  }

  const addToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertMABC2ByKeyValueAction<string>(keyTest as keyof mabc2, newStateLocal.trim(), bilanId ?? "")
  }

  const removeToTestThemeAction = async(newStateLocal: string, keyTest?: string)=> {
    return await upsertMABC2ByKeyValueAction<string>(keyTest as keyof mabc2, newStateLocal.trim(), bilanId ?? "")
  }

  const handleSetStateToNullAction = async(keyTest?: string)=> {
    return await upsertMABC2ByKeyValueAction<string>(keyTest as keyof mabc2, "", bilanId ?? "")
  }

  const updateObservationsListe = ()=> {
    getMABC2Observations()
  }
  const updateFunction = ()=> {
    updatemabc2(bilanId)
  }
  useToast({state, updateFunction})

  return (
    <Card className={`py-2 px-3.5 my-5 w-full` }>
      <p className='italic text-sm mb-5'>&#8227; <span className='font-bold'>Test {mabc2Test?.nom?? ""}</span> : {mabc2Test?.description ?? ` : ${mabc2Test?.description}`}.</p>
      <MABCTable/>
      <CardContent className='p-2'>
        <h5 className='font-bold text-sm mb-2.5'>Observations :</h5>
        <ul className='ml-5 flex flex-col gap-y-2.5'>
          <Card className='text-sm flex flex-row items-center gap-x-2 mb-2 px-4 py-2'>
            &ndash; <span className='underline underline-offset-4'>Les compétences motrices</span> sont 
            <Select disabled={isPending} onValueChange={(value)=>handleChangeMABC2Action("competencesMotrices", value)} value={competencesMotricesLocal}>
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"hétérogènes"}>hétérogènes</SelectItem>
                <SelectItem value={"homogènes"}>homogènes</SelectItem>
              </SelectContent>
            </Select>
            .
            {isPending && <Loader2 className='animate-spin'/>}
          </Card>
          <ThemeObservationGenerics
            theme="Précision unimanuelle"
            test="M-ABC2"
            stateLocal={precisionUnimanuelleLocal}
            setStateLocal={setPrecisionUnimanuelleLocal}
            observationsTest={mabc2Observations}
            addToTestThemeAction={addToTestThemeAction}
            removeToTestThemeAction={removeToTestThemeAction}
            handleSetStateToNullAction={handleSetStateToNullAction}
            updateFunction={updateFunction} 
            updateObservationsListe={updateObservationsListe}
            keyTest='precisionUnimanuelle'
          />
          <ThemeObservationGenerics
            theme="Coordinations bimanuelles"
            test="M-ABC2"
            stateLocal={coordinationsBimanuellesLocal}
            setStateLocal={setCoordinationsBimanuellesLocal}
            observationsTest={mabc2Observations}
            addToTestThemeAction={addToTestThemeAction}
            removeToTestThemeAction={removeToTestThemeAction}
            handleSetStateToNullAction={handleSetStateToNullAction}
            updateFunction={updateFunction} 
            updateObservationsListe={updateObservationsListe}
            keyTest='coordinationsBimanuelles'
          />
          <ThemeObservationGenerics
            theme="Précision visuomotrice"
            test="M-ABC2"
            stateLocal={precisionVisuoMotriceLocal}
            setStateLocal={setPrecisionVisuoMotriceLocal}
            observationsTest={mabc2Observations}
            addToTestThemeAction={addToTestThemeAction}
            removeToTestThemeAction={removeToTestThemeAction}
            handleSetStateToNullAction={handleSetStateToNullAction}
            updateFunction={updateFunction} 
            updateObservationsListe={updateObservationsListe}
            keyTest='precisionVisuoMotrice'
          />

          <Card className='px-2'>
            <p className='pl-2'>&bull; <span className='font-bold underline underline-offset-2'>Coordinations globales</span></p>
            <ThemeObservationGenerics
              theme="Coordinations globales rattrapées" 
              test="M-ABC2"
              observationsTest={mabc2Observations}
              addToTestThemeAction={addToTestThemeAction}
              removeToTestThemeAction={removeToTestThemeAction}
              handleSetStateToNullAction={handleSetStateToNullAction}
              stateLocal={coordinationsGlobalesRattrapesLocal} 
              setStateLocal={setCoordinationsGlobalesRattrapesLocal} 
              keyTest="coordinationsGlobalesRattrapes" 
              updateFunction={updateFunction} 
              updateObservationsListe={updateObservationsListe}
            />
            <ThemeObservationGenerics
              theme="Coordination globale lancers" 
              test="M-ABC2" 
              stateLocal={coordinationsGlobalesLancersLocal} 
              setStateLocal={setCoordinationsGlobalesLancersLocal} 
              addToTestThemeAction={addToTestThemeAction}
              removeToTestThemeAction={removeToTestThemeAction}
              handleSetStateToNullAction={handleSetStateToNullAction}
              keyTest="coordinationsGlobalesLancers" 
              updateFunction={updateFunction} 
              updateObservationsListe={updateObservationsListe}
              observationsTest={mabc2Observations}
            />
          </Card>
          <Card className='px-2'>
            <p className='pl-2'>&bull; <span className='font-bold underline underline-offset-2'>Motricité globale</span></p>
            <ThemeObservationGenerics
              theme="Équilibre unipodal" 
              test="M-ABC2" 
              stateLocal={motriciteGlobaleUnipodalLocal} 
              setStateLocal={setMotriciteGlobaleUnipodalLocal} 
              addToTestThemeAction={addToTestThemeAction}
              removeToTestThemeAction={removeToTestThemeAction}
              handleSetStateToNullAction={handleSetStateToNullAction}
              keyTest="motriciteGlobaleUnipodal" 
              updateFunction={updateFunction} 
              updateObservationsListe={updateObservationsListe}
              observationsTest={mabc2Observations}
            />
            <ThemeObservationGenerics
              theme="Équilibre dynamique" 
              test="M-ABC2" 
              stateLocal={motriciteGlobaleDynamiqueLocal} 
              setStateLocal={setMotriciteGlobaleDynamiqueLocal} 
              addToTestThemeAction={addToTestThemeAction}
              removeToTestThemeAction={removeToTestThemeAction}
              handleSetStateToNullAction={handleSetStateToNullAction}
              keyTest="motriciteGlobaleDynamique" 
              updateFunction={updateFunction} 
              updateObservationsListe={updateObservationsListe}
              observationsTest={mabc2Observations}
            />
            <ThemeObservationGenerics
              theme="Sauts" 
              test="M-ABC2" 
              stateLocal={motriciteGlobaleSautsLocal} 
              setStateLocal={setMotriciteGlobaleSautsLocal} 
              addToTestThemeAction={addToTestThemeAction}
              removeToTestThemeAction={removeToTestThemeAction}
              handleSetStateToNullAction={handleSetStateToNullAction}
              keyTest="motriciteGlobaleSauts" 
              updateFunction={updateFunction} 
              updateObservationsListe={updateObservationsListe}
              observationsTest={mabc2Observations}
            />
          </Card>
          <ThemeObservationGenerics
            theme="Observations complémentaires" 
            test="M-ABC2" 
            stateLocal={observationsComplementairesLocal} 
            setStateLocal={setObservationsComplementairesLocal} 
            addToTestThemeAction={addToTestThemeAction}
            removeToTestThemeAction={removeToTestThemeAction}
            handleSetStateToNullAction={handleSetStateToNullAction}
            keyTest="observationsComplementaires" 
            updateFunction={updateFunction} 
            updateObservationsListe={updateObservationsListe}
            observationsTest={mabc2Observations}
          />
        </ul>
      </CardContent>
    </Card>
  )
}

export default MABC2
