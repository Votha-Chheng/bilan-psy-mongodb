import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertImitationNepsy2ByKeyValueAction } from '@/serverActions/testsActions/imitationNepsy2Actions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForNoteStandard } from '@/utils/getColorCells'
import React, { useEffect, useState } from 'react'

const ImitationPosisitionNepsy2Table = () => {
  const {imitationpositionsnepsy2, bilanId, updateImitationNepsy2} = useBilanTestsStore()
  const {imitationGestesMains} = imitationpositionsnepsy2 ?? {}
  const [imitationGestesMainsLocal, setImitationGestesMainsLocal] = useState<string>("")
  
  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  useEffect(()=> {
    if(!imitationGestesMains) return
    setImitationGestesMainsLocal(imitationGestesMains)

  }, [imitationGestesMains])

  const handleSaveResults = async(value: string)=> {
    if(value === "") {
      setImitationGestesMainsLocal(imitationGestesMains ?? "")
      return
    } 
    setIsPending(true)
    const res = await upsertImitationNepsy2ByKeyValueAction<string>("imitationGestesMains", value, bilanId ?? "")
    // eslint-disable-next-line
    res.success && setImitationGestesMainsLocal(value)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)

  }

  const updateFunction = ()=> {
    updateImitationNepsy2(bilanId)
  }
  useToast({state, updateFunction})

  return (
    <table className='border-collapse w-[500px] mb-5'>
      <tbody className='text-sm'>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'></td>
          <td className={`inline-flex gap-2 items-center border-collapse w-full px-5`}>
            Score en note étalonnée
          </td> 
        </tr>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Imitation des gestes mains</td>
          <td style={{backgroundColor:`${getBgColorForNoteStandard(+imitationGestesMainsLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5 justify-center`}>
            <Input 
              disabled={isPending}
              type='number' 
              className='w-16 p-1 h-8 bg-white text-center' 
              value={imitationGestesMainsLocal} 
              onBlur={()=> handleSaveResults(imitationGestesMainsLocal)}
              onChange={(event)=> setImitationGestesMainsLocal(event.currentTarget.value)}
            /> 
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ImitationPosisitionNepsy2Table