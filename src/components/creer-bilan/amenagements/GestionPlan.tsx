import { AmenagementItemDTO } from '@/@types/AmenagementsTypes'
import { ServiceResponse } from '@/@types/ServiceResponse'
import CreateAmenagementItemDialog from '@/components/sharedUI/alertsAndDialogs/CreateAmenagementItemDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { upsertAmenagementsByAddingElementAction, upsertAmenagementsByRemovingElementAction } from '@/serverActions/amenagementsAction'
import { useAmenagementsStore } from '@/stores/amenagementsStore'
import { ChevronRightCircle, ListCheckIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const GestionPlan = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {allAmenagementItems, categoriesList, updateAmenagementsByPatientId, amenagementItemsIds} = useAmenagementsStore()

  const [state, setState] = useState<ServiceResponse<any>>({})
  const [isPending, setIsPending] = useState<boolean>(false)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [categoryNumber, setCategoryNumber] = useState<number>(0)

  const handleAddAmenagementItemToPatientData = async(amenagementIdToAddId: string|null)=> {
    if(!amenagementIdToAddId) return null
    setIsPending(true)
    const res = await upsertAmenagementsByAddingElementAction(amenagementIdToAddId, patientId)
    res && setState(res)
    res && setIsPending(false)
  }

  const handleRemoveAmenagementItemToPatientData = async(amenagementIdToRemoveId: string|null)=> {
    if(!amenagementIdToRemoveId) return null
    setIsPending(true)
    const res = await upsertAmenagementsByRemovingElementAction(amenagementIdToRemoveId, patientId, amenagementItemsIds)
    res && setState(res)
    res && setIsPending(false)
  }

  useToast({state, updateFunction: ()=> updateAmenagementsByPatientId(patientId)})

  return (
    <div  className='py-5 border-l border-black w-3/5 px-3'>
      <CreateAmenagementItemDialog open={openDialog} setOpen={setOpenDialog} />
      <Button onClick={()=> setOpenDialog(true)}>
        <ListCheckIcon/> Créer un aménagement à ajouter
      </Button>
      <div className='my-3'>
        <p className={`${openSans.className} leading-7`}>
          <span className='underline underline-offset-4 font-bold'>Liste des catégories existantes</span> : <span className='italic font-bold'> {categoriesList?.join(" - ")} </span>
        </p>
      </div>
      <Separator className='my-5'/>
      <div className='w-full flex overflow-hidden'>
        {
          categoriesList && categoriesList.map((category, index)=> (
            <div key={index} className={`min-w-full transition-transform duration-150`} style={{transform: `translateX(${-categoryNumber * 100}%)`}} >
              <div className='relative flex justify-center'>
                <Button onClick={()=> setCategoryNumber(prev=> prev-1)} className={`${index===0 && "invisible"} absolute left-0 top-0`}>Catégorie précédente</Button>
                <Badge className='mt-8 p-2 bg-violet-700'>{category}</Badge>
                <Button onClick={()=> setCategoryNumber(prev=> prev+1)} className={`${index===categoriesList.length-1 && "invisible"} absolute right-0 top-0`}>Catégorie suivante <ChevronRightCircle/></Button>
              </div>
              <section className='flex gap-x-7 gap-y-5 my-5 flex-wrap'>
                {
                  allAmenagementItems?.filter(amenagement => amenagement.category === category)?.map((amenagementItem, index)=> (
                    <div key={index} className={`flex gap-1.5 items-center p-1.5 ${amenagementItemsIds?.includes(amenagementItem?.id ?? "") && 'border border-green-700 rounded-md'}`} >
                      <Checkbox 
                        checked={amenagementItemsIds?.includes(amenagementItem?.id ?? "")}
                        disabled={isPending} 
                        id={`${amenagementItem.amenagement}${category}`} 
                        className='cursor-pointer'
                        onClick={()=> {
                          amenagementItemsIds?.includes(amenagementItem?.id ?? "") 
                          ? handleRemoveAmenagementItemToPatientData(amenagementItem.id ?? null) 
                          : handleAddAmenagementItemToPatientData(amenagementItem.id ?? null)
                        }}
                      />
                      <Label className='cursor-pointer' htmlFor={`${amenagementItem.amenagement}${category}`}>{amenagementItem.amenagement}</Label>
                    </div>
                  ))
                }
              </section>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default GestionPlan