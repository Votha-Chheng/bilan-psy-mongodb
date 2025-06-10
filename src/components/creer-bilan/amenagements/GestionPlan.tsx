import { AmenagementItemDTO, AmenagementItemsIds } from '@/@types/AmenagementsTypes'
import { ServiceResponse } from '@/@types/ServiceResponse'
import CreateAmenagementItemDialog from '@/components/sharedUI/alertsAndDialogs/CreateAmenagementItemDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/customHooks/useToast'
import { openSans } from '@/fonts/openSans'
import { deleteAmenagementItemAction, upsertAmenagementsByAddingElementAction, upsertAmenagementsByRemovingElementAction } from '@/serverActions/amenagementsAction'
import { useAmenagementsStore } from '@/stores/amenagementsStore'
import { ChevronRightCircle, ListCheckIcon, Loader2, Trash2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const GestionPlan = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {allAmenagementItems, categoriesList, updateAmenagementsByPatientId, amenagementItemsIds, getAllAmenagementItems} = useAmenagementsStore()

  const [state, setState] = useState<ServiceResponse<AmenagementItemsIds|null>>({})
  const [stateDelete, setStateDelete] = useState<ServiceResponse<AmenagementItemDTO|null>>({})
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isPendingDelete, setIsPendingDelete] = useState<boolean>(false)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [categoryNumber, setCategoryNumber] = useState<number>(0)

  const handleAddAmenagementItemToPatientData = async(amenagementIdToAddId: string|null)=> {
    if(!amenagementIdToAddId) return null
    setIsPending(true)
    const res = await upsertAmenagementsByAddingElementAction(amenagementIdToAddId, patientId)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const handleRemoveAmenagementItemToPatientData = async(amenagementIdToRemoveId: string|null)=> {
    if(!amenagementIdToRemoveId) return null
    setIsPending(true)
    const res = await upsertAmenagementsByRemovingElementAction(amenagementIdToRemoveId, patientId, amenagementItemsIds)
    // eslint-disable-next-line
    res && setState(res)
    // eslint-disable-next-line
    res && setIsPending(false)
  }

  const handleDeleteAmenagementItem = async(amenagementIdToDelete: string|null)=> {
    if(!amenagementIdToDelete) return null
    setIsPendingDelete(true)
    const res = await deleteAmenagementItemAction(amenagementIdToDelete)
     // eslint-disable-next-line
    res && setStateDelete(res)
    // eslint-disable-next-line
    res && setIsPendingDelete(false)
  }

  useToast({state, updateFunction: ()=> {
    updateAmenagementsByPatientId(patientId)
  }})
  
  useToast({state:stateDelete, updateFunction: ()=> {
    getAllAmenagementItems()
  }})

  return (
    <div  className='py-5 border-l border-black w-3/5 px-3'>
      <CreateAmenagementItemDialog open={openDialog} setOpen={setOpenDialog} />
      <Button onClick={()=> setOpenDialog(true)}>
        <ListCheckIcon/> Créer un aménagement à ajouter dans la liste des choix
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
                    <div key={index} className={`flex gap-1.5 items-center p-1.5 border  rounded-md ${amenagementItemsIds?.includes(amenagementItem?.id ?? "") && 'border-green-700'}`} >
                      <Checkbox 
                        checked={amenagementItemsIds?.includes(amenagementItem?.id ?? "")}
                        disabled={isPending} 
                        id={`${amenagementItem.amenagement}${category}`} 
                        className='cursor-pointer'
                        onClick={()=> {
                          // eslint-disable-next-line
                          amenagementItemsIds?.includes(amenagementItem?.id ?? "") 
                          ? handleRemoveAmenagementItemToPatientData(amenagementItem.id ?? null) 
                          : handleAddAmenagementItemToPatientData(amenagementItem.id ?? null)
                        }}
                      />
                      <Label className='cursor-pointer' htmlFor={`${amenagementItem.amenagement}${category}`}>{amenagementItem.amenagement}</Label>
                      {
                        !amenagementItemsIds?.includes(amenagementItem?.id ?? "") &&
                        (
                          isPendingDelete ? 
                          <Loader2/> : 
                          <Trash2Icon className='ml-2.5 cursor-pointer hover:scale-110 text-red-600' size={17.5} onClick={()=> handleDeleteAmenagementItem(amenagementItem?.id?? null)}/>
                        )   
                      }
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