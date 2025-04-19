import AddAdjectifComportementForm from '@/components/forms/anamnese/AddAdjectifComportementForm'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AddCommentaireOuObservations from '../AddComentaireOuObservations'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Loader2 } from 'lucide-react'

const AcquisitionLangage = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {acquisitionLangage } = anamneseResults ?? {}

  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIspending] = useState<boolean>(false)
  const [acquisitionLangageLocal, setAcquisitionLangageLocal] = useState<string[]>(["", "", ""]) //<---- 

  const handleChangeElement = async(value: string, index: number)=> {
    setIspending(true)
    const newValue = value
    let newState = [...acquisitionLangageLocal] 
    newState[index] = newValue
    const res = await upsertAnamneseByKeyValueAction("acquisitionLangage", JSON.stringify(newState), patientId)
    res && setState(res)
    res && setIspending(false)
  }

  useEffect(()=> {
    if(acquisitionLangage){
      setAcquisitionLangageLocal(acquisitionLangage)
    }
  }, [acquisitionLangage])

  
  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }

  useToast({state, updateFunction})

  return (
    <Card className='pt-1.5 my-5 gap-0'>
      <div className='flex gap-2.5 items-center px-7.5 mb-5'>
        <div className='whitespace-nowrap'>&bull; <span className='underline font-bold underline-offset-2'>Acquisition du langage</span> : </div>
        <Select disabled={isPending} value={acquisitionLangageLocal[0]} onValueChange={(value: string)=> handleChangeElement(value, 0)}>
          <SelectTrigger className={`w-44 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="des difficultés">avant la marche</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="après la marche">après la marche</SelectItem>
          </SelectContent>
        </Select>
        |
        <span className='underline font-bold underline-offset-2 whitespace-nowrap'>Niveau actuel</span> :
        <Select disabled={isPending} value={acquisitionLangageLocal[1]} onValueChange={(value: string)=> handleChangeElement(value, 1)}>
          <SelectTrigger className={`w-52 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="avant la marche">des difficultés</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="bonne maîtrise">bonne maîtrise</SelectItem>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="très bonne maîtrise">très bonne maîtrise</SelectItem>
          </SelectContent>
        </Select>
        {isPending && <Loader2 className='animate-spin' />}
      </div>
      <AddCommentaireOuObservations
        actionFunction={upsertAnamneseBySingleKeyValueWithFormDataAction} 
        commentaireObservationFromDB={acquisitionLangage?.[2]} 
        commentaireObservationFromLocal={acquisitionLangageLocal[2]} 
        completeArrayStateLocal={acquisitionLangageLocal}
        setCompleteArrayStateLocal={setAcquisitionLangageLocal}
        stateIfCommentObsIsNull={[acquisitionLangageLocal[0], acquisitionLangageLocal[1], ""]}
        commentObsIndex={2}
        keyAnamnese="acquisitionLangage"
        label="observation" 
        themeTitle="Acquisition du langage"
      />

    </Card>
  )
}

export default AcquisitionLangage
