import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'
import { Card } from '@/components/ui/card'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { MoveRight } from 'lucide-react'
import React, { useState } from 'react'

const QuoditienPart = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  const [editData, setEditData] = useState<string[]>([])

  const quotidienThemes = anamneseKeysAndLabels.filter(value=> value.domaine === "Quotidien")

  return (
    <AnamneseItemLayout>
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire le quotidien du patient.
      </div>
      <div className='flex justify-center gap-x-3 mb-5' >
        {/* <ChooseThemes 
          setEditData={setEditData} 
          editData={editData} 
          openDialog={openDeleteDialog} 
          setOpenDialog={setOpenDeleteDialog} 
          listeThemes={quotidienThemes} 
        /> */}
      </div> 
    </AnamneseItemLayout>
  )
}

export default QuoditienPart
