import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { Database, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { AnamneseResults } from '@/@types/Anamnese'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

const RelationsPairsCard: FC = () => {
  const {id: patientId} = useParams<{id: string}>()
 
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {relationsPairs} = anamneseResults ?? {}
  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelect, setIsPendingSelect] = useState<boolean>(false)
  
  const [relationsPairsLocal, setRelationsPairsLocal] = useState<string[]>(["", ""])    //<----- [sociabilité, observations]

  useEffect(()=> {
    if(relationsPairs){
      setRelationsPairsLocal(relationsPairs)
    }
  }, [relationsPairs])

  const handleSociabilite = async(value: string)=> {
    setIsPendingSelect(true)
    const newState = [...relationsPairsLocal]
    newState[0] = value
    const res = await upsertAnamneseByKeyValueAction("relationsPairs", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setStateSelect(res)
    // eslint-disable-next-line
    res && setIsPendingSelect(false)
  }

  const updateFunction = ()=>{
    updateAnamneseResultsByPatientId(patientId)
  }
  useToast({state: stateSelect, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Relations avec les pairs (observations)"} 
        searchKeys={["relationsPairs"]}
        indexDataToRetrieve={1}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Relations avec les pairs</span> : </div> 
        <Select disabled={isPendingSelect} value={relationsPairsLocal[0]} onValueChange={(value)=>handleSociabilite(value)}>
          <SelectTrigger className={`${openSans.className} font-bold w-80 placeholder:font-normal`}>
            <SelectValue  placeholder="Sociabilité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`${openSans.className}`} value="Enfant plutôt sociable.">Enfant plutôt sociable.</SelectItem>
            <SelectItem className={`${openSans.className}`} value="Des difficultés dans la sociabilisation.">Des difficultés dans la sociabilisation.</SelectItem>
          </SelectContent>
        </Select>
        {isPendingSelect && <Loader2 className='animate-spin'/>}
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={relationsPairs?.[1]}
        commentaireObservationFromLocal={relationsPairsLocal[1]}
        completeArrayStateLocal={relationsPairsLocal}
        keyAnamnese='relationsPairs'
        setCompleteArrayStateLocal={setRelationsPairsLocal}
        stateIfCommentObsIsNull={[relationsPairsLocal[0], ""]}
        commentObsIndex={1}
        label='observation'
        themeTitle='Relations avec les pairs'
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème &quot;Relations avec les pairs&quot;
      </Button>
    </Card>
  )
}

export default RelationsPairsCard
