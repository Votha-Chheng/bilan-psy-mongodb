import AddElementToList from '@/components/creer-bilan/anamnese/AddElementToList'
import DeleteElementFromListeForm from '@/components/forms/DeleteElementFromListeForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import React, { Dispatch, FC, SetStateAction } from 'react'

type ManageAutonomieDescriptionsDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ManageAutonomieDescriptionsDialog: FC<ManageAutonomieDescriptionsDialogProps> = ({open, setOpen}) => {
  const {autonomieDescription} = useAnamneseSearchDBStore()
  const {descriptionsListe, id} = autonomieDescription ?? {}
  
  return (
    <Dialog open={open} onOpenChange={(isOpen)=> setOpen(isOpen)} >
      <DialogContent className="max-w-[950px] min-w-[950px]">
        <DialogHeader>
          <DialogTitle className='uppercase text-center'>Gérer la liste de descriptions pour l’autonomie</DialogTitle>
          <DialogDescription>
            Ajouter/Supprimer la liste d’adjectifs liés à l’autonomie 
          </DialogDescription>
        </DialogHeader>
        <DeleteElementFromListeForm liste={descriptionsListe ?? null} listeId={id} />
        <Separator className='my-5'/>
        <AddElementToList/>
      </DialogContent>
    </Dialog>
  )
}

export default ManageAutonomieDescriptionsDialog
