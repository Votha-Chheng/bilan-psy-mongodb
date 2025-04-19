import AnamneseItemLayout from '@/components/layouts/AnamneseItemLayout'
import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import { MoveRight } from 'lucide-react'
import React, {useState } from 'react'
import ClasseCard from './ClasseCard'
import ApprentissagesCard from './ApprentissagesCard'
import OutilsScolairesCard from './OutilsScolairesCard'
import EcritureCard from './EcritureCard'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import CardWrapper from '../CardWrapper'
import CartableBureauCard from './CartableBureauCard'
import RelationsPairsCard from './RelationsPairsCard'
import ComportementCard from './ComportementCard'
import AttentionCard from './AttentionCard'
import { AnamneseResults } from '@/@types/Anamnese'

const ScolaritePart = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const {anamneseResults} = usePatientInfoStore()
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)
  
  const {cahiers, anterieur} = anamneseResults ?? {}

  const scolariteThemes = anamneseKeysAndLabels.filter(value=> value.domaine === "Scolarité")

  return (
    <AnamneseItemLayout>
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire le quotidien du patient.
      </div>
      <div className='flex justify-center gap-x-3 mb-5' >
        <ChooseThemesAlt 
          listeThemes={scolariteThemes} 
          setOpenDialog={setOpenDeleteDialog} 
          setKeyToDelete={setKeyToDelete}
          openDialog={openDeleteDialog} 
          themeToDelete={themeToDelete}
          setThemeToDelete={setThemeToDelete} 
          keyToDelete={keyToDelete}
        />
      </div> 
      <CardWrapper themeLabel='Classe'>
        <ClasseCard/>
      </CardWrapper>

      <CardWrapper themeLabel='Apprentissages'> 
        <ApprentissagesCard/>
      </CardWrapper>

      <CardWrapper themeLabel='Utilisation des outils scolaires' > 
        <OutilsScolairesCard/>
      </CardWrapper>

      <CardWrapper themeLabel='Écriture'> 
        <EcritureCard />
      </CardWrapper>

      <CardWrapper themeLabel='Organisation du cartable et du bureau'> 
        <CartableBureauCard/>
      </CardWrapper>

      <CardWrapper themeLabel='Relations avec les pairs'> 
        <RelationsPairsCard/>
      </CardWrapper>
      
      <CardWrapper themeLabel='Comportement' > 

        <ComportementCard/>
      </CardWrapper>

      <CardWrapper themeLabel='Sphère attentionnelle' > 
        <AttentionCard/>
      </CardWrapper>

      <CardWrapper themeLabel='Observations des cahiers'>
        <AnamneseThemeCard
          label="Observations des cahiers"
          keyLabel="cahiers"
          data={cahiers}
        />
      </CardWrapper>      

      <CardWrapper themeLabel='Scolarité antérieure'>
        <AnamneseThemeCard
          label="Scolarité antérieure"
          keyLabel="anterieur"
          data={anterieur}
        />
      </CardWrapper>

    </AnamneseItemLayout>
  )
}

export default ScolaritePart
