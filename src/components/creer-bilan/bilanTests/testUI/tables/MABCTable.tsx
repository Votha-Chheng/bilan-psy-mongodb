import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertMABC2ByKeyValueAction } from '@/serverActions/testsActions/mabc2Actions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForTableTests } from '@/utils/getColorCells'
import { mabc2 } from '@prisma/client'
import React, { useEffect, useState } from 'react'

const MABCTable = () => {
  const {mabc2,  updatemabc2, bilanId} = useBilanTestsStore()
  const {dexteriteManuelle, viserAttraper, equilibre, total} = mabc2 ?? {}

  const [dexteriteManuelleLocal, setDexteriteManuelleLocal] = useState<string>("")
  const [viserAttraperLocal, setViserAttraperLocal] = useState<string>("")
  const [equilibreLocal, setEquilibreLocal] = useState<string>("")
  const [totalLocal, setTotalLocal] = useState<string>("")
  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  const handleUpsertMABC2Action = async(key: keyof mabc2, value: string): Promise<void>=> {
    if(value === "") {
      if(key === "dexteriteManuelle") setDexteriteManuelleLocal(dexteriteManuelle ?? "")
      if(key === "viserAttraper") setViserAttraperLocal(viserAttraper ?? "")
      if(key === "equilibre") setEquilibreLocal(equilibre ?? "")
      if(key === "total") setTotalLocal(total ?? "")
      return
    }
    setIsPending(true)
    const res = await upsertMABC2ByKeyValueAction(key, value, bilanId ?? null)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  useEffect(()=> {
    if(!mabc2) return
    setDexteriteManuelleLocal(dexteriteManuelle ?? "")
    setViserAttraperLocal(viserAttraper ?? "")
    setEquilibreLocal(equilibre ?? "")
    setTotalLocal(total ?? "")
  }, [mabc2])


  const updateFunction = ()=> {
    updatemabc2(bilanId)
  }

  useToast({state, updateFunction})

  return (
    <table className='border-collapse w-[500px] ml-5'>
      <tbody className='text-sm'>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Dextérité manuelle</td>
          <td style={{backgroundColor:`${getBgColorForTableTests(+dexteriteManuelleLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleUpsertMABC2Action("dexteriteManuelle", dexteriteManuelleLocal)}
              type='number' 
              className='w-12 p-1 h-8 bg-white text-center' 
              value={dexteriteManuelleLocal} 
              onChange={(event)=> setDexteriteManuelleLocal(event.currentTarget.value)}
            /> 
            <sup>{+dexteriteManuelleLocal === 0 ? "": +dexteriteManuelleLocal ===1 ? "er":"ème"}</sup> percentile
          </td>
        </tr>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Viser-attraper</td>
          <td style={{backgroundColor:`${getBgColorForTableTests(+viserAttraperLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleUpsertMABC2Action("viserAttraper", viserAttraperLocal)}
              type='number' 
              className='w-12 p-1 h-8 bg-white text-center' 
              value={viserAttraperLocal} 
              onChange={(event)=> setViserAttraperLocal(event.currentTarget.value)}
            /> 
            <sup>{+viserAttraperLocal === 0 ? "": +viserAttraperLocal ===1 ? "er":"ème"}</sup> percentile</td>
        </tr>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>&Eacute;quilibre</td>
          <td style={{backgroundColor:`${getBgColorForTableTests(+equilibreLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleUpsertMABC2Action("equilibre", equilibreLocal)}
              type='number' 
              className='w-12 p-1 h-8 bg-white text-center' 
              value={equilibreLocal} 
              onChange={(event)=> setEquilibreLocal(event.currentTarget.value)}
            /> 
            <sup>{+equilibreLocal === 0 ? "": +equilibreLocal ===1 ? "er":"ème"}</sup> percentile</td>
        </tr>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Total</td>
          <td style={{backgroundColor:`${getBgColorForTableTests(+totalLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleUpsertMABC2Action("total", totalLocal)}
              type='number' 
              className='w-12 p-1 h-8 bg-white text-center' 
              value={totalLocal} 
              onChange={(event)=> setTotalLocal(event.currentTarget.value)}
            /> 
            <sup>{+totalLocal === 0 ? "": +totalLocal ===1 ? "er":"ème"}</sup> percentile</td>
        </tr>
      </tbody>
    </table>
  )
}

export default MABCTable
