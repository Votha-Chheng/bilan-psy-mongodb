import ManageTemperamentDialog from '@/components/sharedUI/alertsAndDialogs/ManageTemperamentDialog'
import React, { useEffect, useState } from 'react'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import SelectAndCommentsCard from '../../SelectAndCommentsCard'

const TemperamentCard = () => {
  const {anamneseResults} = useAnamneseSearchDBStore()
  const {temperament} = anamneseResults ?? {}
  const {temperamentsDescription, getListeTemperament} = useAnamneseSearchDBStore()
  const {temperamentListe} = temperamentsDescription ?? {}

  const [openTemperamentDialog, setOpenTemperamentDialog] = useState<boolean>(false)

  useEffect(()=> {
    getListeTemperament()
  }, [])

  return (
    <div className='mb-5 gap-y-2'>
      <ManageTemperamentDialog open={openTemperamentDialog} setOpen={setOpenTemperamentDialog} />
      <SelectAndCommentsCard
        stateFromDB={temperament} 
        listeSelectItems={temperamentListe ?? []} 
        keyAnamnese='temperament' 
        themeLabel="Tempérament et personnalité"
        setOpenManagementDialog={setOpenTemperamentDialog}
        buttonAddElementToList={true}
        labelButton="Gérer la liste pour le tempérament et la personnalité"
      />
    </div>
  )
}

export default TemperamentCard
