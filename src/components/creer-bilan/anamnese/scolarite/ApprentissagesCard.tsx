import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { useParams } from 'next/navigation'
import React, { FC, Ref, RefObject, useActionState, useEffect, useMemo, useRef, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { Button } from '@/components/ui/button'
import { Database, Loader2 } from 'lucide-react'
import { useToast } from '@/customHooks/useToast'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { AnamneseResults } from '@/@types/Anamnese'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

const ApprentissagesCard:FC= () => {
  const {id: patientId} = useParams<{id: string}>()
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [apprentissagesLocal, setApprentissagesLocal] = useState<string[]>(["", ""])                //<-- [niveau, remarques]

  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelect, setIsPendingSelect] = useState<boolean>(false)
  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {apprentissages} = anamneseResults ?? {}

  useEffect(()=> {
    if(!apprentissages) return
    setApprentissagesLocal(apprentissages)
    
  }, [apprentissages])

  const handleChangeState = async(value: string)=> {
    setIsPendingSelect(true)
    const newState = [...apprentissagesLocal]
    newState[0] = value
    const res = await upsertAnamneseByKeyValueAction("apprentissages", JSON.stringify(newState), patientId)
    res && setStateSelect(res)
    res && setIsPendingSelect(false)
  }

  const updateFunction = ()=> {
    getAnamneseResultsByPatientId(patientId)
  }

  useToast({state:stateSelect, updateFunction})

  return (
    <Card className='mb-5 gap-y-3'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Apprentissages (remrques)"} 
        searchKeys={["apprentissages"]}
        indexDataToRetrieve={1}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Apprentissages</span> : </div> 
        <Select disabled={isPendingSelect} value={apprentissagesLocal[0]} onValueChange={(value)=> handleChangeState(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="très bons">très bons</SelectItem>
            <SelectItem value="correctes">correctes</SelectItem>
            <SelectItem value="difficiles">difficiles</SelectItem>
          </SelectContent>
        </Select>
        {isPendingSelect && <Loader2 className='animate-spin'/>}
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={apprentissages?.[1]}
        commentaireObservationFromLocal={apprentissagesLocal[1]}
        completeArrayStateLocal={apprentissagesLocal}
        keyAnamnese='apprentissages'
        setCompleteArrayStateLocal={setApprentissagesLocal}
        stateIfCommentObsIsNull={[apprentissagesLocal[0], ""]}
        commentObsIndex={1}
        label='remarque'
        themeTitle='Apprentissages'
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème "Apprentissages"
      </Button>
    </Card>
  )
}

export default ApprentissagesCard