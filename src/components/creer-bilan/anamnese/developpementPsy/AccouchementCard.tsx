
import { Card } from '@/components/ui/card'
import React, { FC, useEffect, useState } from 'react'
import AddCommentaireOuObservations from '../AddComentaireOuObservations'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Plus } from 'lucide-react'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Switch } from '@/components/ui/switch'
import { openSans } from '@/fonts/openSans'
import { useParams } from 'next/navigation'
import { useToast } from '@/customHooks/useToast'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'


const AccouchementCard: FC = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {accouchement} = anamneseResults ?? {}
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIspending] = useState<boolean>(false)
  
  const [semmaines, setSemaines] = useState<string>("")
  const [jours, setJours] = useState<string>("")
  const [accouchementLocal, setAccouchementLocal] = useState<string[]>( accouchement ?? ["", "", "", "", ""])   //<--- [semaines, jours, voies, déclenchement, commentaires]

  const handleChangeState = async(value: string, index: number)=> {
    if(value==="") return
    setIspending(true)
    const newState = [...accouchementLocal]
    newState[index] = value
    const res = await upsertAnamneseByKeyValueAction("accouchement", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res.success && setAccouchementLocal(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIspending(false)
  }

  const handleCheckedChange = async(checked: boolean)=> {
    setIspending(true)
    const newState = [...accouchementLocal] 
    // eslint-disable-next-line
    checked
    ? newState[3] = "L'accouchement a été déclenché."
    : newState[3] = ""
    const res = await upsertAnamneseByKeyValueAction("accouchement", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res.success && setAccouchementLocal(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIspending(false)
  }

  useEffect(()=> {
    if(!accouchement) return
    setAccouchementLocal(accouchement)
    setSemaines(accouchement[0])
    setJours(accouchement[1])
  }, [accouchement])

  const updateFunction = ()=> {
    updateAnamneseResultsByPatientId(patientId)
  }

  useToast({state, updateFunction})

  return (
    <Card className='pb-5 pt-3 mb-5 gap-0'>
      <div className='flex items-center gap-2.5 mb-5 ml-5'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Accouchement</span> : </div> 
        <div className='font-normal'>à</div>
        <Input 
          type="number" 
          className='w-16' 
          value={semmaines} 
          onChange={(event)=> setSemaines(event.currentTarget.value)} 
          onBlur={()=> handleChangeState(semmaines, 0)}  
          disabled={isPending}
        />

        <div>semaine(s) d’aménorrhées </div>
        <Plus/>
        <Input 
          type="number" 
          className='w-16' 
          value={jours} 
          onChange={(event)=> setJours(event.currentTarget.value)} 
          onBlur={()=> handleChangeState(jours, 1)}
          disabled={isPending} 
        />
        <div>jours par</div>
        <Select disabled={isPending} value={accouchementLocal[2]} onValueChange={(value: string)=> handleChangeState(value, 2)}>
          <SelectTrigger className={`w-44 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value={"voies naturelles"}>voies naturelles</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value={"césarienne"}>césarienne</SelectItem>
          </SelectContent>
        </Select>
        | 
        <span className={`italic select-none ${openSans.className} ${accouchementLocal[3] === "" && "text-muted-foreground"}`}>L&apos;accouchement a été déclenché.</span>
        <Switch disabled={isPending} checked={accouchementLocal[3] === "L'accouchement a été déclenché."} onCheckedChange={(checked: boolean)=> handleCheckedChange(checked)}/>
          {isPending && <Loader2 className='animate-spin' />}
      </div>
      <AddCommentaireOuObservations
        actionFunction={upsertAnamneseBySingleKeyValueWithFormDataAction} 
        commentaireObservationFromDB={accouchement?.[4]}
        commentaireObservationFromLocal={accouchementLocal[4]}
        completeArrayStateLocal={accouchementLocal}
        setCompleteArrayStateLocal={setAccouchementLocal}
        stateIfCommentObsIsNull={[accouchementLocal[0], accouchementLocal[1], accouchementLocal[2], accouchementLocal[3], ""]}
        commentObsIndex={4}
        keyAnamnese="accouchement"
        label="commentaire"
        themeTitle="Accouchement"
      />
    </Card>

  )
}

export default AccouchementCard
