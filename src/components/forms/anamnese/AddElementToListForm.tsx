import { ActionFunction } from '@/@types/ActionFunction'
import { ListeAdjectifsDTO, ListeTypeSensorialiteDTO } from '@/@types/Anamnese'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2, Plus } from 'lucide-react'
import React, { FC, useActionState, useRef } from 'react'

type AddElementToListFormProps = {
  listeElements: string[]|null|undefined
  listeId: string|undefined
  elementToAddLabel: string
  keyListe: keyof ListeAdjectifsDTO | keyof ListeTypeSensorialiteDTO
  actionFunction: ActionFunction
}

const AddElementToListForm: FC<AddElementToListFormProps> = ({ elementToAddLabel, keyListe, actionFunction, listeId }) => {
  const {getListeAdjectifs, getTypeSensorialite} = useAnamneseSearchDBStore()
  const [state, formAction, isPending] = useActionState(actionFunction, {})

  const formRef = useRef<HTMLFormElement>(null)
  
  const updateFunction = ()=> {
    // eslint-disable-next-line
    keyListe === "typesSensorialite" ? getTypeSensorialite() : getListeAdjectifs()
  }
  useToast({state, updateFunction})

  return (
    <div className='flex items-center'>
      <form ref={formRef} action={formAction} className='flex items-center'>
        <Button type='submit' disabled={isPending} className='bg-blue-500 hover:bg-blue-400 mr-2.5'>
          <Plus/> Ajouter {elementToAddLabel} à la liste
        </Button>
        <Input type='text' name={keyListe} required className='w-96' />
        <Input type='hidden' name="listeId" value={listeId ?? ""} />
      </form>
      {isPending && <Loader2 className='animate-spin'/>}
    </div>
  )
}

export default AddElementToListForm
