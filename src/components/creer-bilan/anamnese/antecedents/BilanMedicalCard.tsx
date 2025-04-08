import { BilanMedicalKeys } from '@/@types/Anamnese'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { openSans } from '@/fonts/openSans'
import { upsertBilanMedicalByKeyAction, upsertSelectedBilansMedicauxAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

type BilanMedicalCardProps = {
  bilanNom: string
  keyBilan: BilanMedicalKeys
}

const BilanMedicalCard: FC<BilanMedicalCardProps> = ({ bilanNom, keyBilan }) => {
  const { id: patientId }  = useParams<{id: string}>()
  const {anamneseResults, updatePatientInfoFromDB, bilansMedicauxResults} = usePatientInfoStore()
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const [dossierTransmis, setDossierTransmis] = useState<string>("")
  const [dateBilanMedical, setDateBilanMedical] = useState<string>("")

  const needToBesaved = useMemo(()=> {
    if (!bilansMedicauxResults && (dossierTransmis ==="" || dateBilanMedical === "")) return false
    if (bilansMedicauxResults) {
      if ((bilansMedicauxResults[keyBilan] && dateBilanMedical === bilansMedicauxResults[keyBilan][0]) && 
        (bilansMedicauxResults[keyBilan] && dossierTransmis === bilansMedicauxResults[keyBilan][1])
      ) return false
    }
    return true
  }, [bilansMedicauxResults, dateBilanMedical, dossierTransmis])

  useEffect(()=> {
    if(bilansMedicauxResults && bilansMedicauxResults[keyBilan]){
      setDateBilanMedical(bilansMedicauxResults[keyBilan][0])
      setDossierTransmis(bilansMedicauxResults[keyBilan][1])
    }
  }, [state, anamneseResults])

  useEffect(()=> {
    if(!needToBesaved) return
    // Lancer un timer de 5 secondes à chaque changement de "text"
    const timer = setTimeout(() => {
      // Ici, on effectue l'action de sauvegarde
      saveDataAction(keyBilan as BilanMedicalKeys, [dateBilanMedical, dossierTransmis])
    }, 5000);

    // Nettoyage : si "dateBilanMedical" ou "dossierTransmis" change avant les 5 secondes, on annule le timer
    return () => clearTimeout(timer);
  }, [dateBilanMedical, dossierTransmis])

  useEffect(()=> {
    if(state.success === true){
      toast.success(state.message)
      updatePatientInfoFromDB(patientId)
    }
    if(state.success === false){
      toast.error(state.message)
    }
  }, [state])

  //On enregistre dans la BD la liste des bilans utilisées.
  const selectBilanMedical = async(checked: boolean, bilan: string)=> {
    setIsPending(true)
    const bilans = bilansMedicauxResults?.selectedBilans ?? []
    let newArray = [...bilans]
    let keyToSetToNull = undefined

    if(checked){
      newArray.push(bilan)
    } else {
      newArray = newArray?.filter((value) => value !== bilan )
      keyToSetToNull = keyBilan
    }
    
    const res = await upsertSelectedBilansMedicauxAction(newArray, patientId, anamneseResults?.id ?? undefined, keyToSetToNull)

    if(res) {
      setState(res)
      setIsPending(false)
    }
    if(res.success){
      updatePatientInfoFromDB(patientId)
    }
  }


  const saveDataAction = async(key: BilanMedicalKeys, value: string[])=> {
    setIsPending(true)
    const res = await upsertBilanMedicalByKeyAction<string[]>(key, value, patientId, anamneseResults?.id ?? undefined)
    if(res){
      setState(res)
      setIsPending(false)
    }
    if(res.success){
      updatePatientInfoFromDB(patientId)
    }
  }

  return (
    <div 
      className={`relative flex items-center gap-2.5 border p-1.5 rounded-md mb-1 ${openSans.className} ${bilansMedicauxResults?.selectedBilans?.includes(bilanNom) 
        ? "border-green-700"
        : "border-transparent text-muted-foreground"}`}
    >
      <Checkbox id={bilanNom} checked={bilansMedicauxResults?.selectedBilans?.includes(bilanNom)} onCheckedChange={(checked: boolean)=> selectBilanMedical(checked, bilanNom)} /> 
      <Label className={`text-base cursor-pointer `} htmlFor={bilanNom}>{bilanNom}</Label>
      {
        bilansMedicauxResults?.selectedBilans?.includes(bilanNom) &&
        <>
          <span>effectué le </span>
          <Input 
            type='date' 
            value={dateBilanMedical ?? ""} 
            disabled={isPending} 
            className='w-36 cursor-pointer' 
            onChange={(event)=> {
              setDateBilanMedical(event.currentTarget.value)
              console.log(event.currentTarget.value)
            } }
          />
          |
          <span>Dossier transmis :</span>
          <Select value={dossierTransmis} onValueChange={(value)=> setDossierTransmis(value)} disabled={isPending}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oui">oui</SelectItem>
              <SelectItem value="non">non</SelectItem>
            </SelectContent>
          </Select>
          {
            dossierTransmis === "oui" && <span className='italic'>(cf. compte-rendu)</span>
          }
        </>
      }
      {
        isPending &&
        <Loader2 className='animate-spin absolute right-2.5'/>
      }
    </div>
  )
}

export default BilanMedicalCard
