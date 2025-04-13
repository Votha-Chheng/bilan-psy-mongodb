import { ServiceResponse } from '@/@types/ServiceResponse'
import SubmitAndInputForm from '@/components/forms/SubmitAndInputForm'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { createDevPsyConfereAction } from '@/serverActions/devPsyConfereActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Confere = () => {
    const {id: patientId} = useParams<{id: string}>()
    const {devPsyConfereListe, getDevPsyConfereList} = useAnamneseSearchDBStore()
    const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
    const {confereDevPsy} = anamneseResults ?? {}
  
  
    const [state, setState] = useState<ServiceResponse<any>>({})
    const [isPending, setIsPending] = useState<boolean>(false)
  
    useEffect(()=> {
      getDevPsyConfereList()
    }, [])
  
    const handleChangeConfereAction = async(value: string)=> {
      setIsPending(true)
      const res = await upsertAnamneseByKeyValueAction("confereDevPsy", value, patientId)
      res && setState(res)
      res && setIsPending(false)
    }
  
    const updateFunction = ()=> {
      updatePatientInfoFromDB(patientId)
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