import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import { Loader2, MoveRight } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import BilansMedicaux from './BilansMedicaux'
import DossierMDPHForm from '@/components/creer-bilan/anamnese/antecedents/DossierMDPH'
import AntecedentsBody from './AntecedentsBody'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { useToast } from '@/customHooks/useToast'
import { Separator } from '@/components/ui/separator'

const AntecedentsPart:FC = ({}) => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB} = usePatientInfoStore()
  const {neant} = anamneseResults ?? {}
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleChangeNeant = async(neant: boolean)=> {
    setIsPending(true)
    const res = await upsertAnamneseByKeyValueAction("neant", JSON.stringify(neant), patientId)
    if(res){
      setState(res)
      setIsPending(false)
    }
  }

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
  }

  useToast({state, updateFunction})

  return (
    <AnamneseItemLayout >   
      <div className='flex gap-x-2 font-bold mb-5 items-center min-w-full'>
        <MoveRight/>
        <span>Pas d'antécédents médicaux : </span>
        <Switch checked={neant ? JSON.parse(neant): false} onCheckedChange={(checked: boolean)=> handleChangeNeant(checked)} />
        { isPending && <Loader2 className='animate-spin' />}
      </div>
      {
        neant && !JSON.parse(neant) &&
        <article>
          <div className='flex gap-x-2 font-bold'>
            <MoveRight/>Bilans médicaux effectués :
          </div>
          <BilansMedicaux/>
          <DossierMDPHForm/>
          <div className='flex gap-x-2 font-bold mb-5'>
            <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire les antécédents médicaux du patient.
          </div>
          <AntecedentsBody/>
          <Separator className='my-7.5' />
        </article>
      }
    </AnamneseItemLayout>
  )
}

export default AntecedentsPart
