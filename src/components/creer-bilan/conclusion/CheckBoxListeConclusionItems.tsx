import { ProfilPsyItemDTO, ProjetPsyItemDTO } from '@/@types/ConclusionTypes'
import { Checkbox } from '@/components/ui/checkbox'
import { useConclusionStore } from '@/stores/conclusionStore'
import { Loader2, Trash2 } from 'lucide-react'
import React, { FC } from 'react'

type CheckBoxListeConclusionItemsProps = {
  profilOuProjet : "profilPsy"|"projetPsy"
  isPending: boolean
  isPendingDelete: string|null
  profilProjetPsyLocal: string[]
  addRecommandation: (recommandation: string)=> Promise<void>
  removeRecommandation: (recommandation: string)=> Promise<void>
  handleDeleteProfilPsyItem: (id: string)=> Promise<void>
}

const CheckBoxListeConclusionItems: FC<CheckBoxListeConclusionItemsProps> = ({
  profilOuProjet, 
  isPending, 
  profilProjetPsyLocal, 
  removeRecommandation, 
  addRecommandation, 
  isPendingDelete, 
  handleDeleteProfilPsyItem
}) => {
  const {profilPsyItems, projetPsyItems} = useConclusionStore()

  if(profilOuProjet === "projetPsy") return (
    <div className='flex gap-x-7 gap-y-1 mb-2.5 pr-2 flex-wrap'>
      {
        projetPsyItems && projetPsyItems.length>0 
        ?
        projetPsyItems.map((projetPsy: ProjetPsyItemDTO, index: number)=> (
        <div key={index} className={`flex gap-x-2 items-center border p-1 rounded-md`}>
          <Checkbox 
            disabled={isPending}
            id={`${projetPsy.proposition}~~${projetPsy.id}`}
            className='cursor-pointer' 
            checked={profilProjetPsyLocal.includes(projetPsy.proposition.trim())} 
            onClick={(event)=> {
              const [recommandation, id] = event.currentTarget.id.split("~~");
              if(id === projetPsy.id){
                // eslint-disable-next-line
                profilProjetPsyLocal.includes(recommandation) ? removeRecommandation(recommandation) : addRecommandation(recommandation)
              }
            }}
          />
          <label htmlFor={`${projetPsy.proposition}~~${projetPsy.id}`} className='text-sm italic cursor-pointer'>{projetPsy.proposition}</label>
          <div >
            {
              isPendingDelete === projetPsy.id
              ?
              <Loader2 className='animate-spin' />
              :
              <Trash2 size={15} className={`text-red-700 cursor-pointer hover:scale-125 `} onClick={()=> handleDeleteProfilPsyItem(projetPsy.id)} />
            }
          </div>
        </div>
        ))
        : <p className='text-red-700 italic text-sm font-bold'>Aucune recommandation pré-enregistrée !</p>
      }
    </div>
  )

  return (
    <div className='flex gap-x-7 gap-y-1 mb-2.5 pr-2 flex-wrap'>
      {
        profilPsyItems && profilPsyItems.length>0 
        ?
        profilPsyItems.map((profilPsy: ProfilPsyItemDTO, index: number)=> (
        <div key={index} className={`flex gap-x-2 items-center border p-1 rounded-md`}>
          <Checkbox 
            disabled={isPending}
            id={`${profilPsy.recommandation}~~${profilPsy.id}`}
            className='cursor-pointer' 
            checked={profilProjetPsyLocal.includes(profilPsy.recommandation.trim())} 
            onClick={(event)=> {
              const [recommandation, id] = event.currentTarget.id.split("~~");
              if(id === profilPsy.id){
                // eslint-disable-next-line
                profilProjetPsyLocal.includes(recommandation) ? removeRecommandation(recommandation) : addRecommandation(recommandation)
              }
            }}
          />
          <label htmlFor={`${profilPsy.recommandation}~~${profilPsy.id}`} className='text-sm italic cursor-pointer'>{profilPsy.recommandation}</label>
          <div >
            {
              isPendingDelete === profilPsy.id
              ?
              <Loader2 className='animate-spin' />
              :
              <Trash2 size={15} className={`text-red-700 cursor-pointer hover:scale-125 `} onClick={()=> handleDeleteProfilPsyItem(profilPsy.id)} />
            }
          </div>
        </div>
        ))
        : <p className='text-red-700 italic text-sm font-bold'>Aucune recommandation pré-enregistrée !</p>
      }
    </div>
  )
}

export default CheckBoxListeConclusionItems