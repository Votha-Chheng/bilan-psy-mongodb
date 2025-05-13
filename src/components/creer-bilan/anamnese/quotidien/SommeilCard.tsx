import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { Database, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AddCommentaireOuObservations from '../AddComentaireOuObservations'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'

const SommeilCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {sommeilQuotidien} = anamneseResults ?? {}
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [sommeilLocal, setSommeilLocal] = useState<string[]>(["", "", ""]) //<---- [dort seul, pendormissement, observation]
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  useEffect(()=> {
    if(!sommeilQuotidien) return
    setSommeilLocal(sommeilQuotidien)
  }, [sommeilQuotidien])

  const handleChangeState = async(value: string, index: number)=> {
    setIsPending(true)
    const newState = [...sommeilLocal]
    newState[index] = value
    const res = await upsertAnamneseByKeyValueAction<string>("sommeilQuotidien", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setSommeilLocal(newState)
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
        open={openDialog}
        setOpen={setOpenDialog}
        dialogTitle={`Données enregistrées précédemment concernant le thème "sommeil" :`}
        searchKeys={["sommeilQuotidien"]}
        indexDataToRetrieve={0}
      />
      <div className='flex gap-2.5 mb-3 items-center'>
        <div className='ml-7.5'>&bull; <span className='underline font-bold underline-offset-2'>Sommeil</span> : </div>
        <Select disabled={isPending} value={sommeilLocal[0]} onValueChange={(value: string)=> handleChangeState(value, 0)}>
          <SelectTrigger className={`w-64 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
          <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="dort seul">dort seul</SelectItem>
          <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="ne dort pas seul">ne dort pas seul </SelectItem>
          </SelectContent>
        </Select>
        |
        <p className={`font-bold`}>Endormissement :</p>
        <Select disabled={isPending} value={sommeilLocal[1]} onValueChange={(value: string)=> handleChangeState(value, 1)}>
          <SelectTrigger className={`w-96 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
          <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="des difficultés d’endormissement">des difficultés d’endormissement</SelectItem>
          <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="pas de difficultés d’endormissement">pas de difficultés d’endormissement</SelectItem>
          </SelectContent>
        </Select>
        {isPending ? <Loader2 className='animate-spin'/> : <p className='w-6'></p>}
      </div>
      <AddCommentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={sommeilQuotidien?.[2]}
        commentaireObservationFromLocal={sommeilLocal[2]}
        completeArrayStateLocal={sommeilLocal}
        keyAnamnese='sommeilQuotidien'
        setCompleteArrayStateLocal={setSommeilLocal}
        stateIfCommentObsIsNull={[sommeilLocal[0], sommeilLocal[1], ""]}
        commentObsIndex={2}
        label='observation'
        themeTitle='Sommeil'
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDialog(true)}>
        <Database/> Voir les descriptions dans la base de données pour le thème &quot;Sommeil&quot;
      </Button>
    </Card>
  )
}

export default SommeilCard
