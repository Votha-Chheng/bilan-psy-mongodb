import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { BiSpreadsheet } from "react-icons/bi"
import ListeTestsUtilises from './ListeTestsUtilises'
import ManageTestsBilanDialog from '@/components/sharedUI/alertsAndDialogs/ManageTestsBilanDialog'
import { useBilanTestsStore } from '@/stores/bilanTestsStore'
import { useParams } from 'next/navigation'
import BilanBody from '@/components/creer-bilan/bilanTests/BilanBody'

const BilanTestSection = () => {
  const {id: patientId} = useParams<{id: string}>()
  const {getBilanByPatientId} = useBilanTestsStore()
  const [openListeTestsDialog, setOpenListeTestsDialog] = useState<boolean>(false)

  useEffect(()=> {
    getBilanByPatientId(patientId)
  }, [patientId])

  return (
    <article className='w-full'>
      <ManageTestsBilanDialog open={openListeTestsDialog} setOpen={setOpenListeTestsDialog} />
      <Card className='uppercase text-lg font-bold tracking-wider bg-gray-300 text-center py-2 mb-5'>
        Bilan
      </Card>
      <div className='border-2 border-slate-200 px-3 py-5 rounded-md'>
        <div className='w-full flex items-center gap-x-5'>
          <h4 className='underline underline-offset-4 font-bold'>
            Tests utilisés :
          </h4>
          <Button onClick={()=> setOpenListeTestsDialog(true)}>
            <BiSpreadsheet /> Gérer les tests à utiliser
          </Button>
        </div>
        <ListeTestsUtilises/>
      </div>
      <BilanBody/>
    </article>
  )
}

export default BilanTestSection