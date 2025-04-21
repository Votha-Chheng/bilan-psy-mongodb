import { AnamneseResults } from '@/@types/Anamnese'
import { ServiceResponse } from '@/@types/ServiceResponse'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import {  Database, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import AddCommentaireOuObservations from '../AddComentaireOuObservations'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

type MotriciteGlobaleFineCardProps = {
  globaleFineState: string[]|null|undefined
  keyLabel: keyof AnamneseResults
  title: string
}

const MotriciteGlobaleFineCard:FC<MotriciteGlobaleFineCardProps> = ({globaleFineState, keyLabel, title}) => {
  const {id: patientId} = useParams<{id: string}>()
  const {getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 

  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelect, setIsPendingSelect] = useState<boolean>(false)
  const [motriciteLocal, setMotriciteLocal] = useState<string[]>(["", ""])

  useEffect(()=> {
    if(!globaleFineState) return
    setMotriciteLocal(globaleFineState)
  }, [globaleFineState])


  const handleChangeMotriciteLocal = async(value: string, index: number)=> {
    setIsPendingSelect(true)
    let newState = [...motriciteLocal]
    newState[index] = value
    const res = await upsertAnamneseByKeyValueAction(keyLabel, JSON.stringify(newState), patientId)
    res && setStateSelect(res)
    res && setIsPendingSelect(false)
  }

  const updateFunction = ()=> {
    getAnamneseResultsByPatientId(patientId)
  }
  useToast({state: stateSelect, updateFunction})

  return (
    <Card className='mb-5'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={title + " (observations)"} 
        searchKeys={[keyLabel]}
        indexDataToRetrieve={1}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>{title}</span> : </div> 
        <Select disabled={isPendingSelect} value={motriciteLocal[0]} onValueChange={(value)=> handleChangeMotriciteLocal(value, 0)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficultés/Aisance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="des diffultés">des diffultés</SelectItem>
            <SelectItem value="de l'aisance">de l'aisance</SelectItem>
          </SelectContent>
        </Select>
        {isPendingSelect && <Loader2 className='animate-spin' />}
      </div>
      <AddCommentaireOuObservations
        actionFunction={upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={globaleFineState?.[1]}
        commentaireObservationFromLocal={motriciteLocal[1]}
        completeArrayStateLocal={motriciteLocal}
        setCompleteArrayStateLocal={setMotriciteLocal}
        stateIfCommentObsIsNull={[motriciteLocal[0], ""]}
        commentObsIndex={1}
        keyAnamnese={keyLabel}
        label='observation'
        themeTitle={title}
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème "{title}"
      </Button>
    </Card>
  )
}

export default MotriciteGlobaleFineCard
