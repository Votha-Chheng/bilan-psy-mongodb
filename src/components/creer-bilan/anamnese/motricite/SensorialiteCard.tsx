import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Database} from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useActionState, useEffect, useMemo, useRef, useState } from 'react'
import AddElementToListForm from '@/components/forms/anamnese/AddElementToListForm'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { upsertListeSensorialiteAction } from '@/serverActions/listeActions'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'

const SensorialiteCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {sensorialite} = anamneseResults ?? {}
  const {getTypeSensorialite, typeSensorialite : liste} = useAnamneseSearchDBStore()
  const {typesSensorialite} = liste ?? {}
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 

  const [sensorialiteLocale, setSensorialiteLocale] = useState<string[]>(["", ""]) //<---- [type de sensorialité, commentaires]

  const formRef = useRef<HTMLFormElement>(null)

  const needsToBeSaved: boolean = useMemo(()=> {
    if(!sensorialite){
      return sensorialiteLocale[0] !== ""  
    }
    if(sensorialite){
      if(sensorialiteLocale[0] === "") return false
      if(sensorialiteLocale[0] !== sensorialite[0]) return true
    }
    return false
  }, [sensorialite, sensorialiteLocale[0]])

  useEffect(()=> {
    getTypeSensorialite()
  }, [])

  useEffect(()=> {
    if(!sensorialite) return
    setSensorialiteLocale(sensorialite)
  }, [sensorialite])

  useEffect(()=> {
    if(needsToBeSaved){
      formRef.current?.requestSubmit()
    }
  }, [needsToBeSaved])

  const handleChangeSensorialite = (value: string, index: number)=> {
    const newState = [...sensorialiteLocale]
    newState[index] = value
    setSensorialiteLocale(newState)
  }

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }

  useToast({state, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Sensorialité"} 
        searchKeys={["sensorialite"]}
        indexDataToRetrieve={1}
      />
      <div className='flex gap-2.5 items-center'>
        <div className='ml-7.5'>&bull; <span className='underline font-bold underline-offset-2'>Sensorialité</span> : </div>
        <p className='font-bold'>de type :</p>
        <Select disabled={isPending} value={sensorialiteLocale[0]} onValueChange={(value: string)=> handleChangeSensorialite(value, 0)}>
          <SelectTrigger className={`w-64 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {
              typesSensorialite && typesSensorialite.length>0 && typesSensorialite.map((value, index)=> (
                <SelectItem className={`font-normal tracking-wide ${openSans.className}`} key={index} value={value}>{value}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        |
        <AddElementToListForm
          listeElements={typesSensorialite}
          elementToAddLabel='un type de sensorialité'
          actionFunction={upsertListeSensorialiteAction}
          keyListe='typesSensorialite'
          listeId={liste?.id}
        />
      </div>
      <form ref={formRef} action={formAction}>
        <Input type='hidden' name="value" value={JSON.stringify(sensorialiteLocale)}/>
        <Input type='hidden' name="key" value="sensorialite" />
        <Input type='hidden' name="patientId" value={patientId}/>
      </form>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={sensorialite?.[1]}
        commentaireObservationFromLocal={sensorialiteLocale[1]}
        completeArrayStateLocal={sensorialiteLocale}
        keyAnamnese='sensorialite'
        setCompleteArrayStateLocal={setSensorialiteLocale}
        stateIfCommentObsIsNull={[sensorialiteLocale[0], ""]}
        commentObsIndex={1}
        label='observation'
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème "Sensorialité"
      </Button>
    </Card>
  )
}

export default SensorialiteCard
