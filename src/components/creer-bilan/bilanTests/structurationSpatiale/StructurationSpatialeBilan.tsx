import React from 'react'
import DomainWrapper from '../DomainWrapper'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { Card } from '@/components/ui/card'
import ConnaissanceDroiteGauche from '../testUI/ConnaissanceDroiteGauche'
import FlechesNepsy2 from '../testUI/FlechesNepsy2'
import FigureReyA from '../testUI/FigureReyA'
import FigureReyB from '../testUI/FigureReyB'
import EpreuveCubeNepsy2 from '../testUI/EpreuveCubeNepsy2'

const StructurationSpatialeBilan = () => {
  const {tests} = useBilanTestsStore()
  
  return (
    <DomainWrapper 
      display={
        tests 
        ? 
        (tests?.includes("Connaissance droite/gauche") || tests?.includes("Epreuve visuo-spatiale des flèches (Nepsy 2)") || tests?.includes("Epreuve visuoconstructive en deux dimensions (Figure de Rey A)") || tests?.includes("Epreuve visuoconstructive en deux dimensions (Figure de Rey B)") || tests?.includes("Epreuve des cubes (Nepsy 2)")) 
        : 
        false} 
    >
      <div className='flex flex-col w-full'>
        <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
          structuration spatiale et temporelle
        </Card>
        <DomainWrapper display={tests?.includes("Connaissance droite/gauche") ?? false}>
          <ConnaissanceDroiteGauche/>
        </DomainWrapper>
        <DomainWrapper display={tests?.includes("Epreuve visuo-spatiale des flèches (Nepsy 2)") ?? false}>
          <FlechesNepsy2/>
        </DomainWrapper>
        <DomainWrapper display={tests?.includes("Epreuve visuoconstructive en deux dimensions (Figure de Rey A)") ?? false}>
          <FigureReyA/>
        </DomainWrapper>
        <DomainWrapper display={tests?.includes("Epreuve visuoconstructive en deux dimensions (Figure de Rey B)") ?? false}>
          <FigureReyB/>
        </DomainWrapper>
        <DomainWrapper display={tests?.includes("Epreuve des cubes (Nepsy 2)") ?? false}>
          <EpreuveCubeNepsy2/>
        </DomainWrapper>
      </div>
    </DomainWrapper>
  )
}

export default StructurationSpatialeBilan