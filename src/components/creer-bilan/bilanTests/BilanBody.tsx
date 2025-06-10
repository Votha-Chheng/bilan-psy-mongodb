import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { arrayExists, returnSetOfDomains } from '@/utils/arrayFunctions'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'
import React, { FC } from 'react'
import LoadingDatas from '../../sharedUI/LoadingDatas'
import { Button } from '../../ui/button'
import MotriciteBilan from './motricite/MotriciteBilan'
import DomainWrapper from './DomainWrapper'
import GraphismeBilan from './graphisme/GraphismeBilan'
import { orderedDomains } from '@/datas/orderedDomainsTests'
import SchemaCorporelBilan from './schemaCorporel/SchemaCorporelBilan'
import LateraliteTonus from './lateraliteTonus/LateraliteTonus'
import StructurationSpatialeBilan from './structurationSpatiale/StructurationSpatialeBilan'

const BilanBody: FC = () => {
  const {loadingBilanResults, partieBilan, setPartieBilan, tests} = useBilanTestsStore()
  const domains = returnSetOfDomains(tests)

  if(loadingBilanResults) return <LoadingDatas/>
  return (
    <div>
      {
        domains && arrayExists(domains) &&
        <div className='flex justify-between mt-5'>
          <div>
            {
              partieBilan !==0 &&
              <Button type='button' className='flex gap-x-2' onClick={()=> setPartieBilan(partieBilan>0 ? partieBilan - 1 : partieBilan)} >
                <SquareChevronLeft/> 
                {domains[partieBilan-1]?.toUpperCase()}
              </Button>
            }
          </div>
          <div>
            {
              domains[partieBilan + 1] && partieBilan !== domains.length-1 && 
              <Button type='button' className='flex gap-x-2' onClick={()=> setPartieBilan(partieBilan < domains.length -1 ? partieBilan + 1 : partieBilan)}>
                <SquareChevronRight/> 
                {domains[partieBilan + 1]?.toUpperCase() ?? ""}
              </Button>
            }
          </div>
        </div>
      }
      <section className='overflow-hidden w-full mt-3'>
        <div className='transition-transform duration-100 w-full flex flex-nowrap' style={{transform: `translateX(${partieBilan * -100}%)`}}>
          <DomainWrapper display={domains?.includes(orderedDomains[0]) ?? false}>
            <MotriciteBilan />
          </DomainWrapper>
          <DomainWrapper display={domains?.includes(orderedDomains[1]) ?? false}>
            <GraphismeBilan />
          </DomainWrapper>
          <DomainWrapper display={domains?.includes(orderedDomains[2]) ?? false}>
            <SchemaCorporelBilan />
          </DomainWrapper>
          <DomainWrapper display={domains?.includes(orderedDomains[3]) ?? false}>
            <LateraliteTonus />
          </DomainWrapper>
          <DomainWrapper display={domains?.includes(orderedDomains[4]) ?? false}>
            <StructurationSpatialeBilan />
          </DomainWrapper>
          </div>
        </section>
    </div>
  )
}

export default BilanBody