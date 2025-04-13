import { ActionFunction } from '@/@types/ActionFunction'
import { AnamneseResults } from '@/@types/Anamnese'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/customHooks/useToast'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { CornerUpLeft, EditIcon, Loader2, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { Dispatch, FC, SetStateAction, useActionState, useRef, useState } from 'react'

type AddComentaireOuObservationsProps = {
  actionFunction: ActionFunction
  commentaireObservationFromDB: string|null|undefined
  commentaireObservationFromLocal: string
  completeArrayStateLocal: string[]
  setCompleteArrayStateLocal: Dispatch<SetStateAction<string[]>>
  stateIfCommentObsIsNull: string[]
  commentObsIndex: number
  keyAnamnese: keyof AnamneseResults
  label: "remarque"|"observation"|"commentaire"
}

const AddComentaireOuObservations: FC<AddComentaireOuObservationsProps> = ({
  actionFunction, 
  commentaireObservationFromDB, 
  commentaireObservationFromLocal, 
  completeArrayStateLocal, 
  stateIfCommentObsIsNull, 
  commentObsIndex, 
  setCompleteArrayStateLocal, 
  keyAnamnese,
  label
}) => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(actionFunction, {})
  const {updatePatientInfoFromDB} = usePatientInfoStore()
  const [editObs, setEditObs] = useState<boolean>(false) 

  const formRef = useRef<HTMLFormElement>(null)
  const setObervationToNullRef = useRef<HTMLFormElement>(null)

  const handleChangeLocalState = (value: string)=> {
    let newState = [...completeArrayStateLocal]
    newState[commentObsIndex] = value
    setCompleteArrayStateLocal(newState)
  }

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
    setEditObs(false)
  }
  useToast({state, updateFunction})
  
  return (
    <div className='gap-2 mx-8.5'>
      <div className='flex items-center mb-2.5'>
        <Label htmlFor="motriciteGlobaleObservations" className='font-bold text-base whitespace-nowrap mr-2.5 capitalize'>{label}s : </Label>
        <span className={`mr-2.5 ${editObs && "opacity-30"}`}>
          {!commentaireObservationFromDB || commentaireObservationFromDB===""  ? <i>Aucun{label !== "remarque" && "e"} {label} enregistré{label !== "remarque" && "e"}.
          </i> :commentaireObservationFromDB}
        </span>
        {
          isPending
          ?
          <Loader2 className='animate-spin'/>
          :
          editObs
          ?
          <CornerUpLeft 
            size={20} 
            className={`cursor-pointer text-red-700 ${commentaireObservationFromDB ?"block":"hidden"}`}
            onClick={()=> setEditObs(false)}
          />
          :
          <div className='flex gap-5 items-center'>
            <EditIcon size={19} className='cursor-pointer text-slate-400 hover:scale-110 hover:text-orange-400 transition-colors duration-100' onClick={()=> setEditObs(true)}/>
            <Trash2 size={20} className={`text-red-600 hover:text-red-400 cursor-pointer ${commentaireObservationFromDB ? "block":"hidden"} `} onClick={()=> setObervationToNullRef.current?.requestSubmit()} />
          </div>
        }
      </div>
      {
        editObs &&
        <div className='flex gap-2'>
          <Button disabled={isPending} className='bg-blue-500 hover:bg-blue-400' onClick={()=> formRef && formRef.current?.requestSubmit()}>Enregistrer les {label}s</Button>
          <Input 
            type='text' 
            placeholder='Ecrire vos remarques puis enregistrer...' 
            className='placeholder:italic' 
            value={commentaireObservationFromLocal} 
            onChange={(event)=> handleChangeLocalState(event.currentTarget.value)} 
          />
        </div>
      }
      <form ref={formRef} action={formAction}>
        <Input type='hidden' name="value" value={JSON.stringify(completeArrayStateLocal)}/>
        <Input type='hidden' name="key" value={keyAnamnese} />
        <Input type='hidden' name="patientId" value={patientId}/>
      </form>
      <form ref={setObervationToNullRef} action={formAction}>
        <Input type='hidden' name="value" value={JSON.stringify(stateIfCommentObsIsNull)}/>
        <Input type='hidden' name="key" value={keyAnamnese} />
        <Input type='hidden' name="patientId" value={patientId}/>
      </form>
    </div>
  )
}

export default AddComentaireOuObservations
