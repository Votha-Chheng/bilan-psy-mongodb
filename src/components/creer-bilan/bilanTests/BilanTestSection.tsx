import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { BiSpreadsheet } from "react-icons/bi"
import ListeTestsUtilises from './ListeTestsUtilises'
import ManageTestsBilanDialog from '@/components/sharedUI/alertsAndDialogs/ManageTestsBilanDialog'

const BilanTestSection = () => {
  const [openListeTestsDialog, setOpenListeTestsDialog] = useState<boolean>(false)

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
    </article>
  )
}

export default BilanTestSection