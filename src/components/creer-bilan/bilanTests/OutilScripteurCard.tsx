import { BHKResultsDTO } from '@/@types/BilanTests'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/customHooks/useToast'
import { upsertBHKResultsAction } from '@/serverActions/testsActions/bhkActions'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const OutilScripteurCard = () => {
  const {bhk, bilanId, updatebhk} = useBilanTestsStore()
  const {tenueOutilScripteur, fonctionnalite, posturePoignet} = bhk ?? {}

  const [isPending, setIsPending] = useState<string|null>(null)
  // eslint-disable-next-line
  const [state, setState] = useState<ServiceResponse<any>>({})

  const [tenueOutilScripteurLocal, setTenueOutilScripteurLocal] = useState<string[]>([])
  const [fonctionnaliteLocal, setFonctionnaliteLocal] = useState<string>("")
  const [posturePoignetLocal, setPosturePoignetLocal] = useState<string>("")

  useEffect(()=> {
    if(!bhk) return
    setTenueOutilScripteurLocal(tenueOutilScripteur ?? ["", "", ""])
    setFonctionnaliteLocal(fonctionnalite ?? "")
    setPosturePoignetLocal(posturePoignet ?? "")
  }, [bhk])


  const handleChangeState = async(value: string, index: number, key: keyof BHKResultsDTO)=> {
    setIsPending(key)
    const newState = [...tenueOutilScripteurLocal]
    newState[index] = value
    const res = await upsertBHKResultsAction("tenueOutilScripteur", newState, bilanId ?? "")
    // eslint-disable-next-line
    res.success && setTenueOutilScripteurLocal(newState)
    // eslint-disable-next-line
    res && setIsPending(null)
    // eslint-disable-next-line
    res && setState(res)
  }

  const handleChangeFonctionnaliteAndPosture = async(value: string, key: keyof BHKResultsDTO)=> {
    setIsPending(key)
    const res = await upsertBHKResultsAction(key, value, bilanId ?? "")
    if(key === "fonctionnalite"){
      // eslint-disable-next-line
      res.success && setFonctionnaliteLocal(value)
    }
    if(key === "posturePoignet"){
      // eslint-disable-next-line
      res.success && setPosturePoignetLocal(value)
    }
    // eslint-disable-next-line
    res && setIsPending(null)
    // eslint-disable-next-line
    res && setState(res)
  }

  useToast({state, updateFunction: ()=> updatebhk(bilanId)})

  return (
    <Card className='gap-y-0 my-5'>
      <p className='text-sm ml-4 mb-2 flex items-center justify-between'>
        <span>&ndash; <span className='pr-1'>Outil scripteur</span> :
        </span>
      </p>
      <div className='text-sm flex items-center gap-x-2 mb-2 ml-5'>
        &bull; <span className='underline underline-offset-4'>Tenue de l’outil scripteur</span> : 
        <Select value={tenueOutilScripteurLocal[0] ?? ""} onValueChange={(value)=> handleChangeState(value, 0, "tenueOutilScripteur")} disabled={isPending==="tenueOutilScripteur"}>
          <SelectTrigger className="w-[150px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"mature"}>mature</SelectItem>
            <SelectItem value={"immature"}>immature</SelectItem>
          </SelectContent>
        </Select>
        <p>avec tenue en : </p>
        <Select value={tenueOutilScripteurLocal[1] ?? ""} onValueChange={(value)=> handleChangeState(value, 1, "tenueOutilScripteur")} disabled={isPending==="tenueOutilScripteur"}>
          <SelectTrigger className="w-[150px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"tripode"}>tripode</SelectItem>
            <SelectItem value={"quadripode"}>quadripode</SelectItem>
          </SelectContent>
        </Select>
        <p>avec la main : </p>
        <Select value={tenueOutilScripteurLocal[2] ?? ""} onValueChange={(value)=> handleChangeState(value, 2, "tenueOutilScripteur")} disabled={isPending==="tenueOutilScripteur"}>
          <SelectTrigger className="w-[150px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"droite"}>droite</SelectItem>
            <SelectItem value={"gauche"}>gauche</SelectItem>
          </SelectContent>
        </Select>
        {isPending ==="tenueOutilScripteur"  && <Loader2 className='animate-spin'/>} 
      </div>
      <div className='text-sm flex items-center gap-x-2 mb-2 ml-5'>
        &bull; <span className='underline underline-offset-4'>Fonctionnalité </span> : 
        <Select value={fonctionnaliteLocal ?? ""} onValueChange={(value)=> handleChangeFonctionnaliteAndPosture(value, "fonctionnalite")} disabled={isPending==="fonctionnalite"}>
          <SelectTrigger className="w-[300px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"mobilité des doigts adaptée"}>mobilité des doigts adaptée</SelectItem>
            <SelectItem value={"pas ou peu de mobilité des doigts"}>pas ou peu de mobilité des doigts</SelectItem>
          </SelectContent>
        </Select>
        {isPending==="fonctionnalite" && <Loader2 className='animate-spin'/>} 
      </div>
      <div className='text-sm flex items-center gap-x-2 mb-2 ml-5'>
        &bull; <span className='underline underline-offset-4'>Posture du poignet </span> : 
        <Select value={posturePoignetLocal ?? ""} onValueChange={(value)=> handleChangeFonctionnaliteAndPosture(value, "posturePoignet")} disabled={isPending==="posturePoignet"}>
          <SelectTrigger className="w-[160px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"adaptée"}>adaptée</SelectItem>
            <SelectItem value={"inadaptée"}>inadaptée</SelectItem>
          </SelectContent>
        </Select>
        {isPending==="posturePoignet" && <Loader2 className='animate-spin'/>} 
      </div>
    </Card>
  )
}

export default OutilScripteurCard