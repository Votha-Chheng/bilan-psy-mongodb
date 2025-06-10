import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { Database, Loader2} from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import AddElementToListForm from '@/components/forms/anamnese/AddElementToListForm'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { upsertListeSensorialiteAction } from '@/serverActions/listeActions'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { useToast } from '@/customHooks/useToast'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { AnamneseResults } from '@/@types/Anamnese'
import { Separator } from '@/components/ui/separator'

const SensorialiteCard:FC = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {sensorialite} = anamneseResults ?? {}
  const {getTypeSensorialite, typeSensorialite : liste} = useAnamneseSearchDBStore()
  const {typesSensorialite} = liste ?? {}

  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelect, setIsPendingSelect] = useState<boolean>(false)
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [sensorialiteLocale, setSensorialiteLocale] = useState<string[]>(["", ""]) //<---- [type de sensorialité, commentaires]

  useEffect(()=> {
    getTypeSensorialite()
  }, [])

  useEffect(()=> {
    if(!sensorialite) return
    setSensorialiteLocale(sensorialite)
  }, [sensorialite])

  const handleChangeSensorialite = async(value: string, index: number)=> {
    const newState = [...sensorialiteLocale]
    newState[index] = value
    const res = await upsertAnamneseByKeyValueAction("sensorialite", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setStateSelect(res)
    // eslint-disable-next-line
    res && setIsPendingSelect(false)
    // eslint-disable-next-line
    res.success && setSensorialiteLocale(newState)
  }

  const updateFunction = ()=> {
    updateAnamneseResultsByPatientId(patientId)
  }

  useToast({state: stateSelect, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Sensorialité"} 
        searchKeys={["sensorialite"]}
        indexDataToRetrieve={1}
      />
      <div className='flex gap-2.5 items-center'>
        <div className='ml-7.5'>&bull; <span className='underline font-bold underline-offset-2'>Sensorialité</span> : </div>
        <p className='font-bold'>de type :</p>
        <Select disabled={isPendingSelect} value={sensorialiteLocale[0]} onValueChange={(value: string)=> handleChangeSensorialite(value, 0)}>
          <SelectTrigger className={`w-64 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {
              typesSensorialite && typesSensorialite.length>0 && typesSensorialite.map((value, index)=> (
                <SelectItem className={`font-normal tracking-wide ${openSans.className}`} key={index} value={value}>{value}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        {isPendingSelect ? <Loader2 className='animate-spin'/> : <p className='w-6'></p>}
        |
        <AddElementToListForm
          listeElements={typesSensorialite}
          elementToAddLabel='un type de sensorialité'
          actionFunction={upsertListeSensorialiteAction}
          keyListe='typesSensorialite'
          listeId={liste?.id}
        />
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={sensorialite?.[1]}
        commentaireObservationFromLocal={sensorialiteLocale[1]}
        completeArrayStateLocal={sensorialiteLocale}
        keyAnamnese='sensorialite'
        setCompleteArrayStateLocal={setSensorialiteLocale}
        stateIfCommentObsIsNull={[sensorialiteLocale[0], ""]}
        commentObsIndex={1}
        label='observation'
        themeTitle='Sensorialité'
      />
      <Separator className='my-2.5'/>
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème &quot;Sensorialité&quot;
      </Button>
    </Card>
  )
}

export default SensorialiteCard
