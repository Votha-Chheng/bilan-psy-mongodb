import { BilanMedicauxResults } from '@/@types/Anamnese'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertBilanMedicalByKeyAction, upsertSelectedBilansMedicauxAction } from '@/serverActions/anamneseActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

type BilanMedicalCardProps = {
  bilanNom: string
  keyBilan: keyof BilanMedicauxResults
  selectedBilans: string[]
  setSelectedBilans: Dispatch<SetStateAction<string[]>>
}

const BilanMedicalCard: FC<BilanMedicalCardProps> = ({ bilanNom, keyBilan, selectedBilans, setSelectedBilans }) => {
  const { id: patientId }  = useParams<{id: string}>()
  const {anamneseResults, bilanMedicauxResults, updateBilanMedicauxResults} = useAnamneseSearchDBStore()
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const [bilanLocal, setBilanLocal] = useState<string[]>(["", ""])
  const [dateBilanMedical, setDateBilanMedical] = useState<string>("")
  
  useEffect(()=> {
    if(bilanMedicauxResults){
      setBilanLocal(bilanMedicauxResults?.[keyBilan] as string[] ?? ["", ""])
      setDateBilanMedical(bilanMedicauxResults?.[keyBilan]?.[0] ?? "")
    }
  }, [bilanMedicauxResults, keyBilan])

  //On enregistre dans la BD la liste des bilans utilisées.
  const selectBilanMedical = async(checked: boolean, bilanNom: string, key: keyof BilanMedicauxResults)=> {
    console.log("checked", checked)
    setIsPending(true)
    let copyKey = undefined
    const copy = selectedBilans
    let newState = []

    if(!checked){
      copy.push(bilanNom)
      newState = [...copy]
    } else {
      copyKey = key
      newState = copy.filter(val => val !== bilanNom)
    }
    const res = await upsertSelectedBilansMedicauxAction(newState, patientId, anamneseResults?.id || bilanMedicauxResults?.anamneseId , copyKey)
    // eslint-disable-next-line
    res.success && setSelectedBilans(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const saveDataAction = async(key: keyof BilanMedicauxResults, value: string, index: number)=> {
    setIsPending(true)
    const newState = [...bilanLocal]
    newState[index] = value
    const res = await upsertBilanMedicalByKeyAction<string[]>(key, newState, patientId, anamneseResults?.id ?? undefined)
    // eslint-disable-next-line
    res.success && setBilanLocal(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const updateFunction = ()=> {
    updateBilanMedicauxResults(anamneseResults?.id)
  }
  useToast({state, updateFunction})

  return (
    <div 
      className={`relative flex items-center gap-2.5 border p-1.5 rounded-md mb-1 w-full ${openSans.className} ${bilanMedicauxResults?.selectedBilans?.includes(bilanNom) 
        ? "border-green-700"
        : "border-transparent text-muted-foreground"}`}
    >
      <Checkbox 
        id={bilanNom} 
        checked={bilanMedicauxResults?.selectedBilans?.includes(bilanNom) ?? false} 
        onClick={()=> selectBilanMedical(bilanMedicauxResults?.selectedBilans?.includes(bilanNom) ?? false, bilanNom, keyBilan)} 
      /> 
      <Label className={`text-base cursor-pointer `} htmlFor={bilanNom}>{bilanNom}</Label>
      {
        bilanMedicauxResults?.selectedBilans?.includes(bilanNom) &&
        <>
          <span>effectué le </span>
          <Input 
            type='date' 
            value={dateBilanMedical} 
            disabled={isPending} 
            className='w-36 cursor-pointer' 
            onBlur={()=> saveDataAction(keyBilan, dateBilanMedical, 0)}
            onChange={(event)=> setDateBilanMedical(event.currentTarget.value)}
          />
          |
          <span>Dossier transmis :</span>
          <Select value={bilanLocal[1]} onValueChange={(value)=> saveDataAction(keyBilan, value, 1)} disabled={isPending}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oui">oui</SelectItem>
              <SelectItem value="non">non</SelectItem>
            </SelectContent>
          </Select>
          {
            bilanLocal[1] === "oui" && <span className='italic'>(cf. compte-rendu)</span>
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
