import React, { Dispatch, FC, SetStateAction, useActionState, useEffect } from 'react'
import { deletePatientByIdAction } from '@/serverActions/patientActions'

import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { toast } from 'sonner'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import SubmitButton from '@/components/ui/SubmitButton'

type DeletePatientAlertProps = {
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
  patientId: string
}

const DeletePatientAlert: FC<DeletePatientAlertProps> = ({openDialog, setOpenDialog, patientId}) => {
  const [state, formAction, isPending] = useActionState(deletePatientByIdAction, {})
  const {updateAllPatients} = usePatientInfoStore()

  useEffect(()=> {
    if(state.success){
      updateAllPatients()
      setOpenDialog(false)

      toast.success("Patient supprimé de la base de donnée", {
        action: {
          label: "Fermer",
          onClick: () => console.log("Fermer"),
        },
      })
    }
  }, [state])

  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent className='bg-white'>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr(e) de vouloir supprimer ce patient ?</AlertDialogTitle>
          <AlertDialogDescription>
            Toutes les données liées à ce patient seront supprimées de la base de données.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {
          !state.success && state.message && <p className='text-red-700 font-bold'>{state.message}</p>
        }
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=> setOpenDialog(false)}>Annuler</AlertDialogCancel>
          <AlertDialogAction asChild >
            <form action={formAction}>
              <input type='hidden' name="patientId" value={patientId} />
              <SubmitButton label='Supprimer le patient' isPending={isPending} />
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePatientAlert