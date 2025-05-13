import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertEpreuveCubesNepsy2ByKeyValueAction } from '@/serverActions/testsActions/epreuveCubesNepsy2Action'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForNoteStandard } from '@/utils/getColorCells'
import React, { useEffect, useState } from 'react'

const EpreuveCubeNepsy2Table = () => {
  const {epreuvecubesnepsy2, updateEpreuveCubesNepsy2, bilanId} = useBilanTestsStore()
  const {scoreNS} = epreuvecubesnepsy2 ?? {}
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const [scoreNSLocal, setScoreNSLocal] = useState<string>("")

  useEffect(()=> {
    if(!scoreNS) return
    setScoreNSLocal(scoreNS)
  }, [scoreNS])

  const handleChangeValue = async()=> {
    setIsPending(true)
    const res = await upsertEpreuveCubesNepsy2ByKeyValueAction<string>("scoreNS", scoreNSLocal, bilanId ?? "")
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  useToast({state, updateFunction: ()=> updateEpreuveCubesNepsy2(bilanId)})
  
  return (
    <table className='border-collapse w-[500px] mb-5'>
      <tbody className='text-sm'>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Score en note standard</td>
          <td style={{backgroundColor:`${getBgColorForNoteStandard(+scoreNSLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5 justify-center`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleChangeValue()}
              type='number' 
              className='w-16 p-1 h-8 bg-white text-center' 
              value={scoreNSLocal} 
              onChange={(event)=> setScoreNSLocal(event.currentTarget.value)}
            /> 
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default EpreuveCubeNepsy2Table
