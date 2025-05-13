import { ServiceResponse } from '@/@types/ServiceResponse'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertAutonomieDescriptionAction,  } from '@/serverActions/listeActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

const AddElementToList = () => {
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [newAdjectif, setNewAdjectif] = useState<string>("")

  const {getAutonomieDescriptionsListe, autonomieDescription} = useAnamneseSearchDBStore()
  const {id} = autonomieDescription ?? {}

  const handleSubmit = async(value: string)=> {
    if(value === "") return
    setIsPending(true)
    const res = await upsertAutonomieDescriptionAction(value, id ?? undefined)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const updateFunction = ()=>{
    getAutonomieDescriptionsListe()
    setNewAdjectif("")
  } 

  useToast({state, updateFunction})

  return (
    <div className='flex gap-2'>
      <Button disabled={isPending || newAdjectif === ""} onClick={()=> handleSubmit(newAdjectif)}>
        <Plus/> Ajouter un adjectif
      </Button>
      <Input onKeyDown={(event)=> event.key === "Enter" && handleSubmit(newAdjectif)} disabled={isPending} type='text' className='placeholder:italic...' placeholder='Ecrire une description' value={newAdjectif} onChange={(event)=> setNewAdjectif(event.currentTarget.value)} />
    </div>
  )
}

export default AddElementToList