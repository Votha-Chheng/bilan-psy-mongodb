import React, { Dispatch, FC, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog'
import AddEcoleForm from '@/components/forms/ecole/AddEcoleForm'
import DeleteEcoleForm from '@/components/forms/ecole/DeleteEcoleForm'

type AddorDeleteEcoleDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddorDeleteEcoleDialog:FC<AddorDeleteEcoleDialogProps> = ({open, setOpen}) => {
  return (
    <Dialog 
      onOpenChange={()=> setOpen(prev=>!prev)}
      open={open} 
    >
      <DialogContent aria-describedby="Fenêtre pour gérer la liste des écoles" className="min-w-[1080px] bg-white border-black border-4">
        <DialogHeader>
          <DialogTitle className='text-center border-b-2 border-black text-xl mb-5 pb-2.5 tracking-wider'>
            Ajouter/Supprimer le nom d'un établissement scolaire dans la base de données
          </DialogTitle>
          <AddEcoleForm/>
        </DialogHeader>
       <DeleteEcoleForm/>
      </DialogContent>
    </Dialog>
  )
}

export default AddorDeleteEcoleDialog