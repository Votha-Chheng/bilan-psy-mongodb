import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertListeAdjectifsComportementAction } from '@/serverActions/listeActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Plus } from 'lucide-react'
import React, { useActionState, useState } from 'react'

const AddAdjectifComportementForm = () => {
  const [state, formAction, isPending] = useActionState(upsertListeAdjectifsComportementAction, {})
  const {listeAdjectifsId, adjectifsComportement, getListeAdjectifs} = useAnamneseSearchDBStore()
  const [newAdjectif, setNewAdjectif] = useState<string>("")

  const updateFunction = ()=>{
    getListeAdjectifs()
    setNewAdjectif("")
  } 

  useToast({state, updateFunction})

  return (
    <form action={formAction} className='flex gap-2'>
      <Button disabled={isPending || newAdjectif === ""} type='submit'>
        <Plus/> Ajouter un adjectif
      </Button>
      <Input disabled={isPending} type='text' className='placeholder:italic...' placeholder='Ecrire un adjectif' value={newAdjectif} onChange={(event)=> setNewAdjectif(event.currentTarget.value)} />
      <Input type="hidden" name='adjectifsComportement' value={adjectifsComportement ? JSON.stringify([...adjectifsComportement, newAdjectif]) : JSON.stringify([newAdjectif])} />
      <Input type="hidden" name='listeId' value={listeAdjectifsId ?? undefined} />
    </form>
  )
}

export default AddAdjectifComportementForm
