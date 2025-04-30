import React from 'react'
import DomainWrapper from '../DomainWrapper'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import MABC2 from '../testUI/MABC2'
import { Card } from '@/components/ui/card'
import VisuomotriceNepsy2 from '../testUI/VisuomotriceNepsy2'

const MotriciteBilan = () => {
  const {tests} = useBilanTestsStore()
  
  return (
    <DomainWrapper display={tests ? (tests?.includes("M-ABC2") || tests.includes("Epreuve visuomotrice de la Nepsy 2")) : false} >
      <div className='flex flex-col w-full'>
        <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
          motricité
        </Card>
        <DomainWrapper display={tests?.includes("M-ABC2") ?? false}>
          <MABC2/>
        </DomainWrapper>
        <DomainWrapper display={tests?.includes("Epreuve visuomotrice de la Nepsy 2") ?? false}>
          <VisuomotriceNepsy2/>
        </DomainWrapper>
      </div>
    </DomainWrapper>
  )
}

export default MotriciteBilan