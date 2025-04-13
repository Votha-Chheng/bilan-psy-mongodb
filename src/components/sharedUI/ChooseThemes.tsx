import { AnamneseDTO, AnamneseResults, AnamneseResultsDomaineKeyLabel, AnamneseTheme } from '@/@types/Anamnese'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Badge } from '../ui/badge'
import DeleteAnamneseThemeAlert from './alertsAndDialogs/DeleteAnamneseThemeAlert'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

type ChooseThemesProps = {
  listeThemes: AnamneseResultsDomaineKeyLabel[]
  setDeleteDialogTheme: Dispatch<SetStateAction<string>>
  editData: string[]
  setEditData: Dispatch<SetStateAction<string[]>>
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const ChooseThemes: FC<ChooseThemesProps> = ({listeThemes, editData, setEditData, openDialog, setOpenDialog, setDeleteDialogTheme}) => {
  const {anamneseResults} = usePatientInfoStore()
  const {chosenThemes, setChosenThemes} = useAnamneseSearchDBStore()
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string>("")

  const handleChosenThemes = (theme: string, keyTheme: keyof AnamneseResults|null) => {
    if(!keyTheme) return
    if(chosenThemes.includes(theme)){
      setDeleteDialogTheme(theme)
      if(anamneseResults && anamneseResults[keyTheme]){
        setOpenDialog(true)
      } else {
        const prev = [...chosenThemes]
        setChosenThemes(prev.filter(item => item !== theme))
      }
    }else{
      if(anamneseResults || (anamneseResults && !anamneseResults[keyTheme])){
        setEditData([...editData, theme])
      }
      setChosenThemes([...chosenThemes, theme])
    }
  }

  return (
    <div className='flex justify-center gap-x-3 mb-5' >
      <DeleteAnamneseThemeAlert 
        editData={editData} 
        setEditData={setEditData} 
        openDialog={openDialog} 
        setOpenDialog={setOpenDialog} 
        themeToDelete={themeToDelete} 
        setDeleteDialogTheme={setThemeToDelete}
        keyToDelete={keyToDelete}
      />
      {
        listeThemes.map((theme: AnamneseResultsDomaineKeyLabel, index: number) => (
          <Badge 
            key={index} 
            variant="outline" 
            className={`mb-2 cursor-pointer text-sm font-bold tracking-wider ${chosenThemes.includes(theme.label) && "bg-slate-300"}`} 
            onClick={()=> {
              handleChosenThemes(theme.label, theme.key)
              setKeyToDelete(theme.key)
              setThemeToDelete(theme.label)
            }}
          >
            {theme.label}
          </Badge>
        ))
      }
    </div>  
  )
}

export default ChooseThemes