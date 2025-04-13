import React, { useEffect, useState } from 'react'
import AgeMarche from './AgeMarche'
import ChooseThemes from '@/components/sharedUI/ChooseThemes'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { getChosenThemeArray } from '@/utils/sortAnamneseDatas'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { AnamneseResults } from '@/@types/Anamnese'
import { MoveRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import AnamneseThemeCard from '../AnamneseThemeCard'
import AccouchementCard from './AccouchementCard'
import AcquisitionLangage from './AcquisitionLangage'
import Continence from './Continence'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

const DevPsyBody = () => {
  const {anamneseResults} = usePatientInfoStore()
  const {chosenThemes, setChosenThemes} = useAnamneseSearchDBStore()
  const [editData, setEditData] = useState<string[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [deleteDialogTheme, setDeleteDialogTheme] = useState<string>("")
  const devPsyListeThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Développement psychomoteur" && theme.theme)

  useEffect(()=> {
    if(anamneseResults){
      const result = getChosenThemeArray(anamneseResults)
      setChosenThemes(result)
    }
  }, [anamneseResults])
  
  return (
    <div>
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire les antécédents médicaux du patient.
      </div>
      <Separator className='my-5'/>
      <ChooseThemes 
        editData={editData}
        setEditData={setEditData}
        openDialog={openDeleteDialog}
        setOpenDialog={setOpenDeleteDialog}
        listeThemes={devPsyListeThemes} 
        setDeleteDialogTheme={setDeleteDialogTheme}
      />
      <Separator className='my-5'/>
      {
        chosenThemes.includes("Grossesse") && 
        <AnamneseThemeCard
          keyLabel='grossesse'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Grossesse"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Accouchement") && 
        <AccouchementCard />
      }
      {
        chosenThemes.includes("Age de la station assise") && 
        <AnamneseThemeCard
          keyLabel='stationAssise'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Age de la station assise"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Quadrupédie") && 
        <AnamneseThemeCard
          keyLabel='quadrupedie'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Quadrupédie"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Âge de la marche") && 
        <AgeMarche/>
      }
      {
        chosenThemes.includes("Acquisition du langage") && 
        <AcquisitionLangage/>
      }
      {
        chosenThemes.includes("Continence") && 
        <Continence/>
        
      }
      {
        chosenThemes.includes("Sommeil") && 
        <AnamneseThemeCard
          keyLabel='sommeil'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Sommeil"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Alimentation") && 
        <AnamneseThemeCard
          keyLabel='alimentation'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Alimentation"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Alimentation") && 
        <AnamneseThemeCard
          keyLabel='autresDevPsy'
          editData={editData}
          setEditData={setEditData}
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          label={"Autres"}
          deleteDialogTheme={deleteDialogTheme}
          setDeleteDialogTheme={setDeleteDialogTheme}
        />
      }
      {
        chosenThemes.includes("Autres") && 
        <AnamneseThemeCard
          keyLabel='autresDevPsy'
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

export default DevPsyBody
