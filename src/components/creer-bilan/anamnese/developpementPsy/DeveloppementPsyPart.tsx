
import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import AnamneseSubPart from '@/components/sharedUI/AnamneseSubPart'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Confere from './Confere'
import { Separator } from '@/components/ui/separator'
import DevPsyBody from './DevPsyBody'
import NoteBrutesDialog from '@/components/sharedUI/alertsAndDialogs/NoteBrutesDialog'
import { Button } from '@/components/ui/button'
import { Eye, SkipBack, SkipForward } from 'lucide-react'
import AnamneseTitleItem from '../AnamneseTitleItem'


const DeveloppementPsyPart: FC = () => {
  const {getDevPsyConfereList} = useAnamneseSearchDBStore()
  const [seeNotesBrutes, setSeeNotesBrutes] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  
  useEffect(()=> {
    getDevPsyConfereList()
  }, [])

  return (
    <article className="min-w-full px-5"> 
      <AnamneseTitleItem/>
      <Separator className='my-5' />
      <AnamneseSubPart>
        <Confere/>
      </AnamneseSubPart>
      <Separator className='my-7.5' />
      <DevPsyBody/>
    </article>
  )
}

export default DeveloppementPsyPart