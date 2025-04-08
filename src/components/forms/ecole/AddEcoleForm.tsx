import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/ui/SubmitButton'
import { createEcoleAction } from '@/serverActions/ecoleActions'
import { useEcoleStore } from '@/stores/ecoleStore'
import React, { useActionState, useEffect } from 'react'

const AddEcoleForm = () => {
  const [state, formAction, isPending] = useActionState(createEcoleAction, {})
  const { updateListeEcoles } = useEcoleStore()

  useEffect(()=> {
    updateListeEcoles()
  }, [state])

  return (
    <form action={formAction} className='flex w-full gap-x-3'>
      <Input type='text' name='nom' className='w-full' placeholder="Nom de l'établissement scolaire" required />
      <SubmitButton isPending={isPending} label='Ajouter à la liste des écoles' full={false} />
    </form>
  )
}

export default AddEcoleForm