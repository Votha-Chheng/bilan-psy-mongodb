
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import React, { useEffect, useState } from 'react'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'
import { AnamneseResults } from '@/@types/Anamnese'
import { getChosenThemeArray } from '@/utils/sortAnamneseDatas'

const AntecedentsBody = () => {
  const antecedentsThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Antécédents médicaux personnels et suivis médicaux" && theme.theme)
  
  const {anamneseResults} = usePatientInfoStore()
  const {maladiesEventuelles, handicap, autres} = anamneseResults ?? {}
  const [editData, setEditData] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string>("")
  const [chosenThemes, setChosenThemes] = useState<string[]>([])

  const handleChosenThemes = (theme: string, keyTheme: keyof AnamneseResults) => {
    if(chosenThemes.includes(theme)){
      setDeleteDialogTheme(theme)
      if( anamneseResults && anamneseResults[keyTheme]){
        setOpenDeleteDialog(true)
      } else {
        setChosenThemes(prev => prev.filter(item => item !== theme))
      }
    }else{
      if(anamneseResults || (anamneseResults && !anamneseResults[keyTheme])){
        setEditData([...editData, theme])
      }
      setChosenThemes(prev => [...prev, theme])
    }
  }

  useEffect(()=> {
    const result = getChosenThemeArray(anamneseResults)
    setChosenThemes(result)
  }, [maladiesEventuelles, handicap, autres])

  return (
    <div className='mb-20'>
      <ChooseThemes listeThemes={antecedentsThemes} chosenThemes={chosenThemes} handleChosenThemes={handleChosenThemes }/>
      {
        chosenThemes.includes("Maladies éventuelles") &&
        <AnamneseThemeCard
          keyLabel='maladiesEventuelles'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Maladies éventuelles"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Handicap") &&
        <AnamneseThemeCard
          keyLabel='handicap'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Handicap"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Accompagnements et suivis") &&
        <AnamneseThemeCard
          keyLabel='accompagnementSuivi'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Accompagnements et suivis"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Autres") &&
        <AnamneseThemeCard
          keyLabel='autres'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Autres"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
    </div>
  )
}

export default AntecedentsBody
