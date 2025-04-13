import { BilanMedicalKeys, BilanMedicauxResults } from '@/@types/Anamnese'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertBilanMedicalByKeyAction, upsertSelectedBilansMedicauxAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useMemo, useState } from 'react'

type BilanMedicalCardProps = {
  bilanNom: string
  keyBilan: keyof BilanMedicauxResults
}

const BilanMedicalCard: FC<BilanMedicalCardProps> = ({ bilanNom, keyBilan }) => {
  const { id: patientId }  = useParams<{id: string}>()
  const {anamneseResults, bilansMedicauxResults, updateBilanMedicalByKey} = usePatientInfoStore()
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [dateIsFocused, setDateIsFocused] = useState<boolean>(false)

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
  }, [bilansMedicauxResults?.[keyBilan]])

  useEffect(()=> {
    if(dateIsFocused) return
    if(!needToBesaved) return
    // Lancer un timer de 5 secondes à chaque changement de "text"
    const timer = setTimeout(() => {
      // Ici, on effectue l'action de sauvegarde
      saveDataAction(keyBilan, [dateBilanMedical, dossierTransmis])
    }, 3000);

    // Nettoyage : si "dateBilanMedical" ou "dossierTransmis" change avant les 5 secondes, on annule le timer
    return () => clearTimeout(timer);
  }, [dateBilanMedical, dossierTransmis, dateIsFocused])

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
    res &&  setState(res)
    res &&  setIsPending(false)
    
  }

  const saveDataAction = async(key: keyof BilanMedicauxResults, value: string[])=> {
    setIsPending(true)
    const res = await upsertBilanMedicalByKeyAction<string[]>(key, value, patientId, anamneseResults?.id ?? undefined)
    res && setState(res)
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    updateBilanMedicalByKey(keyBilan, anamneseResults?.id)
  }
  useToast({state, updateFunction})

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
            onBlur={()=> setDateIsFocused(false)}
            onFocus={()=> setDateIsFocused(true)}
            onChange={(event)=> {
              setDateBilanMedical(event.currentTarget.value)
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
