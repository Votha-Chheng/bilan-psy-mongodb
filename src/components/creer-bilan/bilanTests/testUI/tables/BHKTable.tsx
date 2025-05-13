import { BHKResultsDTO } from '@/@types/BilanTests'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { useToast } from '@/customHooks/useToast'
import { upsertBHKResultsAction } from '@/serverActions/testsActions/bhkActions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForDeviationStandard } from '@/utils/getColorCells'
import React, { useEffect, useState } from 'react'

const BHKTable = () => {
  const {bhk, updatebhk, bilanId} = useBilanTestsStore()
  const {qualiteEcriture, vitesseEcriture} = bhk ?? {}

  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  const [qualiteLocal, setQualiteLocal] = useState<string>("")
  const [vitesseLocal, setVitesseLocal] = useState<string>("")

  useEffect(()=> {
    if(!bhk) return
    setQualiteLocal(qualiteEcriture ?? "")
    setVitesseLocal(vitesseEcriture ?? "")
  }, [bhk])

  const handleChangeStateAction = async(value: string, keyBHK: keyof BHKResultsDTO)=> {
    setIsPending(true)
    const res = await upsertBHKResultsAction(keyBHK, value, bilanId ?? "")
    if(res.success) {
      // eslint-disable-next-line
      keyBHK === "qualiteEcriture" && setQualiteLocal(value)
      // eslint-disable-next-line
      keyBHK === "vitesseEcriture" && setVitesseLocal(value)
    } 
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  useToast({
    state,
    updateFunction : ()=> {
      updatebhk(bilanId)
    }
  })

  return (
    <table className='border-collapse w-[500px] mb-5'>
      <tbody className='text-sm'>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black'></td>
          <td className='border-collapse border border-black text-center'>Score en déviation standard</td>
        </tr>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Qualité d’écriture</td>
          <td style={{backgroundColor:`${getBgColorForDeviationStandard(+qualiteLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5 justify-center`}>
            <Input  
              disabled={isPending}
              onBlur={()=> handleChangeStateAction(qualiteLocal, "qualiteEcriture")}
              type='number' 
              className='w-16 p-1 h-8 bg-white text-center' 
              value={qualiteLocal} 
              onChange={(event)=> setQualiteLocal(event.currentTarget.value)}
            /> 
          </td>
        </tr>
        <tr className='border-collapse border border-black'>
          <td className='border-collapse border border-black px-2 font-bold'>Vitesse d’écriture</td>
          <td style={{backgroundColor:`${getBgColorForDeviationStandard(+vitesseLocal)}`}} className={`inline-flex gap-2 items-center border-collapse w-full px-5 justify-center`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleChangeStateAction(vitesseLocal, "vitesseEcriture")}
              type='number' 
              className='w-16 p-1 h-8 bg-white text-center' 
              value={vitesseLocal} 
              onChange={(event)=> setVitesseLocal(event.currentTarget.value)}
            /> 
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default BHKTable