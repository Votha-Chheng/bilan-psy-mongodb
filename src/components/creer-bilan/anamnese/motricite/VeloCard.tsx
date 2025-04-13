import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Database } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useActionState, useEffect, useMemo, useRef, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'

const VeloCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const {updatePatientInfoFromDB, anamneseResults} = usePatientInfoStore()
  const {velo} = anamneseResults ?? {}
  
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [veloLocal, setVeloLocal] = useState<string[]>(["", "", ""])                //<-- [age, difficulté, remarques]
  const [ageFocus, setAgeFocus] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(()=> {
    if(!velo) return
    setVeloLocal(velo)
  }, [velo])


  const needsToBeSaved: boolean = useMemo(()=> {
    if(velo){
      if((velo[1] !== veloLocal[1]) || ((velo[0] !== veloLocal[0]) && !ageFocus)){
        if(veloLocal[0] !== "" || veloLocal[1] || ""){
          return true
        }
      }
    }
    if(!velo) {
      if((veloLocal[1] !== "") || ((veloLocal[0] !== "") && !ageFocus)){
        return true
      }
    }
  
    return false
  }, [veloLocal[0], veloLocal[1] , ageFocus, velo?.[0], velo?.[1]])

  useEffect(()=> {
    if(needsToBeSaved) {
      formRef.current?.requestSubmit()
    }
  },[needsToBeSaved] )

  const handleChangeVeloLocal = (value: string, index: number)=> {
    let newState = [...veloLocal]
    newState[index] = value
    setVeloLocal(newState)
  }

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }
  useToast({state, updateFunction})
  
  return (
    <Card className='mb-5  gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Acquisition du vélo sans les roulettes (remarques)"} 
        searchKeys={["velo"]}
        indexDataToRetrieve={2}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Acquisition du vélo sans les roulettes</span> : </div> 
        <div> à l'âge de </div>
        <Input 
          type="number" 
          value={veloLocal[0]}
          onBlur={()=> setAgeFocus(false)} 
          onFocus={()=> setAgeFocus(true)} 
          className='w-16' 
          onChange={(event)=> handleChangeVeloLocal(event.currentTarget.value, 0)} 
        />
        ans 
        <Select disabled={isPending} value={veloLocal[1]} onValueChange={(value)=> handleChangeVeloLocal(value, 1)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="avec difficulté/sans difficulté" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="avec difficulté">avec difficulté</SelectItem>
            <SelectItem value="sans difficulté">sans difficulté</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <form ref={formRef} action={formAction}>
        <Input type='hidden' name="value" value={JSON.stringify(veloLocal)}/>
        <Input type='hidden' name="key" value="velo" />
        <Input type='hidden' name="patientId" value={patientId}/>
      </form>
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
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème "Acquisition du vélo sans les roulettes"
      </Button>
    </Card>
  )
}

export default VeloCard
