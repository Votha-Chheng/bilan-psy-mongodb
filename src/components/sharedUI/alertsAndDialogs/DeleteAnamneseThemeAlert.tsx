import React, { Dispatch, FC, SetStateAction, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { setPropertyToNullByKeyAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useParams } from 'next/navigation'
import SubmitButton from '@/components/ui/SubmitButton'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { AnamneseResults } from '@/@types/Anamnese'
import { useToast } from '@/customHooks/useToast'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

type DeleteAnamneseThemeAlertProps = {
  themeToDelete: string|null
  setThemeToDelete: Dispatch<SetStateAction<string|null>>
  keyToDelete: keyof AnamneseResults|null
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
  setKeyToDelete: Dispatch<SetStateAction<keyof AnamneseResults|null>>
}

const DeleteAnamneseThemeAlert: FC<DeleteAnamneseThemeAlertProps> = ({ themeToDelete, openDialog, setOpenDialog, keyToDelete, setKeyToDelete, setThemeToDelete }) => {
  const {id: patientId} = useParams<{id: string}>()
  const {setChosenThemes, chosenThemes} = useAnamneseSearchDBStore()
  const [state, formAction, isPending] = useActionState(setPropertyToNullByKeyAction, {})
  const {updatePatientInfoFromDB} = usePatientInfoStore()

  const updateFunction = ()=> {
    updatePatientInfoFromDB(patientId)
    setOpenDialog(false)
    setKeyToDelete(null)
    const newThemeArray = chosenThemes.filter(theme => theme !== themeToDelete)
    setThemeToDelete(null)
    setChosenThemes(newThemeArray)
  }

  useToast({state, updateFunction})

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
              <input type='hidden' name="key" value={keyToDelete ?? ""} />
              <SubmitButton label='Supprimer les données' isPending={isPending} />
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAnamneseThemeAlert
