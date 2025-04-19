import { ServiceResponse } from '@/@types/ServiceResponse'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import React, { FC, Ref, useEffect, useState } from 'react'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { Database, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddCommentaireOuObservations from '../AddComentaireOuObservations'


const AttentionCard: FC = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {attention} = anamneseResults ?? {}

  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [attentionLocal, setAttentionLocal] = useState<string[]>(["", ""])   //<----- [attentif, observations]

  const handleChangeState = async(value: string)=> {
    setIsPending(true)
    const res = await upsertAnamneseByKeyValueAction("attention", JSON.stringify([value, attentionLocal[1]]), patientId)
    res && setState(res)
    res && setIsPending(false)
  }

  useEffect(()=> {
    if(!attention) return
    setAttentionLocal(attention)
  }, [attention])

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }

  useToast({state, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Sphère attentionnelle (observations)"} 
        searchKeys={["attention"]}
        indexDataToRetrieve={0}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Sphère attentionnelle</span> : </div> 
        <Select disabled={isPending} value={attentionLocal[0]} onValueChange={(value)=> handleChangeState(value)}>
          <SelectTrigger className="w-[230px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="attentif">attentif</SelectItem>
            <SelectItem value="inattentif">inattentif</SelectItem>
          </SelectContent>
        </Select>
        {
          isPending && <Loader2 className='animate-spin' />
        }
      </div>
      <AddCommentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={attention?.[1]}
        commentaireObservationFromLocal={attentionLocal[1]}
        completeArrayStateLocal={attentionLocal}
        keyAnamnese='attention'
        setCompleteArrayStateLocal={setAttentionLocal}
        stateIfCommentObsIsNull={[attentionLocal[0], ""]}
        commentObsIndex={1}
        label='observation'
        themeTitle='Sphère attentionnelle'
      />
       <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème "Sphère attentionnelle"
      </Button>
    </Card>
  )
}

export default AttentionCard
