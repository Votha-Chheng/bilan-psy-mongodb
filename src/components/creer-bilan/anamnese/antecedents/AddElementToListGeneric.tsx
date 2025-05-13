import { ServiceResponse } from '@/@types/ServiceResponse'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { Plus } from 'lucide-react'
import React, { FC, useState } from 'react'

type AddElementToListGenericProps = {
  // eslint-disable-next-line
  actionFunction: (value: string, listeId: string|undefined|null)=> Promise<ServiceResponse<any>>   //<----- function need (value, listeId)
  listeId: string|null |undefined
  updateFunction: ()=> void
}

const AddElementToListGeneric: FC<AddElementToListGenericProps> = ({actionFunction, listeId, updateFunction}) => {
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const [newElementToAdd, setNewElementToAdd] = useState<string>("")

  const handleSubmit = async(value: string)=> {
    if(value === "") return
    setIsPending(true)
    const res = await actionFunction(value, listeId ?? "")
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
    // eslint-disable-next-line
    res.success && setNewElementToAdd("")
  }

  useToast({state, updateFunction})

  return (
    <div className='flex gap-2'>
      <Button disabled={isPending || newElementToAdd === ""} onClick={()=> handleSubmit(newElementToAdd)}>
        <Plus/> Ajouter un élément
      </Button>
      <Input 
        onKeyDown={(event)=> event.key === "Enter" && handleSubmit(newElementToAdd)} 
        disabled={isPending} type='text' 
        className='placeholder:italic...' 
        placeholder="Ecrire l'élément à rajouter..."
        value={newElementToAdd} 
        onChange={(event)=> setNewElementToAdd(event.currentTarget.value)}
      />
    </div>
  )
}

export default AddElementToListGeneric
