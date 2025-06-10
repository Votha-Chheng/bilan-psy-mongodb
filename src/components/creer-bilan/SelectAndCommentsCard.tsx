import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Card } from '../ui/card'
import AnamneseDBDialog from '../sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { openSans } from '@/fonts/openSans'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ServiceResponse } from '@/@types/ServiceResponse'
import AddComentaireOuObservations from './anamnese/AddComentaireOuObservations'
import { upsertAnamneseByKeyValueAction, upsertAnamneseBySingleKeyValueWithFormDataAction } from '@/serverActions/anamneseActions'
import { AnamneseResults } from '@/@types/Anamnese'
import { Database, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useParams } from 'next/navigation'
import { useToast } from '@/customHooks/useToast'
import ManageListeButton from '../sharedUI/buttons/ManageListeButton'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

type SelectAndCommentsCardProps = {
  stateFromDB: string[]|null|undefined
  listeSelectItems: string[]
  keyAnamnese: keyof AnamneseResults
  themeLabel: string
  buttonAddElementToList?: boolean
  setOpenManagementDialog?: Dispatch<SetStateAction<boolean>>
  labelButton?: string
  selectWidth?: string
}

const SelectAndCommentsCard: FC<SelectAndCommentsCardProps> = ({stateFromDB, listeSelectItems, keyAnamnese, themeLabel, buttonAddElementToList=false, setOpenManagementDialog, labelButton, selectWidth="w-96"}) => {
  const {id: patientId} = useParams<{id: string}>()
  const {updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [stateLocal, setStateLocal] = useState<string[]>(["", ""])   //<---------- [difficultés, observations]
  
  useEffect(()=> {
    if(!stateFromDB) return
    setStateLocal(stateFromDB)
  }, [stateFromDB])

  const handleChangeState = async(value: string)=> {
    setIsPending(true)
    const newState = [...stateLocal]
    newState[0] = value
    const res = await upsertAnamneseByKeyValueAction<string>(keyAnamnese, JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res && setStateLocal(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }
  const updateFunction = ()=> {
    updateAnamneseResultsByPatientId(patientId)
  }
  useToast({state, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <AnamneseDBDialog
        open={openDBDialog} 
        setOpen={setOpenDBDialog} 
        dialogTitle={themeLabel} 
        searchKeys={[keyAnamnese]}
        indexDataToRetrieve={1}
      />
      <div className='flex gap-2.5 mb-3 items-center'>
        <div className='ml-7.5'>&bull; <span className='underline font-bold underline-offset-2'>{themeLabel}</span> : </div>
        <Select disabled={isPending} value={stateLocal[0]} onValueChange={(value: string)=> handleChangeState(value)}>
          <SelectTrigger className={`${selectWidth} tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {
              listeSelectItems.map((value, index)=> (
                <SelectItem key={index} className={`font-normal tracking-wide ${openSans.className}`} value={value}>{value}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        {isPending ? <Loader2 className='animate-spin'/> : <p className='w-6'></p>}
        {
          buttonAddElementToList &&
          <>
          |
          <ManageListeButton labelButton={labelButton ?? ""} setOpenManagementDialog={setOpenManagementDialog}/>
          </>
        }
      </div>
      <AddComentaireOuObservations
        actionFunction = {upsertAnamneseBySingleKeyValueWithFormDataAction}
        commentaireObservationFromDB={stateFromDB?.[1]}
        commentaireObservationFromLocal={stateLocal[1]}
        completeArrayStateLocal={stateLocal}
        keyAnamnese={keyAnamnese}
        setCompleteArrayStateLocal={setStateLocal}
        stateIfCommentObsIsNull={[stateLocal[0], ""]}
        commentObsIndex={1}
        label='observation'
        themeTitle={themeLabel}
      />
      <Button className='w-fit ml-5 mt-2.5' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les observations dans la base de données pour le thème &quot;{themeLabel}&quot;
      </Button>
    </Card>
  )
}

export default SelectAndCommentsCard