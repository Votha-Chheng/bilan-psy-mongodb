import { ServiceResponse } from '@/@types/ServiceResponse'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Loader2, MoveRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

const DossierMDPH = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {updatePatientInfoFromDB, anamneseResults} = usePatientInfoStore()
  const {dossierMDPH} = anamneseResults ?? {}
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [addInfo, setAddInfo] = useState<string>("")

  const dossierMDPHArray = useMemo(()=> {
    if(dossierMDPH) return JSON.parse(dossierMDPH) 
    return ["", ""]
  }, [dossierMDPH]) 

  useEffect(()=> {
    setAddInfo(dossierMDPHArray[1])
  }, [dossierMDPH])

  useEffect(()=> {
    if(state.success === true){
      toast.success(state.message)
      updatePatientInfoFromDB(patientId)
    }
    if(state.success === false){
      toast.error(state.message)
    }
  }, [state])

  useEffect(()=> {
    if(!dossierMDPH) return
    if(dossierMDPHArray[1]===addInfo) return
    
    const timer = setTimeout(() => {
      // Ici, on effectue l'action de sauvegarde
      handleChangeDossierMDPHAction(dossierMDPHArray[0], addInfo)
    }, 3000);

    // Nettoyage : si "text" change avant les 5 secondes, on annule le timer
    return () => clearTimeout(timer);
  }, [addInfo])

  const handleChangeDossierMDPHAction = async(value: string, addInfo: string): Promise<void>=> {
    setIsPending(true)
    const res = await upsertAnamneseByKeyValueAction<string>("dossierMDPH", JSON.stringify([value, addInfo]), patientId)
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
        <Select disabled={isPending} value={dossierMDPHArray[0]} onValueChange={(value)=> handleChangeDossierMDPHAction(value, addInfo)}>
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
            <Input type='text' value={addInfo} className='w-full placeholder:italic font-normal' placeholder='Ne rien écrire si aucune info à rajouter (sauvegarde auto)' onChange={(event)=> setAddInfo(event.currentTarget.value)}/>
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
