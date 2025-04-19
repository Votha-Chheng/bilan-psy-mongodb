import { AnamneseResults, AnamneseResultsDomaineKeyLabel } from '@/@types/Anamnese'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import DeleteAnamneseThemeAlert from './alertsAndDialogs/DeleteAnamneseThemeAlert'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { elementsInArrayAllEpmty } from '@/utils/checkIfNullOrEmptyFunctions'

type ChooseThemesProps = {
  listeThemes: AnamneseResultsDomaineKeyLabel[]
  editData: string[]
  setEditData: Dispatch<SetStateAction<string[]>>
  openDialog: boolean
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const ChooseThemes: FC<ChooseThemesProps> = ({listeThemes, editData, setEditData, openDialog, setOpenDialog,}) => {
  const {anamneseResults} = usePatientInfoStore()
  const {chosenThemes, setChosenThemes} = useAnamneseSearchDBStore()
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string>("")

  const handleChosenThemes = (theme: string, keyTheme: keyof AnamneseResults|null) => {
    if(!keyTheme) return
    if(chosenThemes.includes(theme)){
      setThemeToDelete(theme)
      setKeyToDelete(keyTheme)
      if(anamneseResults && anamneseResults[keyTheme]){
        setOpenDialog(true)
      } else {
        const prev = [...chosenThemes]
        setChosenThemes(prev.filter(item => item !== theme))
      }
    }else{
      if(anamneseResults){
        if(!anamneseResults[keyTheme] && !Array.isArray(anamneseResults[keyTheme])){
          setEditData([...editData, theme])
        } else {
          if(anamneseResults[keyTheme] && Array.isArray(anamneseResults[keyTheme])){
            if(elementsInArrayAllEpmty(anamneseResults?.[keyTheme])){
              setEditData([...editData, theme])
            }
          }
        }
      }
      setChosenThemes([...chosenThemes, theme])
    }
  }
  
  return (
    <div className='flex justify-center gap-x-3 mb-5 flex-wrap' >
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
            onClick={()=>handleChosenThemes(theme.label, theme.key)}
          >
            {theme.label}
          </Badge>
        ))
      }
    </div>  
  )
}

export default ChooseThemes