import { AnamneseResults } from '@/@types/Anamnese'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { CornerUpLeft, Database, EditIcon, Loader2, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, useActionState, useEffect, useRef, useState } from 'react'

type MotriciteGlobaleFineCardProps = {
  globaleFineState: string[]|null|undefined
  keyLabel: keyof AnamneseResults
  title: string
}

const MotriciteGlobaleFineCard:FC<MotriciteGlobaleFineCardProps> = ({globaleFineState, keyLabel, title}) => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const {updatePatientInfoFromDB, anamneseResults} = usePatientInfoStore()
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [motriciteLocal, setMotriciteLocal] = useState<string[]>(["", ""])
  const [editObservation, setEditObservation] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)
  const setObervationToNullRef = useRef<HTMLFormElement>(null)

  useEffect(()=> {
    if(!globaleFineState) return
    setMotriciteLocal(globaleFineState)
  }, [globaleFineState])

  useEffect(()=> {
    if(!globaleFineState?.[1] || globaleFineState?.[1] === ""){
      setEditObservation(true)
    }
  }, [globaleFineState?.[1]])

  useEffect(()=> {
    if(!globaleFineState && motriciteLocal[0] === "") return
    if(globaleFineState && motriciteLocal[0] === globaleFineState[0]) return
    if(motriciteLocal[0] === "") return
    formRef.current?.requestSubmit()
  }, [motriciteLocal[0], globaleFineState] )

  const handleChangeMotriciteLocal = (value: string, index: number)=> {
    let newState = [...motriciteLocal]
    newState[index] = value
    setMotriciteLocal(newState)
  }

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
    setEditObservation(false)
  }
  useToast({state, updateFunction})

  return (
    <Card className='mb-5'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={title + " (observations)"} 
        searchKeys={[keyLabel]}
        indexDataToRetrieve={1}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>{title}</span> : </div> 
        <Select disabled={isPending} value={motriciteLocal[0]} onValueChange={(value)=> handleChangeMotriciteLocal(value, 0)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Difficultés/Aisance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="des diffultés">des diffultés</SelectItem>
            <SelectItem value="de l'aisance">de l'aisance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='gap-2 mx-8.5'>
        <div className='flex items-center mb-2.5'>
          <Label htmlFor="motriciteGlobaleObservations" className='font-bold text-base whitespace-nowrap mr-2.5'>Observations : </Label>
          <span className={`mr-2.5 ${editObservation && "opacity-30"}`}>{!globaleFineState?.[1] || globaleFineState?.[1]===""  ? <i>Aucune observation enregistrée.</i> : globaleFineState[1]}</span>
          {
            isPending
            ?
            <Loader2 className='animate-spin'/>
            :
            editObservation
            ?
            <CornerUpLeft 
              size={20} 
              className={`cursor-pointer text-red-700 ${globaleFineState?.[1] ?"block":"hidden"}`}
              onClick={()=> setEditObservation(false)}
            />
            :
            <div className='flex gap-5 items-center'>
              <EditIcon size={19} className='cursor-pointer text-slate-400 hover:scale-110 hover:text-orange-400 transition-colors duration-100' onClick={()=> setEditObservation(true)}/>
              <Trash2 size={20} className='text-red-600 hover:text-red-400 cursor-pointer' onClick={()=> setObervationToNullRef.current?.requestSubmit()} />
            </div>
          }
        </div>
        {
          editObservation &&
          <div className='flex gap-2'>
            <Button className='bg-blue-500 hover:bg-blue-400' onClick={()=> formRef && formRef.current?.requestSubmit()}>Enregistrer les observations</Button>
            <Input 
              type='text' 
              placeholder='Ecrire vos observations puis enregistrer...' 
              className='placeholder:italic' 
              value={motriciteLocal[1]} 
              onChange={(event)=> handleChangeMotriciteLocal(event.currentTarget.value, 1)} 
            />
          </div>
        }
        <form ref={formRef} action={formAction}>
          <Input type='hidden' name="value" value={JSON.stringify(motriciteLocal)}/>
          <Input type='hidden' name="key" value={keyLabel} />
          <Input type='hidden' name="patientId" value={patientId}/>
        </form>
        <form ref={setObervationToNullRef} action={formAction}>
          <Input type='hidden' name="value" value={JSON.stringify([motriciteLocal[0], ""])}/>
          <Input type='hidden' name="key" value={keyLabel} />
          <Input type='hidden' name="patientId" value={patientId}/>
        </form>
      </div>
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème "{title}"
      </Button>
    </Card>
  )
}

export default MotriciteGlobaleFineCard
