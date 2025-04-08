"use client"

import { updateDateBilanAction } from '@/serverActions/patientActions'
import React, { Dispatch, FC, SetStateAction, useActionState, useEffect } from 'react'
import SubmitButton from '../ui/SubmitButton'
import TextInput from '../inputs/TextInput'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Button } from '../ui/button'

type DateBilanFormProps = {
  setChangeDateBilan: Dispatch<SetStateAction<boolean>>
  dateBilanExists: boolean
  defaultValue? : string|null
}

const DateBilanForm: FC<DateBilanFormProps> = ({setChangeDateBilan, dateBilanExists, defaultValue}) => {
  const {id} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(updateDateBilanAction, {})
  const {updatePatientInfoFromDB} = usePatientInfoStore()

  useEffect(()=> {
    if(state.success){
      updatePatientInfoFromDB(id)
      setChangeDateBilan(false)
      toast.success(state.message, {
        action: {
          label: "Fermer",
          onClick: () => console.log("Fermer"),
        },
      })
    }
  }, [state])

  return (
    <form action={formAction} className='flex'>
      <input type='hidden' name="patientId" value={id} />
      <TextInput name="dateBilan" label='Bilan effectué' className='mr-2.5 w-96' defaultValue={state?.fields?.dateBilan || defaultValue ||''} placeholder='Date du bilan...' fontSize='text-base' />
      <SubmitButton isPending={isPending} full={false} />
      {
        dateBilanExists &&
        <Button variant="outline" className='uppercase ml-2.5' onClick={()=> setChangeDateBilan(false)}>
          Annuler
        </Button>
      }
    </form>
  )
}

export default DateBilanForm
