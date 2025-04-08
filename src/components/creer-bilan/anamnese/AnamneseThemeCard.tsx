import { AnamneseDTO, AnamneseResults } from '@/@types/Anamnese'
import SimpleAnamneseInputForm from '@/components/forms/anamnese/SimpleAnamneseInputForm'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import DeleteAnamneseThemeAlert from '@/components/sharedUI/alertsAndDialogs/DeleteAnamneseThemeAlert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { upsertFamilleAction } from '@/serverActions/anamneseActions'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { CornerUpLeft, Database, EditIcon } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'

type AnamneseThemeCardProps = {
  editData: string[]
  setEditData: Dispatch<SetStateAction<string[]>>
  openDeleteDialog: boolean
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>
  label: string
  setDeleteDialogTheme: Dispatch<SetStateAction<string>>
  deleteDialogTheme: string
  keyLabel: keyof AnamneseResults
}

const AnamneseThemeCard:FC<AnamneseThemeCardProps> = ({ editData, setEditData, openDeleteDialog, setOpenDeleteDialog, label, deleteDialogTheme, setDeleteDialogTheme, keyLabel }) => {
  const {anamneseResults} = usePatientInfoStore()

  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false)
  
  return (
    <Card className='px-5 pt-1.5 mb-4 gap-0'>
      <AnamneseDBDialog
        open={openDBDialog}
        setOpen={setOpenDBDialog}
        dialogTitle={`Données enregistrées précédemment concernant le thème ${label} :`}
        searchKeys={[keyLabel]}
      />
      <DeleteAnamneseThemeAlert 
        editData={editData} 
        setEditData={setEditData} 
        openDialog={openDeleteDialog} 
        setOpenDialog={setOpenDeleteDialog} 
        themeToDelete={deleteDialogTheme} 
        setDeleteDialogTheme={setDeleteDialogTheme}
      />
      <span className={`flex gap-x-2 items-center border border-transparent hover:border-slate-500 w-fit p-2 rounded-md mb-1`}>&bull; 
        <span className='underline underline-offset-2 whitespace-nowrap font-bold'>{label} : </span> 
        <span className={`${editData.includes(label) && "opacity-30"}`}>{anamneseResults && anamneseResults[keyLabel]}</span>
        {
          editData.includes(label)
          ?
          <CornerUpLeft 
            size={20} 
            className={`cursor-pointer text-red-700 ${(anamneseResults && anamneseResults[keyLabel] === null) ?"hidden":"block"}`}
            onClick={()=> setEditData(prev=> prev.filter(item=> item !== label))}
          />
          :
          <EditIcon size={17.5} className='cursor-pointer text-slate-400 hover:scale-110 hover:text-orange-400 transition-colors duration-100' onClick={()=> setEditData([...editData, label])}/>
        }
      </span>
      {
        editData.includes(label) &&
        <SimpleAnamneseInputForm 
          buttonLabel={anamneseResults && anamneseResults[keyLabel] ? "Remplacer la description":"Ajouter la description"} 
          setEditData={setEditData} 
          name={keyLabel} 
          defaultValue={(anamneseResults && anamneseResults[keyLabel]) ?? undefined}
          keyAnamnese={keyLabel}
        />
      }
      <Separator className='mb-2.5' />
      <Button className='w-fit' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les descriptions dans la base de données pour le thème "{label}"
      </Button>
    </Card>
  )
}

export default AnamneseThemeCard
