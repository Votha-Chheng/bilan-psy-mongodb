import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { planificationFigureREY } from '@/datas/planificationFigureRey'
import { upsertFigureReyBByKeyValueAction } from '@/serverActions/testsActions/figureReyBActions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForDeviationStandard } from '@/utils/getColorCells'
import { figuresreyb } from '@prisma/client'
import React, { useEffect, useState } from 'react'

const FigureReyBTable = () => {
  const {figuresreyb, bilanId, updateFiguresReyb} = useBilanTestsStore()
  const {copieModeleDS, copieModeleDureeDS, memoireModeleDureeDS, copiePlanification, memoireModeleDS, memoirePlanification} = figuresreyb ?? {}

  const [copieModeleDSLocal, setCopieModeleDSLocal] = useState<string>("")
  const [copieModeleDureeDSLocal, setCopieModeleDureeDSLocal] = useState<string>("")

  const [memoireModeleDSLocal, setMemoireModeleDSLocal] = useState<string>("")
  const [memoireModeleDureeDSLocal, setMemoireModeleDureeDSLocal] = useState<string>("")

  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  useEffect(()=> {
    if(!figuresreyb) return
    setCopieModeleDSLocal(copieModeleDS ?? "")
    setCopieModeleDureeDSLocal(copieModeleDureeDS ?? "")
    setMemoireModeleDSLocal(memoireModeleDS ?? "")
    setMemoireModeleDureeDSLocal(memoireModeleDureeDS?? "")
  }, [figuresreyb])

  const handleChangeState = async(value: string, keyFigureB: keyof figuresreyb)=> {
    setIsPending(true)
    const res = await upsertFigureReyBByKeyValueAction<string>(keyFigureB, value, bilanId ?? "")
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)

  }
  
  useToast({state, updateFunction : ()=> updateFiguresReyb(bilanId)})

  return (
    <table className='border-collapse w-[800px] mb-5 table-fixed'>
      <tbody className='text-sm border-collapse w-[750px]'>
        <tr className='border-collapse border border-black w-[750px]'>
          <td width={200} className='border-collapse border border-black px-2 font-bold'></td>
          <td width={200} className={`border-collapse px-5 border-r border-black`}>
            Score en DS
          </td>
          <td  width={200} className={`border-collapse px-5 border-r border-black`}>
            Durée en déviation standard
          </td>
          <td width={200} className={`border-collapse px-5 border-r border-black`}>
            Planification
          </td>
        </tr>
        <tr className='border-collapse border border-black'>
          <td width={200} className='border-collapse border-r border-black px-2 font-bold'>En copie avec modèle</td>
          <td width={200} style={{backgroundColor:`${getBgColorForDeviationStandard(+copieModeleDSLocal)}`}} className={`h-[43px] border-collapse border-r px-5 border-black flex items-center justify-center`}>
            <Input 
              disabled={isPending}
              onBlur={()=> handleChangeState(copieModeleDSLocal, "copieModeleDS")}
              type='number' 
              className='w-12 p-1 h-8 bg-white text-center' 
              value={copieModeleDSLocal} 
              onChange={(event)=> setCopieModeleDSLocal(event.currentTarget.value)}
            /> 
          </td>
          <td width={250} className={`border-collapse w-1/2 px-5 border-r border-l border-black `} style={{backgroundColor:`${getBgColorForDeviationStandard(+copieModeleDureeDSLocal)}`}}>
            <div className='flex items-center gap-x-2 justify-center'>
              <Input 
                disabled={isPending}
                onBlur={()=> handleChangeState(copieModeleDureeDSLocal, "copieModeleDureeDS")}
                type='number' 
                className='w-12 p-1 h-8 text-center bg-white' 
                value={copieModeleDureeDSLocal} 
                onChange={(event)=> setCopieModeleDureeDSLocal(event.currentTarget.value)}
              /> 
            </div>
          </td>
          <td width={250} >
            <Select value={copiePlanification ?? ""} onValueChange={(value)=> handleChangeState(value, "copiePlanification")}>
              <SelectTrigger className="w-[180px] text-sm mx-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    planificationFigureREY.map((planification)=> (
                      <SelectItem key={planification.type} value={planification.type}>{`Type ${planification.type}` }</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </td>
        </tr>
        <tr className='border-collapse border border-black'>
          <td width={200} className='border-collapse border-r border-black px-2 font-bold'>De mémoire</td>
          <td width={200} style={{backgroundColor:`${getBgColorForDeviationStandard(+memoireModeleDSLocal)}`}} className={`h-[43px]  items-center border-collapse border-r border-black px-5 flex justify-center`}>
            <Input 
              disabled={isPending}
              onBlur={()=>  handleChangeState(memoireModeleDSLocal, "memoireModeleDS")}
              type='number' 
              className='w-12 p-1 h-8 bg-white text-center' 
              value={memoireModeleDSLocal} 
              onChange={(event)=> setMemoireModeleDSLocal(event.currentTarget.value)}
            /> 
          </td>
          <td width={200} className={`border-collapse px-5 border-r border-l border-black`} style={{backgroundColor:`${getBgColorForDeviationStandard(+memoireModeleDureeDSLocal)}`}}>
            <div className='flex items-center gap-x-2 justify-center'>
              <Input 
                disabled={isPending}
                onBlur={()=> handleChangeState(memoireModeleDureeDSLocal, "memoireModeleDureeDS")}
                type='number' 
                className='w-12 p-1 h-8 bg-white text-center' 
                value={memoireModeleDureeDSLocal} 
                onChange={(event)=> setMemoireModeleDureeDSLocal(event.currentTarget.value)}
              />
            </div>
          </td>
          <td width={200} >
            <Select value={memoirePlanification ?? ""} disabled={isPending} onValueChange={(value)=> handleChangeState(value, "memoirePlanification")}>
              <SelectTrigger className="w-[180px] text-sm mx-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    planificationFigureREY.map((planification)=> (
                      <SelectItem key={planification.type} value={planification.type}>{`Type ${planification.type}` }</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default FigureReyBTable
