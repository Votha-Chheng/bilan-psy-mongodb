
import AddElementToListGeneric from '@/components/creer-bilan/anamnese/antecedents/AddElementToListGeneric'
import DeleteElementFromList from '@/components/forms/DeleteElementFromList'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { deleteTemperamentAction, upsertTemperamentAction } from '@/serverActions/listeActions'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import React, { Dispatch, FC, SetStateAction } from 'react'

type ManageTemperamentDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ManageTemperamentDialog: FC<ManageTemperamentDialogProps> = ({open, setOpen}) => {
  const {getListeTemperament, temperamentsDescription} = useAnamneseSearchDBStore()
  const {temperamentListe, id} = temperamentsDescription ?? {}

  const updateFunction = ()=> {
    getListeTemperament()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen)=> setOpen(isOpen)} >
      <DialogContent className="max-w-[950px] min-w-[950px]">
        <DialogHeader>
          <DialogTitle className='uppercase text-center'>Gérer la liste de descriptions pour le tempérament et la personnalité</DialogTitle>
          <DialogDescription>
            Ajouter/Supprimer la liste de descriptions liées au tempérament et à la personnalité
          </DialogDescription>
        </DialogHeader>
        <DeleteElementFromList liste={temperamentListe} listeId={id} updateFunction={updateFunction} actionFunction={deleteTemperamentAction} />
        <Separator className='my-5'/>
        <AddElementToListGeneric actionFunction={upsertTemperamentAction} listeId={id} updateFunction={updateFunction} />
      </DialogContent>
    </Dialog>
  )
}

export default ManageTemperamentDialog
