import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertBilanByKeyValueAction } from '@/serverActions/bilanActions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const LateraliteUsuelle = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {lateralite, updateBilanByPatientId} = useBilanTestsStore()
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleChangeLateralite = async(value: string)=> {
    setIsPending(true)
    const res = await upsertBilanByKeyValueAction<string>("lateralite", value, patientId)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    updateBilanByPatientId(patientId)
  }
  useToast({state, updateFunction})

  return (
    <Card className={`py-5 px-3.5 my-5 w-full`}>
      <p className='text-sm flex items-center gap-x-2 mb-5 ml-5'>
        &bull; <span className='underline underline-offset-4'>Latéralité usuelle</span> : 
        <Select value={lateralite ?? ""} onValueChange={(value)=> handleChangeLateralite(value)} disabled={isPending}>
          <SelectTrigger className="w-[150px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"main droite"}>main droite</SelectItem>
            <SelectItem value={"main gauche"}>main gauche</SelectItem>
          </SelectContent>
        </Select>
      </p>
    </Card>
  )
}

export default LateraliteUsuelle
