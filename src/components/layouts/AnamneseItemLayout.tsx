import React, { Dispatch, FC, ReactNode, SetStateAction, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Eye, SkipBack, SkipForward } from 'lucide-react'
import { Separator } from '../ui/separator'
import NoteBrutesDialog from '../sharedUI/alertsAndDialogs/NoteBrutesDialog'

type AnamnesItemsLayoutProps = {
  children: ReactNode
  partieAnamnese: number
  setPartieAnamnese: Dispatch<SetStateAction<number>>
}

const AnamneseItemLayout: FC<AnamnesItemsLayoutProps> = ({ children, partieAnamnese, setPartieAnamnese }) => {
  const [seeNotesBrutes, setSeeNotesBrutes] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const partiesListes = useMemo(()=> {
    return [
      "Saisir des notes pour l'ensemble de l'anamnèse",
      "Famille",
      "Antécédents médicaux personnels et suivis médicaux",
      "Développement psychomoteur",
      "Motricité",
      "École",
      "Quotidien"
    ]
  }, []) 
  
  const nomPartieLeft = useMemo(()=> {
    switch(partieAnamnese){
      case 1 : return partiesListes[0]
      case 2 : return partiesListes[1]
      case 3 : return partiesListes[2]
      case 4 : return partiesListes[3]
      case 5 : return partiesListes[4]
      case 5 : return partiesListes[5]
      default : return ""
    }
  }, [partieAnamnese, partiesListes])

  const nomPartieRight = useMemo(()=> {
    switch(partieAnamnese){
      case 0 : return partiesListes[1]
      case 1 : return partiesListes[2]
      case 2 : return partiesListes[3]
      case 3 : return partiesListes[4]
      case 4 : return partiesListes[5]
      case 4 : return partiesListes[6]
      default : return ""
    }
  }, [partieAnamnese, partiesListes])

  return (
    <article className="min-w-full px-5">
      <NoteBrutesDialog setSearch={setSearch} search={search} open={seeNotesBrutes} setOpen={setSeeNotesBrutes} />
      <div className={`${partieAnamnese === 0 ? "justify-end": partieAnamnese === 5 ? "justify-start" : "justify-between"} flex gap-x-2 w-full mb-5`}>
        {
          partieAnamnese !== 0 &&
          <Button type='button' onClick={()=> setPartieAnamnese(prev => prev-1)}>
            <SkipBack size={19} className='mr-2'/> {nomPartieLeft} 
          </Button>
        }
        {
          partieAnamnese !== 5 &&
          <Button type='button' onClick={()=> setPartieAnamnese(prev=> prev+1)}>
            {nomPartieRight} <SkipForward size={19} className='ml-2'/>
          </Button>
        }
      </div>
      <h2 className='text-xl font-bold text-center my-10'><span className='border-2 border-black rounded-md p-3 italic'>{partiesListes[partieAnamnese]}</span></h2>
      {
        partieAnamnese !== 0 &&
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
