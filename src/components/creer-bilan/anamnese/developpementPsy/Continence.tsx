import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Continence = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {continence} = anamneseResults ?? {}
// eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIspending] = useState<boolean>(false)
  const [continenceLocal, setContinenceLocal] = useState<string[]>(["", "", "", ""])   //<---- [diurne, mois, nocturne, mois]
  const [ageDiurne, setAgeDiurne] = useState<string>("")
  const [ageNocturne, setAgeNocturne] = useState<string>("")

  const handleChangeElement = async(value: string, index: number)=> {
    if(value === "") return
    setIspending(true)
    const newState = [...continenceLocal] 
    newState[index] = value
    if(value==="diurne non acquise"){
      newState[1] = ""
    }
    if(value==="nocturne non acquise"){
      newState[3] = ""
    }
    const res = await upsertAnamneseByKeyValueAction("continence", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIspending(false)
    // eslint-disable-next-line
    res.success && setContinenceLocal(newState)
  }

  useEffect(()=> {
    if(!continence) return
    setContinenceLocal(continence)
    setAgeDiurne(continence[1])
    setAgeNocturne(continence[3])

  }, [continence])


  const updateFunction = ()=> {
    updateAnamneseResultsByPatientId(patientId)
  }
  useToast({state, updateFunction})


  return (
    <Card className='px-7.5 pt-1.5 mb-4 gap-0'>
      <div>&bull; <span className='underline font-bold underline-offset-2 whitespace-nowrap'>Continence</span> : </div>
      <div className='flex gap-2.5 items-center ml-5 mb-3'>
        - <span className={`underline underline-offset-2 ${openSans.className}`}>Continence diurne</span> :
        <Select disabled={isPending} value={continenceLocal[0]} onValueChange={(value) => handleChangeElement(value, 0)}>
          <SelectTrigger className={`w-36 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="diurne acquise">acquise</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="diurne non acquise">non acquise</SelectItem>
          </SelectContent>
        </Select>
        {    
          continenceLocal[0] === "diurne acquise" && 
          <div className='flex items-center gap-2.5'>
          <span className={`whitespace-nowrap ${openSans.className}`}>à l’âge de :</span>
          <Input  
            disabled={isPending} 
            className='w-20' 
            type='number' 
            value={ageDiurne}
            onBlur={()=> handleChangeElement(ageDiurne, 1)}
            onChange={(event)=> setAgeDiurne(event.currentTarget.value)}
          />
          <span className={`whitespace-nowrap ${openSans.className}`}>mois.</span>
        </div>
        }
      </div>
      <div className='flex gap-2.5 items-center ml-5'>
        - <span className={`underline underline-offset-2 ${openSans.className}`}>Continence nocturne</span> :
        <Select disabled={isPending} value={continenceLocal[2]} onValueChange={(value) => handleChangeElement(value, 2)}>
          <SelectTrigger className={`w-36 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="nocturne acquise">acquise</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="nocturne non acquise">non acquise</SelectItem>
          </SelectContent>
        </Select>
        {    
          continenceLocal[2] === "nocturne acquise" && 
          <div className='flex items-center gap-2.5'>
          <span className={`whitespace-nowrap ${openSans.className}`}>à l’âge de :</span>
          <Input 
            disabled={isPending} 
            value={ageNocturne}
            className='w-20' 
            type='number'
            onBlur={()=> handleChangeElement(ageNocturne, 3)}
            onChange={(event)=> setAgeNocturne(event.currentTarget.value)}
          />
          <span className={`whitespace-nowrap ${openSans.className}`}>mois.</span>
        </div>
        }
      </div>
    </Card>
  )
}

export default Continence
