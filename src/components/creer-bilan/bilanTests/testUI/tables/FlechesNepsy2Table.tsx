import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertFlechesNepsy2ResultsAction } from '@/serverActions/testsActions/flechesNepsy2Actions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForNoteStandard } from '@/utils/getColorCells'
import React, { useEffect, useState } from 'react'

const FlechesNepsy2Table = () => {
  const {flechesnepsy2, updateFlechesNepsy2, bilanId} = useBilanTestsStore()
  const {score} = flechesnepsy2 ?? {}

  const [isPending, setIsPending] = useState<boolean>(false)
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [scoreLocal, setScoreLocal] = useState<string>("")

  const handleSaveResults =  async(value: string)=> {
    setIsPending(true)
    const res = await upsertFlechesNepsy2ResultsAction("score", value, bilanId ?? "")
    res.success && setScoreLocal(value)
    res && setState(res)
    res && setIsPending(false)
  }

  useEffect(()=> {
    if(!flechesnepsy2) return
    setScoreLocal(score ?? "")
  }, [flechesnepsy2])

  useToast({
    state,
    updateFunction: ()=> {
      updateFlechesNepsy2(bilanId)
    }
  })

  return (
    <table className='border-collapse w-[500px] mb-5'>
      <tbody className='text-sm'>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'></td>
          <td className={`inline-flex gap-2 items-center border-collapse w-full px-5`}>
            Score en Note Etalonnée
          </td> 
        </tr>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Imitation des gestes mains</td>
          <td style={{backgroundColor:`${getBgColorForNoteStandard(+scoreLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5 justify-center`}>
            <Input 
              disabled={isPending}
              type='number' 
              className='w-16 p-1 h-8 bg-white text-center' 
              value={scoreLocal} 
              onBlur={()=> handleSaveResults(scoreLocal)}
              onChange={(event)=> setScoreLocal(event.currentTarget.value)}
            /> 
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default FlechesNepsy2Table
