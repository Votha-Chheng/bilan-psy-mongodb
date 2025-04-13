
import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import AnamneseSubPart from '@/components/sharedUI/AnamneseSubPart'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Confere from './Confere'
import { Separator } from '@/components/ui/separator'
import DevPsyBody from './DevPsyBody'

type DeveloppementPsyPartProps = {
  
}

const DeveloppementPsyPart: FC<DeveloppementPsyPartProps> = ({}) => {
  const {getDevPsyConfereList} = useAnamneseSearchDBStore()

  useEffect(()=> {
    getDevPsyConfereList()
  }, [])


  return (
    <AnamneseItemLayout > 
      <AnamneseSubPart>
        <Confere/>
      </AnamneseSubPart>
      <Separator className='my-7.5' />
      <DevPsyBody/>
    </AnamneseItemLayout>
  )
}

export default DeveloppementPsyPart