import { AnamneseDTO, AnamneseResults } from '@/@types/Anamnese'
import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { getChosenThemeArray } from '@/utils/sortAnamneseDatas'
import { MoveRight } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import AnamneseThemeCard from '../AnamneseThemeCard'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

type FamillePartProps = {
  
}

const FamillePart: FC<FamillePartProps> = ({}) => {
  const familleThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Famille")

  const {anamneseResults} = usePatientInfoStore()
  const {fratrie, compositionFamiliale} = anamneseResults ?? {}
  const {chosenThemes, setChosenThemes} = useAnamneseSearchDBStore()

  const [editData, setEditData] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string>("")

  useEffect(()=> {
    const result = getChosenThemeArray(anamneseResults)
    setChosenThemes(result)
  }, [fratrie, compositionFamiliale])


  return (
    <AnamneseItemLayout >
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire la famille du patient.
      </div>
      <div className='flex justify-center gap-x-3 mb-5' >
        <ChooseThemes 
          setEditData={setEditData} 
          editData={editData} 
          openDialog={openDeleteDialog} 
          setOpenDialog={setOpenDeleteDialog} 
          listeThemes={familleThemes} 
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      </div>  
      {
        chosenThemes.includes("Fratrie") &&
        <AnamneseThemeCard
          keyLabel='fratrie'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Fratrie"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Composition familiale") &&
        <AnamneseThemeCard
          keyLabel='compositionFamiliale'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Composition familiale"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
    </AnamneseItemLayout>
  )
}

export default FamillePart