import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import React, { useActionState, useEffect, useRef, useState } from 'react'

const Continence = () => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {continence} = anamneseResults ?? {}
  const [continenceLocal, setContinenceLocal] = useState<string[]>(["", "", "", ""])
  const [diurneFocus, setDiurneFocus] = useState<boolean>(false) 
  const [nocturneFocus, setNocturneFocus] = useState<boolean>(false) 

  const formRef = useRef<HTMLFormElement>(null)

  const handleChangeElement = (value: string, index: number)=> {
    let newState = [...continenceLocal] 
    newState[index] = value
    if(value==="diurne non acquise"){
      newState[1] = ""
    }
    if(value==="nocturne non acquise"){
      newState[3] = ""
    }

    setContinenceLocal(newState)
  }

  const handleChangeMois = (value: string, index: number)=> {
    let newState = [...continenceLocal] 
    newState[index] = value
    setContinenceLocal(newState)
  }

  useEffect(()=> {
    if(!continence) return
    if(continence && continenceLocal[0]===continence[0] && continenceLocal[1] === continence[1] && continenceLocal[2] === continence[2] && continenceLocal[3] === continence[3]) return
    setContinenceLocal(continence)

  }, [continence])

  useEffect(()=> {
    if(continence && continenceLocal[0]==="" && continenceLocal[1]==="" && continenceLocal[2]==="" && continenceLocal[3]==="") return
    if(continenceLocal[0]==="") return
    if(continence && continenceLocal[0]===continence[0]) return
    formRef.current?.requestSubmit()
  }, [continenceLocal[0], diurneFocus])

  useEffect(()=> {
    if(continence && continenceLocal[0]==="" && continenceLocal[1]==="" && continenceLocal[2]==="" && continenceLocal[3]==="") return
    if(continenceLocal[2]==="") return
    if(continence && continenceLocal[2]===continence[2]) return
    formRef.current?.requestSubmit()
  }, [continenceLocal[2], nocturneFocus])

  useEffect(()=> {
    if(continence && continenceLocal[0]==="" && continenceLocal[1]==="" && continenceLocal[2]==="" && continenceLocal[3]==="") return
    if(continenceLocal[1]==="") return
    if(continence && continenceLocal[1]===continence[1]) return
    if(diurneFocus) return
    formRef.current?.requestSubmit()
  }, [continenceLocal[1], diurneFocus])

  useEffect(()=> {
    if(continence && continenceLocal[0]==="" && continenceLocal[1]==="" && continenceLocal[2]==="" && continenceLocal[3]==="") return
    if(continenceLocal[3]==="") return
    if(continence && continenceLocal[3]===continence[3]) return
    if(nocturneFocus) return
    formRef.current?.requestSubmit()
  }, [continenceLocal[3], nocturneFocus])

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }
  useToast({state, updateFunction})


  return (
    <Card className='px-7.5 pt-1.5 mb-4 gap-0'>
      <div>&bull; <span className='underline font-bold underline-offset-2 whitespace-nowrap'>Continence</span> : </div>
      <div className='flex gap-2.5 items-center ml-5 mb-3'>
        - <span className={`underline underline-offset-2 ${openSans.className}`}>Continence diurne</span> :
        <Select disabled={isPending} value={continenceLocal[0]} onValueChange={(value) => handleChangeElement(value, 0)}>
          <SelectTrigger className={`w-36 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="diurne acquise">acquise</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="diurne non acquise">non acquise</SelectItem>
          </SelectContent>
        </Select>
        {    
          continenceLocal[0] === "diurne acquise" && 
          <div className='flex items-center gap-2.5'>
          <span className={`whitespace-nowrap ${openSans.className}`}>à l'âge de :</span>
          <Input  
            disabled={isPending} 
            className='w-20' 
            type='number' 
            value={continenceLocal[1]}
            onBlur={()=> setDiurneFocus(false)} 
            onFocus={()=> setDiurneFocus(true)} 
            onChange={(event)=> handleChangeMois(event.currentTarget.value, 1)}
          />
          <span className={`whitespace-nowrap ${openSans.className}`}>mois.</span>
        </div>
        }
      </div>
      <div className='flex gap-2.5 items-center ml-5'>
        - <span className={`underline underline-offset-2 ${openSans.className}`}>Continence nocturne</span> :
        <Select disabled={isPending} value={continenceLocal[2]} onValueChange={(value) => handleChangeElement(value, 2)}>
          <SelectTrigger className={`w-36 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="nocturne acquise">acquise</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="nocturne non acquise">non acquise</SelectItem>
          </SelectContent>
        </Select>
        {    
          continenceLocal[2] === "nocturne acquise" && 
          <div className='flex items-center gap-2.5'>
          <span className={`whitespace-nowrap ${openSans.className}`}>à l'âge de :</span>
          <Input 
            disabled={isPending} 
            value={continenceLocal[3]}
            className='w-20' 
            type='number' 
            onBlur={()=> setNocturneFocus(false)} 
            onFocus={()=> setNocturneFocus(true)} 
            onChange={(event)=> handleChangeMois(event.currentTarget.value, 3)}
          />
          <span className={`whitespace-nowrap ${openSans.className}`}>mois.</span>
        </div>
        }
      </div>

      <form ref={formRef} action={formAction} className='flex items-center gap-2.5'>
        <input type='hidden' name='key' value="continence" />
        <input type='hidden' name='value' value={JSON.stringify(continenceLocal)}/>
        <input type='hidden' name='patientId' value={patientId}/>
      </form>
    </Card>
  )
}

export default Continence
