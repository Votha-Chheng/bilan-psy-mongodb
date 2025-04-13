import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { getChosenThemeArray } from '@/utils/sortAnamneseDatas'
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { MoveRight } from 'lucide-react'
import MotriciteGlobaleFineCard from './MotricitéGlobaleFineCard'
import SensorialiteCard from './SensorialiteCard'
import VeloCard from './VeloCard'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

const MotricitePart: FC = () => {
  const familleThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Motricité")

  const {anamneseResults} = usePatientInfoStore()
  const {motriciteFine, motriciteGlobale, velo, praxiesGestuelles, extraScolaire, autresMotricite, sensorialite} = anamneseResults ?? {}
  const {setChosenThemes, chosenThemes} = useAnamneseSearchDBStore()

  const [editData, setEditData] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string>("")
  
  useEffect(()=> {
    if(anamneseResults){
      const result = getChosenThemeArray(anamneseResults)
      setChosenThemes(result)
    }
  }, [motriciteFine, motriciteGlobale, velo, praxiesGestuelles, extraScolaire, autresMotricite, sensorialite])


  return (
    <AnamneseItemLayout > 

      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire la motricité du patient.
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
        chosenThemes.includes("Motricité globale") &&
        <MotriciteGlobaleFineCard
          title='Motricité globale'
          keyLabel='motriciteGlobale'
          globaleFineState={motriciteGlobale}
        />
      }
      {
        chosenThemes.includes("Motricité fine") &&
        <MotriciteGlobaleFineCard
          title='Motricité fine'
          keyLabel='motriciteFine'
          globaleFineState={motriciteFine}
        />
      }
      {
        chosenThemes.includes("Acquisition du vélo sans les roulettes") &&
        <VeloCard/>
      }
      {
        chosenThemes.includes("Praxies gestuelles") &&
        <AnamneseThemeCard
          keyLabel='praxiesGestuelles'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Praxies gestuelles"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Activités extra-scolaires") &&
        <AnamneseThemeCard
          keyLabel='extraScolaire'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Activités extra-scolaires"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Sensorialité") &&
        <SensorialiteCard/>
      }
      {
        chosenThemes.includes("Autres") &&
        <AnamneseThemeCard
          keyLabel='autresMotricite'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Autres"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
    </AnamneseItemLayout>
  )
}

export default MotricitePart
