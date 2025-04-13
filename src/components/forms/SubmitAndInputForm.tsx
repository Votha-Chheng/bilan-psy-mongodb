import { ActionFunction } from '@/@types/ActionFunction'
import React, { FC, ReactNode, useActionState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { AnamneseResults } from '@/@types/Anamnese'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { toast } from 'sonner'

type SubmitAndInputFormProps = {
  actionFunction: ActionFunction
  label: ReactNode
  name: string|null
  defaultValue?: string
  keyLabel?: keyof AnamneseResults
}

const SubmitAndInputForm: FC<SubmitAndInputFormProps> = ({ actionFunction, label, defaultValue="", keyLabel, name }) => {
  const [state, formAction, isPending] = useActionState(actionFunction, {})
  const {getDevPsyConfereList} = useAnamneseSearchDBStore()

  useEffect(()=> {
    if(state.success === true){
      toast.success(state.message)
      getDevPsyConfereList()
    }
    if(state.success === false){
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className='flex items-center w-full'>
      <Button disabled={isPending} className='bg-blue-500 hover:bg-blue-400 mr-2.5'>
        {label}
      </Button>
      <Input type='text' className='w-full font-normal' name={name ?? "value"} defaultValue={(name && state.fields && state?.fields[name]) || defaultValue}/>
      {
        keyLabel && <Input type='hidden' className='w-full' name='key' value={keyLabel}/>
      }
    </form>
  )
}

export default SubmitAndInputForm
