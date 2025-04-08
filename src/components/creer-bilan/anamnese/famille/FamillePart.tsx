import { AnamneseDTO, AnamneseResults } from '@/@types/Anamnese'
import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import { anamneseKeysAndLabels, anamneseThemesDefault } from '@/datas/anamneseConstantes'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { getChosenThemeArray } from '@/utils/sortAnamneseDatas'
import { MoveRight } from 'lucide-react'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import AnamneseThemeCard from '../AnamneseThemeCard'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'

type FamillePartProps = {
  setPartieAnamnese: Dispatch<SetStateAction<number>>
  partieAnamnese: number
}

const FamillePart: FC<FamillePartProps> = ({setPartieAnamnese, partieAnamnese}) => {
  const familleThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Famille")

  const {anamneseResults} = usePatientInfoStore()
  const {fratrie, compositionFamiliale} = anamneseResults ?? {}

  const [editData, setEditData] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string>("")
  const [chosenThemes, setChosenThemes] = useState<string[]>([])

  useEffect(()=> {
    const result = getChosenThemeArray(anamneseResults)
    setChosenThemes(result)
  }, [fratrie, compositionFamiliale])

  const handleChosenThemes = (theme: string, keyTheme: keyof AnamneseResults) => {
    if(chosenThemes.includes(theme)){
      setDeleteDialogTheme(theme)
      if(anamneseResults && anamneseResults[keyTheme]){
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

  return (
    <AnamneseItemLayout setPartieAnamnese={setPartieAnamnese}  partieAnamnese={partieAnamnese} >
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire la famille du patient.
      </div>
      <div className='flex justify-center gap-x-3 mb-5' >
        <ChooseThemes listeThemes={familleThemes} handleChosenThemes={handleChosenThemes} chosenThemes={chosenThemes} />
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