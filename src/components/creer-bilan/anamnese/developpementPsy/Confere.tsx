import { ServiceResponse } from '@/@types/ServiceResponse'
import SubmitAndInputForm from '@/components/forms/SubmitAndInputForm'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { createDevPsyConfereAction } from '@/serverActions/devPsyConfereActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Confere = () => {
    const {id: patientId} = useParams<{id: string}>()
    const {devPsyConfereListe, getDevPsyConfereList, anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
    const {confereDevPsy} = anamneseResults ?? {}
  // eslint-disable-next-line
    const [state, setState] = useState<ServiceResponse<any>>({})
    const [isPending, setIsPending] = useState<boolean>(false)
  
    useEffect(()=> {
      getDevPsyConfereList()
    }, [])
  
    const handleChangeConfereAction = async(value: string)=> {
      setIsPending(true)
      const res = await upsertAnamneseByKeyValueAction("confereDevPsy", value, patientId)
      // eslint-disable-next-line
      res && setState(res)
      // eslint-disable-next-line
      res && setIsPending(false)
    }
  
    const updateFunction = ()=> {
      getAnamneseResultsByPatientId(patientId)
    }
  
    useToast({state, updateFunction})
  
  return (
    <>
      <div className='whitespace-nowrap'>Confère :</div> 
        <Select disabled={isPending} value={confereDevPsy ?? "néant"} onValueChange={(value: string)=> handleChangeConfereAction(value)}>
          <SelectTrigger className={`w-[350px] mr-5 tracking-wide ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem  className={`font-normal tracking-wide ${openSans.className}`} value="néant">néant</SelectItem>
            {
              devPsyConfereListe.map(confere=> (
                <SelectItem className={`font-normal tracking-wide ${openSans.className}`} key={confere} value={confere}>{confere}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <SubmitAndInputForm name="confereDevPsy" actionFunction={createDevPsyConfereAction} label={<><Plus/> Ajouter un choix</>} />
    </>
  )
}

export default Confere