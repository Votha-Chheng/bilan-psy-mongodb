import { Card } from '@/components/ui/card'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import PrecisionPraxiesGestuelles from './PrecisionPraxiesGestuelles'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { praxiesgestuelles } from '@prisma/client'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { upsertPraxiesGestuellesByKeyValueAction } from '@/serverActions/testsActions/praxiesGestuellesActions'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { useToast } from '@/customHooks/useToast'

type PraxiesGestuellesCardProps = {
  keyPrecision: keyof praxiesgestuelles
  keyTenue: keyof praxiesgestuelles
  keyGestionTonus: keyof praxiesgestuelles
  keyHyperHypo: keyof praxiesgestuelles
  precisionAvec: string
  setStateLocal: Dispatch<SetStateAction<string>>
  stateLocal: string
  tenueStateLocal: string
  gestionTonusLocal: string
  tonusBoolean: boolean
  setTonusBoolean: Dispatch<SetStateAction<boolean>>
  hyperHypoLocal: string
  setHyperHypoLocal: Dispatch<SetStateAction<string>>
  labelTenue: string
}

const PraxiesGestuellesCard: FC<PraxiesGestuellesCardProps> = ({ 
  keyPrecision, 
  keyTenue,
  keyGestionTonus,
  keyHyperHypo,
  precisionAvec, 
  setStateLocal, 
  stateLocal, 
  tenueStateLocal,
  gestionTonusLocal, 
  tonusBoolean, 
  setTonusBoolean, 
  hyperHypoLocal, 
  setHyperHypoLocal,
  labelTenue
}) => {
  const {bilanId, updatePraxiesGestuelles} = useBilanTestsStore()

  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleChangeCiseauState = async(value: string, keyPraxies: keyof praxiesgestuelles): Promise<void>=> {
    setIsPending(true)
    const res = await upsertPraxiesGestuellesByKeyValueAction<string>(keyPraxies, value, bilanId ?? "")
    res && setState(res)
    res && setIsPending(false)
  }

  const onCheckedChange = async(checked: boolean)=> {
    setTonusBoolean(checked)
    if(!checked){
      setIsPending(true)
      const res = await upsertPraxiesGestuellesByKeyValueAction<null>(keyHyperHypo, null, bilanId ?? "")
      res && setState(res)
      res && setIsPending(false)
      setHyperHypoLocal("")
    }
  }

  useToast({
    state,
    updateFunction: ()=> {
      updatePraxiesGestuelles(bilanId)
    }
  })
  
  return (
    <Card className='ml-2 px-3 py-4'>
      <PrecisionPraxiesGestuelles keyPraxiesGestuelles={keyPrecision} precisionAvec={precisionAvec} setStateLocal={setStateLocal} stateLocal={stateLocal}/>
      <p className='text-sm flex items-center gap-x-2 mb-2'>
        &bull; <span className='underline underline-offset-4'>{labelTenue}</span> : 
        <Select value={tenueStateLocal ?? ""} onValueChange={(value)=> handleChangeCiseauState(value, keyTenue)} disabled={isPending}>
          <SelectTrigger className="w-[150px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"adaptée"}>adaptée</SelectItem>
            <SelectItem value={"inadaptée"}>inadaptée</SelectItem>
          </SelectContent>
        </Select>
        {isPending && <Loader2 className='animate-spin'/>} 
      </p>
      <div className='text-sm flex items-center gap-x-2 mb-2'>
        &bull; <span className='underline underline-offset-4'>Gestion du tonus</span> : 
        <Select value={gestionTonusLocal ?? ""} onValueChange={(value)=> handleChangeCiseauState(value, keyGestionTonus)} disabled={isPending}>
          <SelectTrigger className="w-[150px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"adaptée"}>adaptée</SelectItem>
            <SelectItem value={"inadaptée"}>inadaptée</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex items-center gap-x-2 ml-5'>
          <Checkbox 
            id={keyGestionTonus} 
            onCheckedChange={(checked: boolean)=> onCheckedChange(checked)}
            checked={tonusBoolean}
          />
          {
            tonusBoolean
            ?            
            <>
              <span> avec </span>
              <Select onValueChange={(value)=>handleChangeCiseauState(value, keyHyperHypo)} value={hyperHypoLocal}>
                <SelectTrigger className="w-[200px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"hypertonie"}>hypertonie</SelectItem>
                  <SelectItem value={"hypotonie"}>hypotonie</SelectItem>
                </SelectContent>
              </Select>
            </>
            :
            <label htmlFor={keyGestionTonus} className='text-slate-400'>
              avec hypertonie/hypotonie
            </label>
          }
        </div>
        {isPending && <Loader2 className='animate-spin'/>} 
      </div>
    </Card>
  )
}

export default PraxiesGestuellesCard