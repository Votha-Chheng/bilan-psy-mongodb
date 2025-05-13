import NoteBrutesDialog from '@/components/sharedUI/alertsAndDialogs/NoteBrutesDialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAnamnesePartStore } from '@/stores/partieAnamneseStore'
import { Eye, SkipBack, SkipForward } from 'lucide-react'
import React, { useState } from 'react'

const AnamneseTitleItem = () => {
  const {anamenesePart, setAnamnesePart} = useAnamnesePartStore()
  const [seeNotesBrutes, setSeeNotesBrutes] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  const partiesListes =  [
    "Saisir des notes pour l'ensemble de l'anamnèse",
    "Famille",
    "Antécédents médicaux personnels et suivis médicaux",
    "Développement psychomoteur",
    "Motricité",
    "Scolarité",
    "Quotidien"
  ]

  return (
    <>
      <NoteBrutesDialog setSearch={setSearch} search={search} open={seeNotesBrutes} setOpen={setSeeNotesBrutes} />
      <div className={`${anamenesePart === 0 ? "justify-end": anamenesePart === 6 ? "justify-start" : "justify-between"} flex gap-x-2 w-full mb-5`}>
        {
          anamenesePart !== 0 &&
          <Button type='button' onClick={()=> setAnamnesePart(anamenesePart-1)}>
            <SkipBack size={19} className='mr-2'/> {partiesListes[anamenesePart-1]} 
          </Button>
        }
        {
          anamenesePart !== partiesListes.length-1 &&
          <Button type='button' onClick={()=> setAnamnesePart(anamenesePart+1)}>
            {partiesListes[anamenesePart+1]} <SkipForward size={19} className='ml-2'/>
          </Button>
        }
      </div>
      <h2 className='text-xl font-bold text-center my-10'><span className='border-2 border-black rounded-md p-3 italic'>{partiesListes[anamenesePart]}</span></h2>
      {
        anamenesePart !== 0 &&
        <div className='flex justify-center'>
          <Button className='w-fit' onClick={()=> setSeeNotesBrutes(true)} size="sm">
            <Eye/> Voir les notes brutes prises pour l’anamnèse
            <Eye/> Voir les notes brutes prises pour lanamnèse
          </Button>
        </div>
      }
      
      <Separator className='my-5' /> 
    </>
  )
}

export default AnamneseTitleItem
