import { useMotifsConsultationStore } from '@/stores/motifsConsultationStore'
import React, { FC, useMemo } from 'react'
import MotifCard from './MotifCard'

type MotifsListeProps = {
  search: string
}

const MotifsListe: FC<MotifsListeProps> = ({search}) => {
  const {listeMotifs} = useMotifsConsultationStore()

  const filteredList = useMemo(()=> {
    if(search === "") return listeMotifs
    return listeMotifs?.filter((motif)=> motif.motif.toLocaleLowerCase().includes(search.toLowerCase()))
  }, [search])

  return (
    <div className='max-h-96 overflow-y-scroll'>
      {
        filteredList && filteredList.map((motif)=> (
          <MotifCard key={motif.id} motifConsultation={motif} />
        ))
      }
    </div>
  )
}

export default MotifsListe
