import { ActionFunction } from '@/@types/ActionFunction'
import { ListeAdjectifsDTO, ListeTypeSensorialiteDTO } from '@/@types/Anamnese'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2, Plus } from 'lucide-react'
import React, { FC, useActionState, useEffect, useMemo, useState } from 'react'

type AddElementToListFormProps = {
  listeElements: string[]|null|undefined
  listeId: string|undefined
  elementToAddLabel: string
  keyListe: keyof ListeAdjectifsDTO | keyof ListeTypeSensorialiteDTO
  actionFunction: ActionFunction
}

const AddElementToListForm: FC<AddElementToListFormProps> = ({ listeElements, elementToAddLabel, keyListe, actionFunction, listeId }) => {
  const {getListeAdjectifs, getTypeSensorialite} = useAnamneseSearchDBStore()
  const [state, formAction, isPending] = useActionState(actionFunction, {})
  const [arrayOfElements, setArrayOfElements] = useState<string[]|null>(null)
  const [elementToAdd, setElementToAdd] = useState<string>("")

  useEffect(()=> {
    if(listeElements){
      setArrayOfElements(listeElements)
    }
  }, [listeElements])

  const handleElementToAdd = (value: string)=> {
    setElementToAdd(value)
  }

  const valueToReturn: string = useMemo(()=> {
    if(!arrayOfElements) {
      if(elementToAdd === "") return ""
      return JSON.stringify([elementToAdd])
    }

    return JSON.stringify([...arrayOfElements, elementToAdd])
  }, [elementToAdd, arrayOfElements])
  
  const updateFunction = ()=> {
    keyListe === "typesSensorialite" ? getTypeSensorialite() : getListeAdjectifs()
    setElementToAdd("")
  }
  useToast({state, updateFunction})

  return (
    <div className='flex items-center'>
      <form action={formAction} className='flex items-center'>
        <Button type='submit' disabled={isPending} className='bg-blue-500 hover:bg-blue-400 mr-2.5'>
          <Plus/> Ajouter {elementToAddLabel} à la liste
        </Button>
        <Input type='hidden' name={keyListe} value={valueToReturn} />
        <Input type='hidden' name="listeId" value={listeId ?? ""} />
      </form>
      <Input disabled={isPending} type='text' className=' font-normal w-96' value={elementToAdd} onChange={(event)=> handleElementToAdd(event.currentTarget.value)} />
      {isPending && <Loader2 className='animate-spin' />}
    </div>
  )
}

export default AddElementToListForm
