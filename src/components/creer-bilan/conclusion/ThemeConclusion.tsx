import { useConclusionStore } from '@/stores/conclusionStore'
import { useParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import { ProfilPsyItem, ProjetPsyItem } from '@prisma/client'
import { ServiceResponse } from '@/@types/ServiceResponse'
import { useToast } from '@/customHooks/useToast'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader, Loader2, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { openSans } from '@/fonts/openSans'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createProfilPsyItemAction, createProjetPsyItemAction, deleteProfilPsyItemAction, deleteProjetPsyItemAction, upsertConclusionByKeyValueAction } from '@/serverActions/conclusionActions'
import CheckBoxListeConclusionItems from './CheckBoxListeConclusionItems'

type ThemeConclusionProps = {
  profilOuProjet : "profilPsy"|"projetPsy"
  profilProjetPsyFromDB: string[]|null|undefined
}

const ThemeConclusion: FC<ThemeConclusionProps> = ({profilOuProjet, profilProjetPsyFromDB}) => {
  const {id: patientId} = useParams<{id: string}>()
  const {getProfilPsyItems, updateConclusionByPatientId, profilPsyItems, projetPsyItems, getProjetPsyItems} = useConclusionStore()

  const [profilProjetPsyLocal, setProfilProjetPsyLocal] = useState<string[]>([])
  const [newProfilProjetPsyRecommandation, setNewProfilProjetPsyRecommandation] = useState<string>("")

  const [state, setState] = useState<ServiceResponse<any>>({})
  const [stateProfilProjetPsy, setStateProfilProjetPsy] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isPendingProfilProjetPsy, setIsPendingProfilProjetPsy] = useState<boolean>(false)
  const [isPendingDelete, setIsPendingDelete] = useState<string|null>(null)

  useEffect(()=> {
    if(!profilProjetPsyFromDB || profilProjetPsyFromDB.length === 0) return
    setProfilProjetPsyLocal(profilProjetPsyFromDB)
  }, [profilProjetPsyFromDB])

  const handleCreateProfilPsyItem = async()=> {
    setIsPending(true)
    let res: ServiceResponse<any> = {}
    if(profilOuProjet === "profilPsy"){
      res = await createProfilPsyItemAction(newProfilProjetPsyRecommandation) 
    } else {
      res = await createProjetPsyItemAction(newProfilProjetPsyRecommandation) 
    }
    res.success && setNewProfilProjetPsyRecommandation("")
    res && setState(res)
    res && setIsPending(false)
  }

  const handleDeleteProfilPsyItem = async(id: string)=> {
    setIsPendingDelete(id)
    let res: ServiceResponse<any> = {}
    if(profilOuProjet === "profilPsy"){
      res = await deleteProfilPsyItemAction(id) 
    } else {
      res = await deleteProjetPsyItemAction(id)  
    }
    res && setState(res)
    res && setIsPendingDelete(null)
  }

  const addRecommandation = async(recommandation: string)=> {
    setIsPendingProfilProjetPsy(true)
    const newState = [...profilProjetPsyLocal]
    newState.push(recommandation)
    const res = await upsertConclusionByKeyValueAction(profilOuProjet, newState, patientId)
    res.success && setProfilProjetPsyLocal(newState)
    res && setStateProfilProjetPsy(res)
    res && setIsPendingProfilProjetPsy(false)
  }

  const removeRecommandation = async(recommandationToRemove: string)=> {
    setIsPendingProfilProjetPsy(true)
    const newState = profilProjetPsyLocal.filter(value => value !== recommandationToRemove)
    const res = await upsertConclusionByKeyValueAction(profilOuProjet, newState.length === 0 ? null:newState, patientId)
    res.success && setProfilProjetPsyLocal(newState)
    res && setStateProfilProjetPsy(res)
    res && setIsPendingProfilProjetPsy(false)
  }

  useToast({state, updateFunction: ()=> profilOuProjet==="profilPsy" ? getProfilPsyItems():getProjetPsyItems()})
  useToast({state: stateProfilProjetPsy, updateFunction: ()=> updateConclusionByPatientId(patientId)})

  return (
    <Card className='flex flex-row mb-2.5' >
      <article className='w-1/3 border-r border-black pr-2'>
        <ul className={`${openSans.className} text-sm ml-4 mb-2 italic`}>
          {
            isPendingProfilProjetPsy
            ?
            <div className='w-full flex justify-center'>
              <Loader2 className='animate-spin'/>
            </div>
            :
            profilProjetPsyLocal.length >0 
            ?
            profilProjetPsyLocal.map((profil, index)=> (
              <li key={index} className='mb-1.5'>
                &ndash; {profil}
              </li>
            ))
            :
            <p className='text-red-700 italic'>Pas de {profilOuProjet==="profilPsy" ? "recommandation":"proposition"} sélectionnée...</p>
          }
          
        </ul>
      </article>
      <article className='w-2/3'>
        <CheckBoxListeConclusionItems
          profilOuProjet={profilOuProjet} 
          isPending={isPending} 
          isPendingDelete={isPendingDelete} 
          profilProjetPsyLocal={profilProjetPsyLocal}
          addRecommandation={addRecommandation} 
          removeRecommandation={removeRecommandation} 
          handleDeleteProfilPsyItem={handleDeleteProfilPsyItem}
        />
        <div className='text-sm flex gap-x-2'>
          <Button className='bg-blue-500' onClick={()=> handleCreateProfilPsyItem()}>
            {isPending ? <Loader className='animate-spin'/> : "Ajouter une recommandation à la liste"} 
          </Button>
          <Input 
            className='mr-2.5 placeholder:italic'
            type='text' 
            placeholder='Ecrivez une nouvelle recommandation...' 
            value={newProfilProjetPsyRecommandation}
            onChange={(event)=> setNewProfilProjetPsyRecommandation(event.currentTarget.value)}  
            onKeyDown={(event)=> event.key === "Enter" && handleCreateProfilPsyItem()}
          />
        </div>
      </article>
    </Card>
  )
}

export default ThemeConclusion