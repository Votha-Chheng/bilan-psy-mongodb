import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertVisuomotriceNepsy2ByKeyValueAction } from '@/serverActions/testsActions/visuomotriceNepsy2Actions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForNoteStandard } from '@/utils/getColorCells'
import React, { useEffect, useState } from 'react'

const VisuomotriceNepsy2Table = () => {
  const {visuomotricenepsy2, bilanId, updatevisuomotricenepsy2} = useBilanTestsStore()
  const {precisionVisuoMoteur} = visuomotricenepsy2 ?? {}
  const [precisionVisuoMoteurLocal, setPrecisionVisuoMoteurLocal] = useState<string>("")

  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  useEffect(()=> {
    if(!precisionVisuoMoteur) return
    setPrecisionVisuoMoteurLocal(precisionVisuoMoteur)

  }, [precisionVisuoMoteur])

  const handleSaveResults = async(value: string)=> {
    if(value === "") {
      setPrecisionVisuoMoteurLocal(precisionVisuoMoteur ?? "")
      return
    } 
    setIsPending(true)
    const res = await upsertVisuomotriceNepsy2ByKeyValueAction<string>("precisionVisuoMoteur", value, bilanId ?? "")
    // eslint-disable-next-line
    res.success && setPrecisionVisuoMoteurLocal(value)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)

  }

  const updateFunction = ()=> {
    updatevisuomotricenepsy2(bilanId)
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
          <td className='border-collapse border border-black px-2 font-bold'>Précision visuomotrice</td>
          <td style={{backgroundColor:`${getBgColorForNoteStandard(+precisionVisuoMoteurLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5 justify-center`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleSaveResults(precisionVisuoMoteurLocal)}
              type='number' 
              className='w-16 p-1 h-8 bg-white text-center' 
              value={precisionVisuoMoteurLocal ?? ""} 
              onChange={(event)=> setPrecisionVisuoMoteurLocal(event.currentTarget.value)}
            /> 
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default VisuomotriceNepsy2Table