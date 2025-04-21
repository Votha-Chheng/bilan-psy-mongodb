import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { Dispatch, FC, SetStateAction, useActionState, useEffect, useRef, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { Button } from '@/components/ui/button'
import { Database, Loader2 } from 'lucide-react'
import HiddenAnamneseForm from '@/components/forms/anamnese/HiddenAnamneseForm'
import { useParams } from 'next/navigation'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useToast } from '@/customHooks/useToast'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { AnamneseResults } from '@/@types/Anamnese'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

const EcritureCard: FC = ({}) => {
  const {id: patientId} = useParams<{id: string}>()
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {ecriture} = anamneseResults ?? {}

  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelectFirst, setIsPendingSelectFirst] = useState<boolean>(false)
  const [isPendingSelectSecond, setIsPendingSelectSecond] = useState<boolean>(false)
  const [ecritureLocal, setEcritureLocal] = useState<string[]>(["", "", ""])    //<---- [niveau, douleurs, observations]

  useEffect(()=> {
    if(!ecriture) return
    setEcritureLocal(ecriture)
  }, [ecriture])

  const handleChangeState = async(value: string, index: number)=> {
    index === 0 ? setIsPendingSelectFirst(true) : setIsPendingSelectSecond(true)
    const newState = [...ecritureLocal]
    newState[index] = value
    const res = await upsertAnamneseByKeyValueAction("ecriture", JSON.stringify(newState), patientId)
    res.success && setStateSelect(res)
    if(res){
      setIsPendingSelectFirst(false)
      setIsPendingSelectSecond(false)
    }
  }

  const updateFunction = ()=> {
    getAnamneseResultsByPatientId(patientId)
  }
  useToast({state: stateSelect, updateFunction})

  return (
    <Card className='mb-5 gap-y-3'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Écriture (observations)"} 
        searchKeys={["ecriture"]}
        indexDataToRetrieve={2}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Écriture</span> : </div> 
        <Select disabled={isPendingSelectFirst} value={ecritureLocal[0]} onValueChange={(value)=> handleChangeState(value, 0)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rien à signaler">rien à signaler</SelectItem>
            <SelectItem value="lenteur notable">lenteur notable</SelectItem>
            <SelectItem value="qualité altérée">qualité altérée</SelectItem>
          </SelectContent>
        </Select>
        |
        <p className='font-bold'>Douleurs pendant l’écriture : </p>
        <Select disabled={isPendingSelectSecond} value={ecritureLocal[1]} onValueChange={(value)=> handleChangeState(value, 1)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oui">oui</SelectItem>
            <SelectItem value="non">non</SelectItem>
          </SelectContent>
        </Select>
        {(isPendingSelectFirst || isPendingSelectSecond) && <Loader2 className='animate-spin'/>}
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={ecriture?.[2]}
        commentaireObservationFromLocal={ecritureLocal[2]}
        completeArrayStateLocal={ecritureLocal}
        keyAnamnese='ecriture'
        setCompleteArrayStateLocal={setEcritureLocal}
        stateIfCommentObsIsNull={[ecritureLocal[0], ecritureLocal[1], ""]}
        commentObsIndex={2}
        label='observation'
        themeTitle='Écriture'
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les commentaires dans la base de données pour le thème "Écriture"
      </Button>
    </Card>
  )
}

export default EcritureCard