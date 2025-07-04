import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { Database, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { AnamneseResults } from '@/@types/Anamnese'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Separator } from '@/components/ui/separator'

const VeloCard:FC = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {updateAnamneseResultsByPatientId, anamneseResults} = useAnamneseSearchDBStore()
  const {velo} = anamneseResults ?? {}
  
  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelect, setIsPendingSelect] = useState<boolean>(false)
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [veloLocal, setVeloLocal] = useState<string[]>(["", "", ""])                //<-- [age, difficulté, remarques]

  useEffect(()=> {
    if(!velo) return
    setVeloLocal(velo)
  }, [velo])

  const handleChangeVeloLocal = async(value: string, index: number)=> {
    const newState = [...veloLocal]
    newState[index] = value
    // eslint-disable-next-line
    const res = await upsertAnamneseByKeyValueAction("velo", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setStateSelect(res)
    // eslint-disable-next-line
    res && setIsPendingSelect(false)
  }

  const updateFunction = ()=> {
    updateAnamneseResultsByPatientId(patientId)
  }
  useToast({state: stateSelect, updateFunction})
  
  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Acquisition du vélo sans les roulettes (remarques)"} 
        searchKeys={["velo"]}
        indexDataToRetrieve={2}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Acquisition du vélo sans les roulettes</span> : </div> 
        <div> à l’âge de </div>
        <Input 
          type="number" 
          value={veloLocal[0]}
          onBlur={()=>handleChangeVeloLocal(veloLocal[0], 0)} 
          className='w-16' 
          onChange={(event)=> setVeloLocal([event.target.value, veloLocal[1], veloLocal[2]])} 
        />
        ans 
        <Select disabled={isPendingSelect} value={veloLocal[1]} onValueChange={(value)=> handleChangeVeloLocal(value, 1)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="avec difficulté/sans difficulté" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="avec difficulté">avec difficulté</SelectItem>
            <SelectItem value="sans difficulté">sans difficulté</SelectItem>
          </SelectContent>
        </Select>
        {isPendingSelect && <Loader2 className="animate-spin" />}
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={velo?.[2]}
        commentaireObservationFromLocal={veloLocal[2]}
        completeArrayStateLocal={veloLocal}
        keyAnamnese='velo'
        setCompleteArrayStateLocal={setVeloLocal}
        stateIfCommentObsIsNull={[veloLocal[0], veloLocal[1], ""]}
        commentObsIndex={2}
        label='commentaire'
        themeTitle='Acquisition du vélo sans les roulettes'
      />
      <Separator className='my-2.5'/>
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème &quot;Acquisition du vélo sans les roulettes&quot;
      </Button>
    </Card>
  )
}

export default VeloCard
