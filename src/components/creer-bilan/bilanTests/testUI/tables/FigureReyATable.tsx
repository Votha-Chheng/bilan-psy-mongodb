import { FiguresReyAResultsDTO } from '@/@types/BilanTests'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { planificationFigureREY } from '@/datas/planificationFigureRey'
import { upsertFigureReyAByKeyValueAction } from '@/serverActions/testsActions/figureReyAActions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { getBgColorForDeviationStandard, getBgColorForPercentiles } from '@/utils/getColorCells'
import React, { useEffect, useState } from 'react'

const FigureReyATable = () => {
  const {figuresreya, bilanId, updateFiguresReya} = useBilanTestsStore()
  const {copieModeleDS, copieModeleDureePercentile, memoireDS, memoirePercentile, planificationMemoire, planificationModele} = figuresreya ?? {}

  const [copieModeleDSLocal, setCopieModeleDSLocal] = useState<string>("")
  const [copieModeleDureePercentileLocal, setCopieModeleDureePercentileLocal] = useState<string>("")

  const [memoireDSLocal, setMemoireDSLocal] = useState<string>("")
  const [memoirePercentileLocal, setMemoirePercentileLocal] = useState<string>("")

  const [isPending, setIsPending] = useState<boolean>(false)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  useEffect(()=> {
    if(!figuresreya) return
    setCopieModeleDSLocal(copieModeleDS ?? "")
    setCopieModeleDureePercentileLocal(copieModeleDureePercentile ?? "")
    setMemoireDSLocal(memoireDS ?? "")
    setMemoirePercentileLocal(memoirePercentile ?? "")
  }, [figuresreya])

  const handleChangeState = async(value: string, keyFigureA: keyof FiguresReyAResultsDTO)=> {
    setIsPending(true)
    const res = await upsertFigureReyAByKeyValueAction<string>(keyFigureA, value, bilanId ?? "")
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)

  }
  
  useToast({state, updateFunction : ()=> updateFiguresReya(bilanId)})

  return (
    <table className='border-collapse w-[800px] mb-5 table-fixed'>
      <tbody className='text-sm border-collapse w-[750px]'>
        <tr className='border-collapse border border-black w-[750px]'>
          <td width={200} className='border-collapse border border-black px-2 font-bold'></td>
          <td width={200} className={`border-collapse px-5 border-r border-black`}>
            Score en DS
          </td>
          <td  width={200} className={`border-collapse px-5 border-r border-black`}>
            Durée en percentile
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
          <td width={250} className={`border-collapse w-1/2 px-5 border-r border-l border-black `} style={{backgroundColor:`#${getBgColorForPercentiles(+copieModeleDureePercentileLocal)}`}}>
            <div className='flex items-center gap-x-2 justify-center'>
              <Input 
                disabled={isPending}
                onBlur={()=> handleChangeState(copieModeleDureePercentileLocal, "copieModeleDureePercentile")}
                type='number' 
                className='w-12 p-1 h-8 text-center bg-white' 
                value={copieModeleDureePercentileLocal} 
                onChange={(event)=> setCopieModeleDureePercentileLocal(event.currentTarget.value)}
              /> 
              <sup>{+copieModeleDureePercentileLocal === 0 ? "": +copieModeleDureePercentileLocal ===1 ? "er":"ème"}</sup> percentile
            </div>
          </td>
          <td width={250} >
            <Select value={planificationModele ?? ""} onValueChange={(value)=> handleChangeState(value, "planificationModele")}>
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
          <td width={200} style={{backgroundColor:`${getBgColorForDeviationStandard(+memoireDSLocal)}`}} className={`h-[43px]  items-center border-collapse border-r border-black px-5 flex justify-center`}>
            <Input 
              disabled={isPending}
              onBlur={()=>  handleChangeState(memoireDSLocal, "memoireDS")}
              type='number' 
              className='w-12 p-1 h-8 bg-white text-center' 
              value={memoireDSLocal} 
              onChange={(event)=> setMemoireDSLocal(event.currentTarget.value)}
            /> 
          </td>
          <td width={200} className={`border-collapse px-5 border-r border-l border-black`} style={{backgroundColor:`#${getBgColorForPercentiles(+memoirePercentileLocal)}`}}>
            <div className='flex items-center gap-x-2 justify-center'>
              <Input 
                disabled={isPending}
                onBlur={()=> handleChangeState(memoirePercentileLocal, "memoirePercentile")}
                type='number' 
                className='w-12 p-1 h-8 bg-white text-center' 
                value={memoirePercentileLocal} 
                onChange={(event)=> setMemoirePercentileLocal(event.currentTarget.value)}
              />
              <sup>{+memoirePercentileLocal === 0 ? "": +memoirePercentileLocal ===1 ? "er":"ème"}</sup> percentile 
            </div>
          </td>
          <td width={200} >
            <Select value={planificationMemoire ?? ""} disabled={isPending} onValueChange={(value)=> handleChangeState(value, "planificationMemoire")}>
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

export default FigureReyATable
