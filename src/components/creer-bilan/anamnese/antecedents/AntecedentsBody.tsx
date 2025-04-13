
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import React, { useEffect, useState } from 'react'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'
import { getChosenThemeArray } from '@/utils/sortAnamneseDatas'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

const AntecedentsBody = () => {
  const antecedentsThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Antécédents médicaux personnels et suivis médicaux" && theme.theme)
  
  const {anamneseResults} = usePatientInfoStore()
  const {maladiesEventuelles, handicap, autres} = anamneseResults ?? {}
  const {chosenThemes, setChosenThemes} = useAnamneseSearchDBStore()

  const [editData, setEditData] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string>("")


  useEffect(()=> {
    const result = getChosenThemeArray(anamneseResults)
    setChosenThemes(result)
  }, [maladiesEventuelles, handicap, autres])

  return (
    <div className='mb-20'>
      <ChooseThemes 
        listeThemes={antecedentsThemes} 
        setDeleteDialogTheme={setDeleteDialogTheme}
        editData={editData}
        setEditData={setEditData}
        openDialog={openDeleteDialog}
        setOpenDialog={setOpenDeleteDialog}
      />
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
