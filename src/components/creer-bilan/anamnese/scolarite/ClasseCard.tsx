import { ServiceResponse } from '@/@types/ServiceResponse'
import HiddenAnamneseForm from '@/components/forms/anamnese/HiddenAnamneseForm'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { listeClasses } from '@/datas/listeClasses'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { elementsInArrayAllEpmty } from '@/utils/checkIfNullOrEmptyFunctions'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useActionState, useEffect, useRef, useState } from 'react'

const ClasseCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const {classe} = anamneseResults ?? {}
  
  const [classeLocal, setClasseLocal] = useState<string>("")

  useEffect(()=> {
    if(!classe) return
    setClasseLocal(classe)
  }, [classe])

  const handleChangeState = async(value: string)=> {
    setIsPending(true)
    const res = await upsertAnamneseByKeyValueAction("classe", value, patientId)
    res && setState(res)
    res && setIsPending(false)
  }

  const updateFunction = ()=>{
    getAnamneseResultsByPatientId(patientId)
  }
  useToast({state, updateFunction})


  return (
    <Card className='mb-5 gap-y-2'>
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Classe actuelle</span> : </div> 
        <Select disabled={isPending} value={classeLocal} onValueChange={(value)=>handleChangeState(value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="classe" />
          </SelectTrigger>
          <SelectContent>
            {
              listeClasses.map((classe, index) => (
                <SelectItem key={index} value={classe}>{classe}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        {isPending && <Loader2 className='animate-spin' />}
      </div>
    </Card>
  )
}

export default ClasseCard
