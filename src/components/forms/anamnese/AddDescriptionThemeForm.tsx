import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createAnamneseDescriptionAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import React, { FC, useActionState, useEffect } from 'react'
import { toast } from 'sonner'

type AddDescriptionThemeProps = {
  theme: string
  domaine: string
  defaultValue?: string|null
}

const AddDescriptionTheme: FC<AddDescriptionThemeProps> = ({theme, domaine, defaultValue}) => {
  const {id} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(createAnamneseDescriptionAction, {})
  const {updatePatientInfoFromDB} = usePatientInfoStore()

  useEffect(() => {
    if(state.success === true){
      toast.success(state.message)
      updatePatientInfoFromDB(id)
    }
    if(state.success === false){
      toast.error(state.message)
    }
  }, [state])

  return (
    <form className='flex gap-x-2' action={formAction}>
      <Button type='submit' disabled={isPending} className='bg-blue-400 hover:bg-blue-500'>
        Ajouter une nouvelle description
      </Button>
      <Input type='text' className='mb-2' placeholder='Ecrivez une nouvelle description...' defaultValue={state?.fields?.description} name="description" required/>
      <Input type='hidden' value={theme} name="theme"/>
      <Input type='hidden' value={domaine} name="domaine"/>
      <Input type='hidden' value={id} name="patientId"/>
    </form>
  )
}

export default AddDescriptionTheme