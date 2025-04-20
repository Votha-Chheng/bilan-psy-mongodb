import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { Dispatch, FC, SetStateAction } from 'react'

type ManageTestsBilanDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const ManageTestsBilanDialog: FC<ManageTestsBilanDialogProps> = ({setOpen, open}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen)=> setOpen(isOpen)} >
      <DialogContent className="max-w-[950px] min-w-[950px]">
        <DialogHeader>
          <DialogTitle className='uppercase text-center'>CHOISIR LES TESTS QUE VOUS UTILISEREZ</DialogTitle>
          <DialogDescription>
            Ajouter/Enlever les test utilisés pour le bilan
          </DialogDescription>
        </DialogHeader>
        
        
      </DialogContent>
    </Dialog>
  )
}

export default ManageTestsBilanDialog
