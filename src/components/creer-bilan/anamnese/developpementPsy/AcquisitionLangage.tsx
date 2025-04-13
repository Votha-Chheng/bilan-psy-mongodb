import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import React, { useActionState, useEffect, useRef, useState } from 'react'

const AcquisitionLangage = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {acquisitionLangage } = anamneseResults ?? {}
  const [state, formAction, isPending] = useActionState(upsertAnamneseBySingleKeyValueWithFormDataAction, {})
  const [acquisitionLangageLocal, setAcquisitionLangageLocal] = useState<string[]>(["", "", ""])
  const [inPutFocus, setInputFocus] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const handleChangeElement = (value: string, index: number)=> {
    const newValue = value
    let newState = [...acquisitionLangageLocal] 
    newState[index] = newValue
    setAcquisitionLangageLocal(newState)
  }

  useEffect(()=> {
    if(acquisitionLangage){
      setAcquisitionLangageLocal(acquisitionLangage)
    }
  }, [acquisitionLangage])

  useEffect(() => {
    if(!acquisitionLangage && acquisitionLangageLocal[0] === "" && acquisitionLangageLocal[1]==="" && acquisitionLangageLocal[2]==="") return
    if(acquisitionLangageLocal[0] === "" && acquisitionLangageLocal[1]==="") return
    if(acquisitionLangage && acquisitionLangageLocal[0] === acquisitionLangage[0] && acquisitionLangageLocal[1]===acquisitionLangage[1] && acquisitionLangageLocal[2]===acquisitionLangage[2]) return
    if(inPutFocus) return
  
    formRef.current?.requestSubmit()

  }, [acquisitionLangage, acquisitionLangageLocal, inPutFocus])
  
  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }

  useToast({state, updateFunction})

  return (
    <Card className='px-7.5 pt-1.5 mb-4 gap-0'>
      <div className='flex gap-2.5 items-center'>
        <div className='whitespace-nowrap'>&bull; <span className='underline font-bold underline-offset-2'>Acquisition du langage</span> : </div>
        <Select disabled={isPending} value={acquisitionLangageLocal[0]} onValueChange={(value: string)=> handleChangeElement(value, 0)}>
          <SelectTrigger className={`w-44 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="des difficultés">avant la marche</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="après la marche">après la marche</SelectItem>
          </SelectContent>
        </Select>
        |
        <span className='underline font-bold underline-offset-2 whitespace-nowrap'>Niveau actuel</span> :
        <Select disabled={isPending} value={acquisitionLangageLocal[1]} onValueChange={(value: string)=> handleChangeElement(value, 1)}>
          <SelectTrigger className={`w-52 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="avant la marche">des difficultés</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="bonne maîtrise">bonne maîtrise</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="très bonne maîtrise">très bonne maîtrise</SelectItem>
          </SelectContent>
        </Select>
        | 
        <span className='underline font-bold underline-offset-2 whitespace-nowrap'>Observation pertinentes :</span>
        <Input 
          type='text'
          className='w-[650px]' 
          value={acquisitionLangageLocal[2]} 
          onChange={(event)=> handleChangeElement(event.currentTarget.value, 2)} 
          onBlur={()=> setInputFocus(false)} 
          onFocus={()=> setInputFocus(true)} 
        />
      </div>

      <form action={formAction} ref={formRef} className='flex items-center gap-2.5'>
        <input type='hidden' name='key' value="acquisitionLangage" />
        <input type='hidden' name='value' value={JSON.stringify(acquisitionLangageLocal)}/>
        <input type='hidden' name='patientId' value={patientId}/>
      </form>
    </Card>
  )
}

export default AcquisitionLangage
