
import AnamneseSubPart from '@/components/sharedUI/AnamneseSubPart'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import React, { FC, useEffect, useState } from 'react'
import Confere from './Confere'
import { Separator } from '@/components/ui/separator'
import DevPsyBody from './DevPsyBody'
import AnamneseTitleItem from '../AnamneseTitleItem'


const DeveloppementPsyPart: FC = () => {
  const {getDevPsyConfereList} = useAnamneseSearchDBStore()
  
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