import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import ProfilPsy from './ProfilPsy'
import { useConclusionStore } from '@/stores/conclusionStore'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'
import ProjetPsy from './ProjetPsy'
import LoadingDatas from '@/components/sharedUI/LoadingDatas'

const ConclusionSection = () => {
  const [projetPsy, setProjetPsy] = useState<boolean>(false)
  const {id: patientId} = useParams<{id: string}>()
  const {getConclusionByPatientId, getProfilPsyItems, getProjetPsyItems, loadingConclusionData} = useConclusionStore()

  useEffect(()=> {
    getConclusionByPatientId(patientId)
    getProfilPsyItems() 
    getProjetPsyItems()
  }, [])

  return (
    <article className='w-full'>
      <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
        conclusion
      </Card>
      <div className='flex justify-between my-5'>
        <div>
          {
            projetPsy &&
            <Button type='button' className='flex gap-x-2' onClick={()=> setProjetPsy(false)} >
              <SquareChevronLeft/> 
              Profil psychomoteur
            </Button>
          }
        </div>
        <div>
          {
            !projetPsy && 
            <Button type='button' className='flex gap-x-2' onClick={()=> setProjetPsy(true)}>
              <SquareChevronRight/> 
              Projet psychomoteur
            </Button>
          }
        </div>
      </div>
      <section className='w-full overflow-hidden'>
        <div className={`flex duration-150 transition-transform`} style={{transform:`translateX(${projetPsy ? "-100":"0"}%)`}} >
          {
            loadingConclusionData
            ?
            <LoadingDatas/>
            :
            <>
              <ProfilPsy/>
              <ProjetPsy/>
            </>
          }
        </div>
      </section>
    </article>
  )
}

export default ConclusionSection
