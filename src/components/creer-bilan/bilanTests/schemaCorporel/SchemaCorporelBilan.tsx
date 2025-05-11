import React from 'react'
import DomainWrapper from '../DomainWrapper'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { Card } from '@/components/ui/card'
import ImitationPosisitionNepsy2 from '../testUI/ImitationPosisitionNepsy2'
import PraxiesGestuelles from '../testUI/PraxiesGestuelles'

const SchemaCorporelBilan = () => {
  const {tests} = useBilanTestsStore()
  return (
    <DomainWrapper display={tests ? (tests?.includes("Imitation de positions de la Nepsy 2") || tests?.includes("Praxies gestuelles")) : false} >
      <div className='flex flex-col w-full'>
        <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
          Schéma corporel et praxies
        </Card>
        <DomainWrapper display={tests?.includes("Imitation de positions de la Nepsy 2") ?? false}>
          <ImitationPosisitionNepsy2/>
        </DomainWrapper>
        <DomainWrapper display={tests?.includes("Praxies gestuelles") ?? false}>
          <PraxiesGestuelles/>
        </DomainWrapper>
      </div>
    </DomainWrapper>
  )
}

export default SchemaCorporelBilan