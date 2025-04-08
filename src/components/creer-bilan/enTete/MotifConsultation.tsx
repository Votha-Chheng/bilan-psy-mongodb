import MotifConsultationForm from '@/components/forms/MotifConsultationForm'
import MotifsListeDialog from '@/components/sharedUI/alertsAndDialogs/MotifsListeDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { EditIcon, Eye, Undo2 } from 'lucide-react'
import React, { useState } from 'react'

const MotifConsultation = () => {
  const {patientInfoGenerales} = usePatientInfoStore()
  const [changeMotif, setChangeMotif] = useState<boolean>(false)
  const [openMotifDialog, setOpenMotifDialog] = useState<boolean>(false)

  return (
    <>
      <MotifsListeDialog open={openMotifDialog} setOpen={setOpenMotifDialog}/>
      <Card className='my-10'>
        <CardContent>
          <div className='font-bold underline underline-offset-2 relative flex items-center gap-x-2.5'>
            Motif de consultation :
            <div className='flex gap-x-3 items-center'>
              <EditIcon size={20} className={`${!changeMotif ? "cursor-pointer text-blue-600":"opacity-20"}`} onClick={()=> !changeMotif && setChangeMotif(true)}/>
              <Undo2 size={20} className={`${changeMotif ? "cursor-pointer text-red-700":"opacity-20"}`} onClick={()=> changeMotif && setChangeMotif(false)}/>
              <Button className='self-end' type='button' onClick={()=> setOpenMotifDialog(true)}>
                <Eye/> Voir les motifs de consultation existants
              </Button>
            </div>

          </div>
          <div className='mt-2.5'>
            {
              changeMotif
              ?
              <MotifConsultationForm setChangeMotif={setChangeMotif}/>
              :
              <p>{patientInfoGenerales?.motif}</p>
            }

          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default MotifConsultation
