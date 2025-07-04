import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const DevoirsCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {devoirs} = anamneseResults ?? {}
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleChangeState = async(value: string)=> {
    setIsPending(true)
    const res = await upsertAnamneseByKeyValueAction("devoirs", value, patientId)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    updateAnamneseResultsByPatientId(patientId)
  }
  useToast({state, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <div className='flex gap-2.5 mb-3 items-center'>
        <div className='ml-7.5'>&bull; <span className='underline font-bold underline-offset-2'>Devoirs</span> : </div>
        <Select disabled={isPending} value={devoirs ?? ""} onValueChange={(value: string)=> handleChangeState(value)}>
          <SelectTrigger className={`w-96 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
          <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="Rien à signaler">Rien à signaler</SelectItem>
          <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="Opposition/Refus">Opposition/Refus</SelectItem>
          <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="Des difficultés">Des difficultés</SelectItem>
          </SelectContent>
        </Select>
        {isPending ? <Loader2 className='animate-spin'/> : <p className='w-6'></p>}
      </div>
    </Card>
  )
}

export default DevoirsCard