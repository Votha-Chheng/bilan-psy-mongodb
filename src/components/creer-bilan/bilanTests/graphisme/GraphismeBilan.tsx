import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import React from 'react'
import DomainWrapper from '../DomainWrapper'
import { Card } from '@/components/ui/card'
import BHK from '../testUI/BHK'

const GraphismeBilan = () => {
  const {tests} = useBilanTestsStore()
  
  return (
    <DomainWrapper display={tests ? (tests?.includes("BHK (épreuve d'écriture)")) : false} >
      <div className='flex flex-col w-full'>
        <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
          graphisme
        </Card>
        <DomainWrapper display={tests?.includes("BHK (épreuve d'écriture)") ?? false}>
          <BHK/>
        </DomainWrapper>
      </div>
    </DomainWrapper>
  )
}

export default GraphismeBilan