import React, { Dispatch, FC, SetStateAction, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { setPropertyToNullByKeyValueAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import { normalToCamelCase } from '@/utils/convertCamelCaseToNormal'
import SubmitButton from '@/components/ui/SubmitButton'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

type DeleteAnamneseThemeAlertProps = {
  themeToDelete: string
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
  setEditData: Dispatch<SetStateAction<string[]>>
  editData: string[]
  setDeleteDialogTheme: Dispatch<SetStateAction<string>>
}

const DeleteAnamneseThemeAlert: FC<DeleteAnamneseThemeAlertProps> = ({ themeToDelete, openDialog, setOpenDialog, setEditData, editData, setDeleteDialogTheme }) => {
  const {id: patientId} = useParams<{id: string}>()
  const [state, formAction, isPending] = useActionState(setPropertyToNullByKeyValueAction, {})
  const {updatePatientInfoFromDB} = usePatientInfoStore()

  useEffect(()=> {
    if(state.success){
      updatePatientInfoFromDB(patientId)
      setOpenDialog(false)
      setEditData([...editData, themeToDelete])
      setDeleteDialogTheme("")

      toast.success("Données supprimées...", {
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
          <AlertDialogTitle>Êtes-vous sûr(e) de vouloir supprimer ce thème ?</AlertDialogTitle>
          <AlertDialogDescription>
            Si vous enlevez ce thème, vous supprimerez toutes les données liées à ce thème <span className='font-bold'>({themeToDelete})</span> concernant ce patient.
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
              <input type='hidden' name="key" value={normalToCamelCase(themeToDelete)} />
              <SubmitButton label='Supprimer les données' isPending={isPending} />
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAnamneseThemeAlert
