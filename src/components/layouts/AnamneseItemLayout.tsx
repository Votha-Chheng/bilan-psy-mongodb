import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Eye, SkipBack, SkipForward } from 'lucide-react'
import { Separator } from '../ui/separator'
import NoteBrutesDialog from '../sharedUI/alertsAndDialogs/NoteBrutesDialog'
import { useAnamnesePartStore } from '@/stores/partieAnamneseStore'

type AnamnesItemsLayoutProps = {
  children: ReactNode
}

const AnamneseItemLayout: FC<AnamnesItemsLayoutProps> = ({ children }) => {
  const [seeNotesBrutes, setSeeNotesBrutes] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const {anamenesePart, setAnamnesePart} = useAnamnesePartStore()


  const partiesListes = useMemo(()=> {
    return [
      "Saisir des notes pour l'ensemble de l'anamnèse",
      "Famille",
      "Antécédents médicaux personnels et suivis médicaux",
      "Développement psychomoteur",
      "Motricité",
      "Scolarité",
      "Quotidien"
    ]
  }, []) 
  
  const nomPartieLeft = useMemo(()=> {
    switch(anamenesePart){
      case 1 : return partiesListes[0]
      case 2 : return partiesListes[1]
      case 3 : return partiesListes[2]
      case 4 : return partiesListes[3]
      case 5 : return partiesListes[4]
      case 6 : return partiesListes[5]
      default : return ""
    }
  }, [anamenesePart, partiesListes])

  const nomPartieRight = useMemo(()=> {
    switch(anamenesePart){
      case 0 : return partiesListes[1]
      case 1 : return partiesListes[2]
      case 2 : return partiesListes[3]
      case 3 : return partiesListes[4]
      case 4 : return partiesListes[5]
      case 5 : return partiesListes[6]
      default : return ""
    }
  }, [anamenesePart, partiesListes])

  return (
    <article className="min-w-full px-5">
      <NoteBrutesDialog setSearch={setSearch} search={search} open={seeNotesBrutes} setOpen={setSeeNotesBrutes} />
      <div className={`${anamenesePart === 0 ? "justify-end": anamenesePart === 6 ? "justify-start" : "justify-between"} flex gap-x-2 w-full mb-5`}>
        {
          anamenesePart !== 0 &&
          <Button type='button' onClick={()=> setAnamnesePart(anamenesePart-1)}>
            <SkipBack size={19} className='mr-2'/> {nomPartieLeft} 
          </Button>
        }
        {
          anamenesePart !== partiesListes.length-1 &&
          <Button type='button' onClick={()=> setAnamnesePart(anamenesePart+1)}>
            {nomPartieRight} <SkipForward size={19} className='ml-2'/>
          </Button>
        }
      </div>
      <h2 className='text-xl font-bold text-center my-10'><span className='border-2 border-black rounded-md p-3 italic'>{partiesListes[anamenesePart]}</span></h2>
      {
        anamenesePart !== 0 &&
        <div className='flex justify-center'>
          <Button className='w-fit' onClick={()=> setSeeNotesBrutes(true)} size="sm">
            <Eye/> Voir les notes brutes prises pour l'anamnèse
          </Button>
        </div>
      }
      <Separator className='my-5' />
      <div>
        {children}
      </div>
    </article>
  )
}

export default AnamneseItemLayout
