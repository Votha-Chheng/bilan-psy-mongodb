import React, { Dispatch, FC, SetStateAction, useActionState, useEffect, useRef } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useParams } from 'next/navigation'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { AnamneseResults } from '@/@types/Anamnese'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { useToast } from '@/customHooks/useToast'

type SimpleInputFormProps={
  placeholder?: string
  setEdit:Dispatch<SetStateAction<boolean>>
  buttonLabel?: string
  defaultValue?: string
  keyAnamnese: keyof AnamneseResults
  edit: boolean
  themeTitle: string
  updateFunctionFromStore: ()=> void
}

const SimpleAnamneseInputForm: FC<SimpleInputFormProps> = ({defaultValue="", setEdit, placeholder="Décrire...", buttonLabel="Valider", keyAnamnese, edit, themeTitle, updateFunctionFromStore}) => {
  const {id} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const {chosenThemes} = useAnamneseSearchDBStore()
  const focusRef = useRef<HTMLInputElement>(null)

  useEffect(()=> {
    if(edit && chosenThemes[chosenThemes.length-1] === themeTitle){
      focusRef?.current?.focus()
    }
  }, [edit, chosenThemes])


  const updateFunction = ()=> {
    updateFunctionFromStore()
    setEdit(false)
  }

  useToast({state, updateFunction})

  return (
    <form className='flex gap-x-2' action={formAction}>
      <Button type='submit' disabled={isPending} className='bg-blue-400 hover:bg-blue-500'>
        {buttonLabel.toUpperCase()}
      </Button>
      <Input ref={focusRef} type='text' className='mb-2 placeholder:italic' placeholder={placeholder} defaultValue={state?.fields?.value||defaultValue} name="value" required/>
      <Input type='hidden' value={id} name="patientId"/>
      <Input type='hidden' value={keyAnamnese} name="key"/>
    </form>
  )
}

export default SimpleAnamneseInputForm
