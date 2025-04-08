import { ActionFunction } from '@/@types/ActionFunction'
import React, { Dispatch, FC, SetStateAction, useActionState, useEffect } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { camelCaseToNormal } from '@/utils/convertCamelCaseToNormal'
import { upsertAnamneseBySingleKeyValueAction } from '@/serverActions/anamneseActions'
import { Anamnese } from '@prisma/client'

type SimpleInputFormProps={
  name: string
  placeholder?: string
  setEditData:Dispatch<SetStateAction<string[]>>
  buttonLabel?: string
  defaultValue?: string
  keyAnamnese: keyof Anamnese
}

const SimpleAnamneseInputForm: FC<SimpleInputFormProps> = ({name, defaultValue="", setEditData, placeholder="Décrire...", buttonLabel="Valider", keyAnamnese}) => {
  const {id} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueAction, {})
  const {updatePatientInfoFromDB} = usePatientInfoStore()

  useEffect(()=> {
    if(state?.success === true){
      toast.success(state.message)
      updatePatientInfoFromDB(id)
      setEditData(prev=> prev.filter(item => item !== camelCaseToNormal(name)))
    }
    if(state?.success === false){
      toast.error(state.message)
    }
  }, [state])

  return (
    <form className='flex gap-x-2' action={formAction}>
      <Button type='submit' disabled={isPending} className='bg-blue-400 hover:bg-blue-500'>
        {buttonLabel.toUpperCase()}
      </Button>
      <Input type='text' className='mb-2 placeholder:italic' placeholder={placeholder} defaultValue={state?.fields?.value||defaultValue} name="value" required/>
      <Input type='hidden' value={id} name="patientId"/>
      <Input type='hidden' value={keyAnamnese} name="key"/>
    </form>
  )
}

export default SimpleAnamneseInputForm
