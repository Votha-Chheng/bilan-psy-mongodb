import React, { Dispatch, FC, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog'
import AddMedecinForm from '@/components/forms/medecin/AddMedecinForm'
import DeleteMedecinForm from '@/components/forms/medecin/DeleteMedecinForm'

type AddOrdeleteMedecinDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddOrdeleteMedecinDialog: FC<AddOrdeleteMedecinDialogProps> = ({open, setOpen}) => {
  return (
    <Dialog 
      onOpenChange={()=> setOpen(prev=>!prev)}
      open={open} 
    >
      <DialogContent aria-describedby="Fenêtre pour gérer la liste des médecins" className="min-w-[1080px] bg-white border-black border-4">
        <DialogHeader>
          <DialogTitle className='text-center border-b-2 border-black text-xl mb-5 pb-2.5 tracking-wider'>
            Ajouter/Supprimer le nom d'un médecin dans la base de données
          </DialogTitle>
          <AddMedecinForm/>
        </DialogHeader>
       <DeleteMedecinForm/>
      </DialogContent>
    </Dialog>
  )
}

export default AddOrdeleteMedecinDialog