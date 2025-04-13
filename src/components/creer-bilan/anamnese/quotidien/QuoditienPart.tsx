import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'

const QuoditienPart = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string>("")
  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false) 
  
  return (
    <AnamneseItemLayout>
      <Card className='mb-5'>
        <AnamneseDBDialog
          open={openDBDialog} 
          setOpen={setOpenDBDialog} 
          dialogTitle={"Sensorialité"} 
          searchKeys={["sensorialite"]}
          indexDataToRetrieve={1}
        />
      </Card>
    </AnamneseItemLayout>
  )
}

export default QuoditienPart
