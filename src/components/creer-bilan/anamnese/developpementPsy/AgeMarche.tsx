import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { openSans } from '@/fonts/openSans'
import React, { useEffect, useState } from 'react'
import { upsertAnamneseByKeyValueAction } from '@/serverActions/anamneseActions'
import { useParams } from 'next/navigation'
import { useToast } from '@/customHooks/useToast'
import { Input } from '@/components/ui/input'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { ServiceResponse } from '@/@types/ServiceResponse'
import ManageAdjectifsComportementDialog from '@/components/sharedUI/alertsAndDialogs/ManageAdjectifsComportementDialog'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'

const AgeMarche = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {adjectifsComportement, getListeAdjectifs, anamneseResults, getAnamneseResultsByPatientId} = useAnamneseSearchDBStore()
  const {ageMarche} = anamneseResults ?? {}
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIspending] = useState<boolean>(false)

  const [openManagementAdjDialog, setOpenManagementAdjDialog] = useState<boolean>(false)
  const [ageMarcheLocal, setAgeMarcheLocal] = useState<string[]>(["", ""])
  const [age, setAge] = useState<string>("")

  const handleChangeState = async(value: string, index: number)=> {
    setIspending(true)
    const newState = [...ageMarcheLocal] 
    newState[index] = value
    const res = await upsertAnamneseByKeyValueAction("ageMarche", JSON.stringify(newState), patientId)
    // eslint-disable-next-line
    res.success && setAgeMarcheLocal(newState)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIspending(false)
  }

  useEffect(()=> {
    getListeAdjectifs()
  }, [])

  useEffect(()=> {
    if(ageMarche) {
      setAgeMarcheLocal(ageMarche)
      setAge(ageMarche[0])
    }
  }, [ageMarche])

  const updateFunction = ()=> {
    getAnamneseResultsByPatientId(patientId)
    getListeAdjectifs()
  }
  useToast({state, updateFunction})

  return (
    <Card className='px-7.5 pt-1.5 mb-4 gap-0'>
      <ManageAdjectifsComportementDialog setOpen={setOpenManagementAdjDialog} open={openManagementAdjDialog} />
      <div className='flex gap-2.5 items-center'>
        <div>&bull; <span className='underline font-bold underline-offset-2'>Âge de la marche</span> : </div>
        <Input className="w-20" type="number" value={ageMarcheLocal[0]} onChange={(event)=> setAge(event.currentTarget.value)} onBlur={()=> handleChangeState(age, 0)}  />
        <p className='font-bold'>mois chez un enfant décrit comme :</p>
        <Select disabled={isPending} value={ageMarcheLocal[1].toString()} onValueChange={(value: string)=> handleChangeState(value, 1)}>
          <SelectTrigger className={`w-64 tracking-wide font-normal ${openSans.className}`} >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={`font-normal tracking-wide ${openSans.className}`} value="undefined">Non pris en compte</SelectItem>
            {
              adjectifsComportement && adjectifsComportement.map((value, index)=> (
                <SelectItem className={`font-normal tracking-wide ${openSans.className}`} key={index} value={value}>{value}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        |
        <div className='w-1/3'>
          <Button className='w-fit' onClick={()=> setOpenManagementAdjDialog(true)}>
            <List/> Gérer la liste d&apos;adjectifs
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default AgeMarche
