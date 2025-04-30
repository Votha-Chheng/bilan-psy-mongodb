import React from 'react'
import DomainWrapper from '../DomainWrapper'
import { Card } from '@/components/ui/card'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import LateraliteUsuelle from '../testUI/LateraliteUsuelle'
import TonusAction from '../testUI/TonusAction'

const LateraliteTonus = () => {
  const {tests} = useBilanTestsStore()

  return (
    <DomainWrapper display={tests ? (tests?.includes("Latéralité usuelle") || tests?.includes("Tonus d'action")) : false} >
      <div className='flex flex-col w-full'>
        <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
          latéralité et tonus
        </Card>
        <DomainWrapper display={tests?.includes("Latéralité usuelle") ?? false}>
          <LateraliteUsuelle/>
        </DomainWrapper>
        <DomainWrapper display={tests?.includes("Tonus d'action") ?? false}>
          <TonusAction/>
        </DomainWrapper>
      </div>
    </DomainWrapper>
  )
}

export default LateraliteTonus