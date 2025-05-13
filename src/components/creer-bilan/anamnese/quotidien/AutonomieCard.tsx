import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { openSans } from '@/fonts/openSans'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Database, List, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { Button } from '@/components/ui/button'
import ManageAutonomieDescriptionsDialog from '@/components/sharedUI/alertsAndDialogs/ManageAutonomieDescriptionsDialog'
import { useToast } from '@/customHooks/useToast'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'

const AutonomieCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, getAnamneseResultsByPatientId, autonomieDescription, getAutonomieDescriptionsListe} = useAnamneseSearchDBStore()
  const {autonomie} = anamneseResults ?? {}
  const {descriptionsListe} = autonomieDescription ?? {}
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [autonomieLocal, setAutonomieLocal] = useState<string[]>(["", ""])   //<----- [autonomie, observations]
  const [openManagementAutonomieDialog, setOpenManagementAutonomieDialog] = useState<boolean>(false) 
  const [openAnamneseDBDialog, setOpenAnamneseDBDialog] = useState<boolean>(false) 

  useEffect(()=> {
    getAutonomieDescriptionsListe()
    
  }, [])

  useEffect(()=> {
    if(!autonomie) return
    setAutonomieLocal(autonomie)
  }, [autonomie])

  const handleChangeState = async(value: string)=> {
    setIsPending(true)
    const newState = [...autonomieLocal]
    newState[0] = value
    const res = await upsertAnamneseByKeyValueAction("autonomie", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setAutonomieLocal(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    getAnamneseResultsByPatientId(patientId)
  }
  useToast({state, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openAnamneseDBDialog}
        setOpen={setOpenAnamneseDBDialog}
        dialogTitle={`Données enregistrées précédemment concernant le thème "sommeil" :`}
        searchKeys={["sommeilQuotidien"]}
        indexDataToRetrieve={0}
      />
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
          <List/> Gérer les descriptions pour l’autonomie
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
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenManagementAutonomieDialog(true)}>
        <Database/> Voir les descriptions dans la base de données pour le thème &quot;autonomie&quot;
      </Button>
    </Card>
  )
}

export default AutonomieCard
