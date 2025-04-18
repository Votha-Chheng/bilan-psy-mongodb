import HiddenAnamneseForm from '@/components/forms/anamnese/HiddenAnamneseForm'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Database, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, Ref, useActionState, useEffect, useMemo, useRef, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { AnamneseResults } from '@/@types/Anamnese'


const CartableBureauCard:FC = () => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {cartableBureau} = anamneseResults ?? {}

  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelect, setIsPendingSelect] = useState<boolean>(false)
  const [isDifficult, setIsDifficult] = useState<boolean>(false)
  const [cartableBureauLocal, setCartableBureauLocal] = useState<string[]>(["", ""])    //<---- [type de difficulté, commentaires]

  const setDifficulteEmptyyRef = useRef<HTMLFormElement>(null)
  
  useEffect(()=> {
    if(!cartableBureau) return
    if(Boolean(cartableBureau[0])){
      setIsDifficult(true)
    }
    setCartableBureauLocal(cartableBureau)
    
  }, [cartableBureau])

  const handleChangeIsDifficult = async(): Promise<void>=> {
    if(isDifficult && Boolean(cartableBureau?.[0])) {
      setIsPendingSelect(true)
      const  res = await upsertAnamneseByKeyValueAction("cartableBureau", JSON.stringify(["", cartableBureauLocal[1]]), patientId)
      res && setStateSelect(res)
      res && setIsPendingSelect(false)
    }
    setIsDifficult(prev=> !prev)
  }

  const handleChangeState = async(value: string, index: number)=> {
    const newState = [...cartableBureauLocal]
    newState[index] = value
    setIsPendingSelect(true)
    const  res = await upsertAnamneseByKeyValueAction("cartableBureau", JSON.stringify(newState), patientId)
    res && setStateSelect(res)
    res && setIsPendingSelect(false)
  }

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }
  useToast({state, updateFunction})
  useToast({state: stateSelect, updateFunction})

  return (
    <Card className='mb-5 gap-y-3'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Écriture (observations)"} 
        searchKeys={["ecriture"]}
        indexDataToRetrieve={1}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Organisation du cartable et du bureau</span> : </div> 
        <div className={`flex items-center gap-2.5 font-bold`}>
          <p className={`${openSans.className} italic flex items-center gap-2.5 border-1 p-2 rounded-md font-bold ${!isDifficult ? " border-transparent opacity-30" :" border-green-600"}`}>
            Présence de difficultés 
          </p>
          <Switch checked={isDifficult} onClick={()=> handleChangeIsDifficult()} />
        </div>
        {
          isDifficult &&
          <>
            |
            <p className='font-bold'>Type(s) de difficulté : </p>
            <Select disabled={isPendingSelect} value={cartableBureauLocal[0]} onValueChange={(value)=> handleChangeState(value, 0)}>
              <SelectTrigger className="w-[230px]">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="d’organisation">d’organisation</SelectItem>
                <SelectItem value="d’oubli">d’oublis</SelectItem>
                <SelectItem value="d’organisation et d’oublis">d’organisation et d’oublis</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
        {isPendingSelect && <Loader2 className='animate-spin' />}
        
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={cartableBureau?.[1]}
        commentaireObservationFromLocal={cartableBureauLocal[1]}
        completeArrayStateLocal={cartableBureauLocal}
        keyAnamnese='cartableBureau'
        setCompleteArrayStateLocal={setCartableBureauLocal}
        stateIfCommentObsIsNull={[cartableBureauLocal[0], ""]}
        commentObsIndex={1}
        label='observation'
        themeTitle='Organisation du cartable et du bureau'
      />
      <form ref={setDifficulteEmptyyRef} action={formAction}>
        <HiddenAnamneseForm keyAnamnese='cartableBureau' value={JSON.stringify(["", cartableBureauLocal[1]])} />
      </form>
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les commentaires dans la base de données pour le thème "Organisation du cartable et du bureau"
      </Button>
    </Card>
  )
}

export default CartableBureauCard