
import AddAdjectifComportementForm from '@/components/forms/anamnese/AddAdjectifComportementForm'
import DeletAdjectifsComportementForm from '@/components/creer-bilan/anamnese/DeletAdjectifsComportementForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React, { Dispatch, FC, SetStateAction } from 'react'

type ManageAdjectifsComportementDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ManageAdjectifsComportementDialog: FC<ManageAdjectifsComportementDialogProps> = ({ open, setOpen }) => {

  return (
    <Dialog open={open} onOpenChange={(isOpen)=> setOpen(isOpen)} >
      <DialogContent className="max-w-[900px] min-w-[900px]">
        <DialogHeader>
          <DialogTitle className='uppercase text-center'>Gérer la liste d’adjectifs</DialogTitle>
          <DialogDescription>
            Ajouter/Supprimer la liste d’adjectifs liés au comportement 
          </DialogDescription>
        </DialogHeader>
        <DeletAdjectifsComportementForm/>
        <Separator className='my-5'/>
        <AddAdjectifComportementForm/>
      </DialogContent>
    </Dialog>
  )
}

export default ManageAdjectifsComportementDialog
