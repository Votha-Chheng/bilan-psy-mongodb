import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Card } from '@/components/ui/card'
import { useToast } from '@/customHooks/useToast'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import AddComentaireOuObservations from '../AddComentaireOuObservations'
import { Button } from '@/components/ui/button'
import { Database, List, Loader2 } from 'lucide-react'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import ManageAdjectifsComportementDialog from '@/components/sharedUI/alertsAndDialogs/ManageAdjectifsComportementDialog'
import { ServiceResponse } from '@/@types/ServiceResponse'

const ComportementCard: FC = () => {
  const {id: patientId} = useParams<{id: string}>()
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [openManagementAdjDialog, setOpenManagementAdjDialog] = useState<boolean>(false) 
  const {anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {adjectifsComportement, getListeAdjectifs} = useAnamneseSearchDBStore()
  const {comportement} = anamneseResults ?? {}
  // eslint-disable-next-line
  const [stateCheck, setStateCheck] = useState<ServiceResponse<any>>({})
  const [isPendingCheck, setIsPendingCheck] = useState<boolean>(false)
  const [comportementLocal, setComportementLocal] = useState<string[]>(["", ""])    //<----- [observations, liste d'adjectifs mais séparés par des ,]

  const adjectifs = comportementLocal[1].split(", ")

  useEffect(()=>{
    getListeAdjectifs()
  }, [])

  useEffect(()=> {
    if(comportement){
      setComportementLocal(comportement)
    }
  }, [comportement])


  const handleChangeListeAdj = async(checked: boolean, adjectif: string)=> {
    setIsPendingCheck(true)
    let newState = []
    const adjList = comportementLocal[1]  //<---- de type "ajdectis, adjectif..."
    let newAdjList = ""
    if(checked){
      if(adjectifs[0] === "") {
        newAdjList = adjectif
      } else {
        newAdjList = adjList + ", " + adjectif
      }
      newState = [comportementLocal[0],  newAdjList]
      
    } else {
      if(adjectifs.length === 1){
        const newArray = adjList.replace(`${adjectif}`, "")
        newState = [comportementLocal[0], newArray]
      } else {
        const newArray = adjList.replace(`, ${adjectif}`, "")
        newState = [comportementLocal[0],  newArray]
      }
    }
    setComportementLocal(newState)
    const res = await upsertAnamneseByKeyValueAction<string>("comportement", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setStateCheck(res)
    // eslint-disable-next-line
    res && setIsPendingCheck(false)

  }

  const updateFunction = ()=>{
    getAnamneseResultsByPatientId(patientId)
  }
  useToast({state:stateCheck, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={"Comportement (observations)"} 
        searchKeys={["comportement"]}
        indexDataToRetrieve={0}
      />
      <ManageAdjectifsComportementDialog setOpen={setOpenManagementAdjDialog} open={openManagementAdjDialog} />
      <div className='px-5 flex items-start gap-2.5 w-full'>
        <div className='whitespace-nowrap ml-2'>&bull;  <span className='font-bold underline underline-offset-2'>Comportement </span> : </div> 
        <p className={`${comportementLocal[1]==="" && "opacity-30"} flex gap-x-2`}>
          {isPendingCheck ? <Loader2 className='animate-spin'/> : comportementLocal[1]!=="" ? "L'enfant est décrit comme " + comportementLocal[1]: "Pas d'adjectifs sélectionnés..."}
        </p>
      </div>
      <Separator className='my-2'/>
      <div className='flex items-center mx-7.5'>
        <div className='flex gap-x-7 gap-y-1 mb-2.5 flex-wrap w-2/3'>
          {
            adjectifsComportement && adjectifsComportement.length>0 
            ?
            Array.from(new Set(adjectifsComportement)).map((adj: string, index)=> (
              <div key={index} className={`flex cursor-pointer rounded-md gap-x-2 items-center border border-slate-400 py-1.5 px-2`}>
                <Checkbox 
                  key={adj}
                  id={`${adj}~~${index}`}
                  checked={adjectifs.includes(adj)} 
                  onCheckedChange={(checked: boolean)=> handleChangeListeAdj(checked, adj) }
                />
                <label htmlFor={`${adj}~~${index}`} className={`${isPendingCheck && "opacity-30"} text-sm italic cursor-pointer`}>{adj}</label>
              </div>
            ))
            :
            <p className='text-red-700 italic text-sm font-bold'>Aucun adjectif pré-enregistré !</p>
          }
        </div>
        <div className='w-1/3'>
          <Button className='w-fit' onClick={()=> setOpenManagementAdjDialog(true)}>
            <List/> Gérer la liste d’adjectifs
          </Button>
        </div>
      </div>
      <Separator className='mt-2.5'/>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={comportement?.[0]}
        commentaireObservationFromLocal={comportementLocal[0]}
        completeArrayStateLocal={comportementLocal}
        keyAnamnese='comportement'
        setCompleteArrayStateLocal={setComportementLocal}
        stateIfCommentObsIsNull={["", comportementLocal[1]]}
        commentObsIndex={0}
        label='observation'
        themeTitle='Comportement'
      />
      <Button className='w-fit ml-5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème &quot;Comportement&quot;
      </Button>
    </Card>
  )
}

export default ComportementCard
