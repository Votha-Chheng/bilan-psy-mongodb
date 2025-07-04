import { ServiceResponse } from '@/@types/ServiceResponse'
import ManageAdjectifsComportementDialog from '@/components/sharedUI/alertsAndDialogs/ManageAdjectifsComportementDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { List, Loader2, Trash2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DecritAuQuotidienCard = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {anamneseResults, updateAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {decritAuQuotidien} = anamneseResults ?? {}
  const {adjectifsComportement, getListeAdjectifs} = useAnamneseSearchDBStore()
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isPendingDelete, setIsPendingDelete] = useState<boolean>(false)
  const [openManagementAdjDialog, setOpenManagementAdjDialog] = useState<boolean>(false) 
  const [selectedAdj, setSelectedAdj] = useState<string[]>([])

  useEffect(()=> {
    if(!decritAuQuotidien) return
    setSelectedAdj(decritAuQuotidien)
  }, [decritAuQuotidien])

  useEffect(()=> {
    getListeAdjectifs()
  }, [])

  const handleAddAdjectifAction = async(value: string)=> {
    setIsPending(true)
    const newState = [...selectedAdj]
    newState.push(value)
    const res = await upsertAnamneseByKeyValueAction("decritAuQuotidien", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res.success && setSelectedAdj(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const handleRemoveElementAction = async(value: string)=> {
    setIsPendingDelete(true)
    let final: string[]|null = null
    const newState = selectedAdj.filter(val=> val !== value)
    if(newState.length !== 0){
      final = newState
    }
    const res = await upsertAnamneseByKeyValueAction("decritAuQuotidien", final!==null ? JSON.stringify(final):final, patientId)
    // eslint-disable-next-line
    res.success && setSelectedAdj(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPendingDelete(false)
  }

  const updateFunction =()=> {
    updateAnamneseResultsByPatientId(patientId)
  }

  useToast({state, updateFunction})

  return (
    <Card className='mb-5 gap-y-2'>
      <ManageAdjectifsComportementDialog setOpen={setOpenManagementAdjDialog} open={openManagementAdjDialog} />
      <div className='flex gap-2.5 mb-3 items-center'>
        <div className='ml-7.5'>&bull; <span className='underline font-bold underline-offset-2'>Le patient est décrit au quotidien comme</span> : </div>
        <div className={`${selectedAdj.length === 0 && "opacity-30 italic"} flex gap-x-3`}>
          {
            selectedAdj.length !== 0
            ?
            selectedAdj.map((adj, index)=> (
              <p key={index} className={`${openSans.className} text-sm font-bold border border-transparent hover:border-slate-300 p-2 flex items-center gap-2 rounded-lg`}> 
                {adj} {isPendingDelete ? <Loader2 className='animate-spin'/> : <Trash2Icon className='text-red-700 hover:text-red-500 cursor-pointer' size={17.5} onClick={()=>handleRemoveElementAction(adj)}/>}
              </p>
            ))
            :
            "Aucune sélection."
          }
        </div>
      </div>
      <div className='flex items-center mx-7.5'>
        <div className='flex gap-x-7 gap-y-1 mb-2.5 flex-wrap w-2/3'>
        <Select disabled={isPending} value={""} onValueChange={(value: string)=>handleAddAdjectifAction(value)}>
          <SelectTrigger className={`w-11/12 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue placeholder="Ajouter une description" />
          </SelectTrigger>
          <SelectContent>
          {
            adjectifsComportement && adjectifsComportement.length>0 &&
            Array.from(new Set(adjectifsComportement)).map((adj: string, index)=> (    
              <SelectItem disabled={selectedAdj.includes(adj)} key={index} className={`font-normal tracking-wide ${openSans.className}`} value={adj}>{adj}</SelectItem>
            ))
          }
          </SelectContent>
        </Select>
        </div>
        {isPending ? <Loader2 className='animate-spin'/> : <p className='w-6'></p>}
        <div className='w-1/3 ml-5 -mt-2'>
          <Button className='w-fit' onClick={()=> setOpenManagementAdjDialog(true)}>
            <List/> Gérer la liste d’adjectifs
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default DecritAuQuotidienCard
