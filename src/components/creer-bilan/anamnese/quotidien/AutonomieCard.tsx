import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { openSans } from '@/fonts/openSans'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { List, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { Button } from '@/components/ui/button'
import ManageAutonomieDescriptionsDialog from '@/components/sharedUI/alertsAndDialogs/ManageAutonomieDescriptionsDialog'
import { useToast } from '@/customHooks/useToast'

const AutonomieCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {autonomie} = anamneseResults ?? {}
  const {getAutonomieDescriptionsListe, autonomieDescription} = useAnamneseSearchDBStore()
  const {descriptionsListe} = autonomieDescription ?? {}

  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [autonomieLocal, setAutonomieLocal] = useState<string[]>(["", ""])   //<----- [autonomie, observations]
  const [openManagementAutonomieDialog, setOpenManagementAutonomieDialog] = useState<boolean>(false) 

  useEffect(()=> {
    getAutonomieDescriptionsListe()
    
  }, [])

  useEffect(()=> {
    if(!autonomie) return
    setAutonomieLocal(autonomie)
  }, [autonomie])

  const handleChangeState = async(value: string)=> {
    setIsPending(true)
    let newState = [...autonomieLocal]
    newState[0] = value
    const res = await upsertAnamneseByKeyValueAction("autonomie", JSON.stringify(newState), patientId)
    res && setAutonomieLocal(newState)
    res && setState(res)
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }
  useToast({state, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <ManageAutonomieDescriptionsDialog open={openManagementAutonomieDialog} setOpen={setOpenManagementAutonomieDialog} />
      <div className='flex gap-2.5 mb-3 items-center'>
        <div className='ml-7.5'>&bull; <span className='underline font-bold underline-offset-2'>Autonomie</span> : </div>
        <Select disabled={isPending} value={autonomieLocal[0]} onValueChange={(value: string)=> handleChangeState(value)}>
          <SelectTrigger className={`w-[600px] tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {
              descriptionsListe && descriptionsListe.length>0 && descriptionsListe.map((value, index)=> (
                <SelectItem className={`font-normal tracking-wide ${openSans.className}`} key={index} value={value}>{value}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        {isPending ? <Loader2 className='animate-spin'/> : <p className='w-6'></p>}
        |
        <Button className='w-fit' onClick={()=> setOpenManagementAutonomieDialog(true)}>
          <List/> Gérer les descriptions pour l'autonomie
        </Button>
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={autonomie?.[1]}
        commentaireObservationFromLocal={autonomieLocal[1]}
        completeArrayStateLocal={autonomieLocal}
        keyAnamnese='autonomie'
        setCompleteArrayStateLocal={setAutonomieLocal}
        stateIfCommentObsIsNull={[autonomieLocal[0], ""]}
        commentObsIndex={1}
        label='observation'
        themeTitle='Autonomie'
      />
    </Card>
  )
}

export default AutonomieCard
