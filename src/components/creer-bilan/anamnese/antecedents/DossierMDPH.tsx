import { ServiceResponse } from '@/@types/ServiceResponse'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Loader2, MoveRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

const DossierMDPH = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {updatePatientInfoFromDB, anamneseResults} = usePatientInfoStore()
  const {dossierMDPH} = anamneseResults ?? {}
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [dossierMDPHLocal, setDossierMDPHLocal] = useState<string[]>(["", ""])
  const [addInfo, setAddInfo] = useState<string>("")

  useEffect(()=> {
    if(!dossierMDPH) return
    const dossierMDPHArray: string[] = JSON.parse(dossierMDPH)
    setDossierMDPHLocal(dossierMDPHArray)
    setAddInfo(dossierMDPHArray[1])
  }, [dossierMDPH])

  const updateFunction = ()=> updatePatientInfoFromDB(patientId)
  useToast({state, updateFunction})


  const handleChangeDossierMDPHAction = async(value: string, index: number): Promise<void>=> {
    setIsPending(true)
    const newState = [...dossierMDPHLocal]
    newState[index] = value
    const res = await upsertAnamneseByKeyValueAction<string>("dossierMDPH", JSON.stringify(newState), patientId)
    if(res){
      setState(res)
      setIsPending(false)
    }
  }

  return (
    <div className='mb-5'>
      <div className='flex gap-x-2 font-bold mb-3 items-center w-full'>
        <MoveRight/> 
        <span className='whitespace-nowrap'>Dossier MDPH :</span>
        <Select disabled={isPending} value={dossierMDPHLocal[0]} onValueChange={(value)=> handleChangeDossierMDPHAction(value, 0)}>
          <SelectTrigger className="w-[180px] mr-5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oui">oui</SelectItem>
            <SelectItem value="non">non</SelectItem>
            <SelectItem value="en cours">en cours</SelectItem>
            <SelectItem value="refus">refus</SelectItem>
            <SelectItem value="recours">recours</SelectItem>
          </SelectContent>
        </Select>
        {
          dossierMDPH &&
          <div className='flex items-center w-full'>
            <p className='whitespace-nowrap mr-2'>
              Information complémentaire :
            </p>
            <Input 
              type='text' 
              value={addInfo} 
              className='w-full placeholder:italic font-normal' 
              placeholder='Ne rien écrire si aucune info à rajouter (cliquez ailleurs pour sauvegarder)' 
              onChange={(event)=> setAddInfo(event.currentTarget.value)}
              onBlur={()=> handleChangeDossierMDPHAction(addInfo, 1)}
            />
          </div>
        }
        {
          isPending && <Loader2 className='animate-spin' />
        }
      </div>
    </div>
  )
}

export default DossierMDPH
