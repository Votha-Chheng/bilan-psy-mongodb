import { ObservationDTO } from '@/@types/ObservationTestDTO'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { TestsNames } from '@/@types/TestTypes'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { planificationFigureREY } from '@/datas/planificationFigureRey'
import { inter } from '@/fonts/inter'
import { upsertListeObservationsByTestName } from '@/serverActions/observationActions'
import { Loader, Loader2, Trash2, Trash2Icon } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'

type ThemeObservationGenericsProps = {
  theme: string
  test: TestsNames
  stateLocal: string
  setStateLocal: Dispatch<SetStateAction<string>>
  observationsTest: ObservationDTO[] | null
  // eslint-disable-next-line
  addToTestThemeAction : (newLocalState: string, keyTest?:string)=> Promise<ServiceResponse<any>>
  // eslint-disable-next-line
  removeToTestThemeAction : (newLocalState: string, keyTest?:string)=> Promise<ServiceResponse<any>>
  // eslint-disable-next-line
  handleSetStateToNullAction: (keyTest?: string)=> Promise<ServiceResponse<any>>
  updateFunction: ()=> void
  updateObservationsListe: ()=> void
  keyTest?: string
}

const ThemeObservationGenerics: FC<ThemeObservationGenericsProps> = ({
  theme, 
  test, 
  stateLocal,
  observationsTest, 
  addToTestThemeAction, 
  removeToTestThemeAction,
  handleSetStateToNullAction, 
  updateFunction, 
  setStateLocal,
  updateObservationsListe,
  keyTest
}) => {
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  // eslint-disable-next-line
  const [stateObservations, setStateObservations] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isPendingObservation, setIsPendingObservation] = useState<string|null>(null)
  const [newObservation, setNewObservation] = useState<string>("")

  const observations: string[]|null = useMemo(()=> {
    if(!observationsTest || observationsTest.length === 0) return null
    const obs = observationsTest.find(observation => observation.theme === theme)
    if(obs) {
      return obs.listeObservations
    }
    return null
  }, [observationsTest])

  const handleAddObservation = async(theme: string, listeObservations: string[])=> {
    setIsPending(true)
    if(listeObservations.includes(newObservation)) {
      setIsPending(false)
      setState({success: false, message: "Cette observation existe déjà !"})
      return
    }
    const newState = [...listeObservations]
    newState.push(newObservation)
    const res = await upsertListeObservationsByTestName(test, theme, newState)
    // eslint-disable-next-line
    res.success && setNewObservation("")
    // eslint-disable-next-line
    res && setStateObservations(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const handleRemoveObservation = async(theme: string, listeObservations: string[], observationToRemove: string)=> {
    setIsPendingObservation(observationToRemove)
    const newState = listeObservations.filter(observation => observation !== observationToRemove)
    const res = await upsertListeObservationsByTestName(test, theme, newState) 
    // eslint-disable-next-line
    res.success && setNewObservation("")
    // eslint-disable-next-line
    res && setStateObservations(res)
    // eslint-disable-next-line
    res && setIsPendingObservation(null)
  }

  const addToTestTheme = async(observationToAdd: string)=> {
    if(observationToAdd === "" ){
      setState({success: false, message: "Ecrivez une observation avant de valider !"})
      return
    }
    setIsPending(true)
    const newStateLocal = `${stateLocal.trim()} ${observationToAdd.trim()}`
    const res = await addToTestThemeAction(newStateLocal, keyTest)
    // eslint-disable-next-line
    res.success && setStateLocal(newStateLocal)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const removeToTestTheme = async(observationToRemove: string)=> {
    setIsPending(true)
    const newStateLocal = `${stateLocal.replace(observationToRemove.trim(), "")}`
    const res = await removeToTestThemeAction(newStateLocal, keyTest)
    // eslint-disable-next-line
    res.success && setStateLocal(newStateLocal)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const handleSetStateToNull = async()=> {
    setIsPending(true)
    const res = await handleSetStateToNullAction(keyTest)
    // eslint-disable-next-line
    res.success && setStateLocal("")
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  useToast({state: stateObservations, updateFunction: updateObservationsListe})

  useToast({state, updateFunction})
  
  return (
    <Card className='flex flex-row mb-2.5' >
      <article className='w-1/3 border-r border-black pr-2'>
        <p className='text-sm ml-4 mb-2 flex items-center justify-between'>
          <span>&ndash; <span className='underline underline-offset-4 pr-2.5'>{theme}</span>
          : </span>{stateLocal.trim() !== "" && <Trash2Icon className='cursor-pointer hover:scale-110 text-red-600' size={17.5} onClick={()=> handleSetStateToNull()} />}
        </p>
        {
          stateLocal.trim() === ""
          ?
          <p className='italic text-red-700 text-sm px-2.5 my-1'>Sélectionner des observations pré-enregistrées.</p>
          :
          <p className={`${inter.className} text-sm px-3 my-1 tracking-wide italic leading-5`}>{stateLocal}</p>
        } 
      </article>
      <article className='w-2/3'>
        <div className='flex gap-x-7 gap-y-1 mb-2.5 pr-2 flex-wrap'>
          {
            ((test === "Epreuve visuoconstructive en deux dimensions (Figure de Rey B)") || (test === "Epreuve visuoconstructive en deux dimensions (Figure de Rey A)")) &&
            planificationFigureREY.map((plan, index)=> (
              <div 
                key={index} 
                className={`flex gap-x-2 items-center border p-1 rounded-md`} 
              >
                <Checkbox 
                  disabled={isPending}
                  id={`Type ${plan.type} ${plan.description}~~${theme}`}
                  className='cursor-pointer' 
                  checked={stateLocal.includes(`Type ${plan.type} ${plan.description}`.trim())} 
                  onClick={(event)=> {
                    const [obs, targetTheme] = event.currentTarget.id.split("~~");
                    if(targetTheme === theme){
                      if(stateLocal.includes(obs.trim())){
                        removeToTestTheme(obs.trim())
                      } else {
                        addToTestTheme(obs.trim())
                      }
                    }
                  }}
                />
                <label htmlFor={`Type ${plan.type} ${plan.description}~~${theme}`} className='text-sm italic cursor-pointer'>Type {plan.type} {plan.description}</label>
                <div >
                  {
                    isPendingObservation === `Type ${plan.type} ${plan.description}`
                    ?
                    <Loader2 className='animate-spin' />
                    :
                    <Trash2 size={15} className={`text-red-700 cursor-pointer hover:scale-125 `} onClick={()=> handleRemoveObservation(theme, observations ?? [], `Type ${plan.type} ${plan.description}`)}/>
                  }
                </div>
              </div>

            ))
          }
          {
            observations && observations.length>0 
            ?
            observations.map((obs: string, index: number)=> (
            <div 
              key={index} 
              className={`flex gap-x-2 items-center border p-1 rounded-md`} 
            >
              <Checkbox 
                disabled={isPending}
                id={`${obs}~~${theme}`}
                className='cursor-pointer' 
                checked={stateLocal.includes(obs.trim())} 
                onClick={(event)=> {
                  const [obs, targetTheme] = event.currentTarget.id.split("~~");
                  if(targetTheme === theme){
                    if(stateLocal.includes(obs.trim())){
                      removeToTestTheme(obs.trim())
                    } else {
                      addToTestTheme(obs.trim())
                    }
                  }
                }}
              />
              <label htmlFor={`${obs}~~${theme}`} className='text-sm italic cursor-pointer'>{obs}</label>
              <div >
                {
                  isPendingObservation === obs
                  ?
                  <Loader2 className='animate-spin' />
                  :
                  <Trash2 size={15} className={`text-red-700 cursor-pointer hover:scale-125 `} onClick={()=> handleRemoveObservation(theme, observations ?? [], obs)} />
                }
              </div>
            </div>
            ))
            :
            test === "Epreuve visuoconstructive en deux dimensions (Figure de Rey B)" || test === "Epreuve visuoconstructive en deux dimensions (Figure de Rey A)"
            ? null 
            : <p className='text-red-700 italic text-sm font-bold'>Aucune observation pré-enregistrée !</p>
          }
        </div>
        <div className='text-sm flex gap-x-2'>
          <Button className='bg-blue-500' onClick={()=> handleAddObservation(theme, observations ?? [])}>
            { isPending ? <Loader className='animate-spin'/> : "Ajouter une autre observation"}
          </Button>
          <Input 
            className='mr-2.5'
            type='text' 
            placeholder='Ecrivez une nouvelle observation...' 
            value={newObservation}
            onChange={(event)=> setNewObservation(event.currentTarget.value)}  
            onKeyDown={(event)=> event.key === "Enter" && handleAddObservation(theme, observations ?? [])}
          />
        </div>
      </article>
    </Card>
  )
}

export default ThemeObservationGenerics
