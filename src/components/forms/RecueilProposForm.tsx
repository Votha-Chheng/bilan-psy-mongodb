import React, { useActionState, useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Loader2 } from 'lucide-react'
import { upsertProposPapaOuMamanAction } from '@/serverActions/anamneseActions'
import { toast } from 'sonner'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { useParams } from 'next/navigation'

const RecueilProposForm = () => {
  const {id} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  useEffect(()=> {
    if(state.success === true){
      toast.success(state.message)
      updatePatientInfoFromDB(id)
    }
    if(state.success === false){
      toast.error(state.message)
    }
    
  }, [state])

  const handleValueChange = async (value: string) => {
    setIsPending(true)
    const response = await upsertProposPapaOuMamanAction(id, value)
    setState(response)
    response && setIsPending(false)
  }

  return (
    <Card className={`relative py-2 my-5 justify-start items-center flex ${!Boolean(anamneseResults?.proposPapaOuMaman) && "border-orange-700" }`}>
      <div  className={`flex gap-x-2 items-center p-2.5 ${isPending && 'opacity-50 select-none pointer-events-none'}`} >
        <span className='font-bold'>Les propos sont recueillis auprès </span>
        <Select  
          value={anamneseResults?.proposPapaOuMaman ?? undefined}
          onValueChange={(value) => handleValueChange(value)}
        >
          <SelectTrigger className='w-44 font-bold'>
            <SelectValue/>
          </SelectTrigger>
          <SelectContent className='font-bold'>
            <SelectGroup>
              <SelectItem value="de la mère">de la mère</SelectItem>
              <SelectItem value="du père">du père</SelectItem>
              <SelectItem value="des deux parents">des deux parents</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <span className='font-bold relative'>de l’enfant et en présence de celui-ci.{isPending && <Loader2 className='animate-spin absolute -right-7.5 top-0' />}</span>
      </div>
    </Card>
  )
}

export default RecueilProposForm
