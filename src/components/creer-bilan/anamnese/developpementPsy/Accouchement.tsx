import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useActionState, useEffect, useRef, useState } from 'react'

const Accouchement = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {updatePatientInfoFromDB, anamneseResults} = usePatientInfoStore()
  const {accouchement} = anamneseResults ?? {}
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const [accouchementLocal, setAccouchementLocal] = useState<string[]>( accouchement ?? ["", "", "", ""])
  const [semainesIsFocused, setSemainesIsFocused] = useState<boolean>(false)
  const [joursIsFocused, setJoursIsFocused] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  console.log(accouchement)
  console.log(accouchementLocal)

  const handleChangeSemaines = (value: string, index: number)=> {
    let newState = [...accouchementLocal] 
    newState[index] = value
    setAccouchementLocal(newState)
  }

  const handleSwitchChange = (checked: boolean)=> {
    let newState = [...accouchementLocal] 
    checked
    ? newState[3] = "L'accouchement a été déclenché."
    : newState[3] = ""

    setAccouchementLocal(newState)
  }

  useEffect(()=> {
    if(accouchement) {
      setAccouchementLocal(accouchement)
    }
  }, [accouchement])

  useEffect(()=> {
    if(!accouchement && accouchementLocal[0]==="") return
    if(accouchement && accouchementLocal[0]==="" && accouchementLocal[1]==="" && accouchementLocal[2]==="" && accouchementLocal[3]==="") return
    if(accouchement && accouchement[0] === accouchementLocal[0]) return
    if(semainesIsFocused) return
    formRef.current?.requestSubmit()
  }, [accouchementLocal[0], semainesIsFocused])

  useEffect(()=> {
    if(!accouchement && accouchementLocal[1]==="") return
    if(accouchement && accouchementLocal[0]==="" && accouchementLocal[1]==="" && accouchementLocal[2]==="" && accouchementLocal[3]==="") return
    if(accouchement && accouchement[1] === accouchementLocal[1]) return
    if(joursIsFocused) return
    formRef.current?.requestSubmit()
  }, [accouchementLocal[1], joursIsFocused])

  useEffect(()=> {
    if(!accouchement && accouchementLocal[2]==="") return
    if(accouchement && accouchementLocal[0]==="" && accouchementLocal[1]==="" && accouchementLocal[2]==="" && accouchementLocal[3]==="") return
    if(accouchement && accouchement[2] === accouchementLocal[2]) return
    formRef.current?.requestSubmit()
  }, [accouchementLocal[2]])

  useEffect(()=> {
    if(!accouchement && accouchementLocal[3]==="") return
    if(accouchement && accouchementLocal[0]==="" && accouchementLocal[1]==="" && accouchementLocal[2]==="" && accouchementLocal[3]==="") return
    if(accouchement && accouchement[3] === accouchementLocal[3]) return
    formRef.current?.requestSubmit()
  }, [accouchementLocal[3]])

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }
  useToast({state, updateFunction})

  return (
    <div className='flex flex-col'>
      <form className='flex items-center gap-2.5' action={formAction} ref={formRef}>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Accouchement</span> : </div> 
        <div className='font-normal'>à</div>
        <Input 
          type="number" 
          className='w-16' 
          value={accouchementLocal[0]} 
          onChange={(event)=> handleChangeSemaines(event.currentTarget.value, 0)} 
          onBlur={()=> setSemainesIsFocused(false)} 
          onFocus={()=> setSemainesIsFocused(true)} 
        />

        <div>semaine(s) d’aménorrhées </div>
        <Plus/>
        <Input 
          type="number" 
          className='w-16' 
          value={accouchementLocal[1]} 
          onChange={(event)=> handleChangeSemaines(event.currentTarget.value, 1)} 
          onBlur={()=> setJoursIsFocused(false)} 
          onFocus={()=> setJoursIsFocused(true)} 
        />
        <div>jours par</div>
        <Select disabled={isPending} value={accouchementLocal[2]} onValueChange={(value: string)=> handleChangeSemaines(value, 2)}>
          <SelectTrigger className={`w-44 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value={"voies naturelles"}>voies naturelles</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value={"césarienne"}>césarienne</SelectItem>
          </SelectContent>
        </Select>
        | 
        <span className={`italic select-none ${openSans.className} ${accouchementLocal[3] === "" && "text-muted-foreground"}`}>L'accouchement a été déclenché.</span>
        <Switch disabled={isPending} checked={accouchementLocal[3] === "L'accouchement a été déclenché."} onCheckedChange={(checked: boolean)=> handleSwitchChange(checked)}/>
        <Input type='hidden' name='value' value={JSON.stringify(accouchementLocal)} />
        <Input type='hidden' name='key' value="accouchement" />
        <Input type='hidden' name='patientId' value={patientId} />
      </form>
    </div>
    
  )
}

export default Accouchement