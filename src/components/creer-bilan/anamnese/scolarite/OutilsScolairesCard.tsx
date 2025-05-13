import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { Button } from '@/components/ui/button'
import { Database, Loader2 } from 'lucide-react'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { AnamneseResults } from '@/@types/Anamnese'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'


const OutilsScolairesCard: FC = () => {
  const {id: patientId} = useParams<{id: string}>()
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const { chosenThemes } = useAnamneseSearchDBStore()
  const {outils} = anamneseResults ?? {}
  const [stateSelect, setStateSelect] = useState<ServiceResponse<AnamneseResults|null>>({})
  const [isPendingSelect, setIsPendingSelect] = useState<boolean>(false)
  const [outilsLocal, setOutilsLocal] = useState<string[]>(["", ""])                //<-- [niveau, commentaires]

  const handleChangeState = async(value: string)=> {
    setIsPendingSelect(true)
    const newState = [...outilsLocal]
    newState[0] = value
    const res = await upsertAnamneseByKeyValueAction("outils", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res.success && setOutilsLocal(newState)
    // eslint-disable-next-line
    res && setStateSelect(res)
    // eslint-disable-next-line
    res && setIsPendingSelect(false)
  }

  useEffect(()=> {
    if(!outils) return
    setOutilsLocal(outils)

  }, [outils, chosenThemes])

  const updateFunction = ()=> {
    getAnamneseResultsByPatientId(patientId)
  }
  useToast({state: stateSelect, updateFunction})

  return (
    <Card className='mb-5 gap-y-3'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Utilisation des outils scolaires (commentaires)"} 
        searchKeys={["outils"]}
        indexDataToRetrieve={1}
      />
      <div className='px-5 flex items-center gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Utilisation des outils scolaires</span> : </div> 
        <Select disabled={isPendingSelect} value={outilsLocal[0]} onValueChange={(value)=> handleChangeState(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rien à signaler">rien à signaler</SelectItem>
            <SelectItem value="des difficultés">des difficultés</SelectItem>
          </SelectContent>
        </Select>
        {isPendingSelect && <Loader2 className='animate-spin'/>}
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={outils?.[1]}
        commentaireObservationFromLocal={outilsLocal[1]}
        completeArrayStateLocal={outilsLocal}
        keyAnamnese='outils'
        setCompleteArrayStateLocal={setOutilsLocal}
        stateIfCommentObsIsNull={[outilsLocal[0], ""]}
        commentObsIndex={1}
        label='commentaire'
        themeTitle='Utilisation des outils scolaires'
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les commentaires dans la base de données pour le thème &quot;Utilisation des outils scolaires&quot;
      </Button>
    </Card>
  )
}

export default OutilsScolairesCard