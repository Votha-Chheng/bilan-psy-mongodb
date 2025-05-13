"use client"

import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/ui/SubmitButton'
import { createMedecinAction } from '@/serverActions/medecinActions'
import { useMedecinStore } from '@/stores/medecinStore'
import React, { useActionState, useEffect } from 'react'

const AddMedecinForm = () => {
  const [state, formAction, isPending] = useActionState(createMedecinAction, {})
  const {updateListeMedecins} = useMedecinStore()

  useEffect(()=> {
    updateListeMedecins()
  }, [state])

  return (
    <form action={formAction} className='flex w-full gap-x-3'>
      <Input type='text' name='nom' className='w-full' placeholder="Nom du médecin ou de l'institution" required />
      <SubmitButton isPending={isPending} label='Ajouter à la liste des médecins' full={false} />
    </form>
  )
}

export default AddMedecinForm