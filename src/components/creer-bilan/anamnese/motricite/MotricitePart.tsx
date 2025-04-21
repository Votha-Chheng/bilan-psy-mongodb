import { anamneseKeysAndLabels } from '@/datas/anamneseConstantes'
import React, { FC, useState } from 'react'
import AnamneseThemeCard from '../AnamneseThemeCard'
import { MoveRight} from 'lucide-react'
import MotriciteGlobaleFineCard from './MotricitéGlobaleFineCard'
import SensorialiteCard from './SensorialiteCard'
import VeloCard from './VeloCard'
import ChooseThemesAlt from '@/components/sharedUI/ChoseThemesAlt'
import { AnamneseResults } from '@/@types/Anamnese'
import CardWrapper from '../CardWrapper'
import AnamneseTitleItem from '../AnamneseTitleItem'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'

const MotricitePart: FC = () => {
  const motriciteThemes = anamneseKeysAndLabels.filter(theme => theme.domaine === "Motricité")

  const {anamneseResults} = useAnamneseSearchDBStore()
  const {motriciteFine, motriciteGlobale, praxiesGestuelles, extraScolaire, autresMotricite} = anamneseResults ?? {}

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [keyToDelete, setKeyToDelete] = useState<keyof AnamneseResults|null>(null)
  const [themeToDelete, setThemeToDelete] = useState<string|null>(null)
  
  return (
    <article className="min-w-full px-5"> 
      <AnamneseTitleItem/>
      <div className='flex gap-x-2 font-bold mb-5'>
        <MoveRight/> Choisir les thèmes qui vous semblent pertinents pour décrire la motricité du patient.
      </div>
      <ChooseThemesAlt 
        listeThemes={motriciteThemes} 
        setOpenDialog={setOpenDeleteDialog} 
        setKeyToDelete={setKeyToDelete}
        openDialog={openDeleteDialog} 
        themeToDelete={themeToDelete}
        setThemeToDelete={setThemeToDelete} 
        keyToDelete={keyToDelete}
      />
      <CardWrapper themeLabel="Motricité globale" >
        <MotriciteGlobaleFineCard
          title='Motricité globale'
          keyLabel='motriciteGlobale'
          globaleFineState={motriciteGlobale}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Motricité fine" >
        <MotriciteGlobaleFineCard
          title='Motricité fine'
          keyLabel='motriciteFine'
          globaleFineState={motriciteFine}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Acquisition du vélo sans les roulettes" >
        <VeloCard />
      </CardWrapper>
      <CardWrapper themeLabel="Praxies gestuelles" >
        <AnamneseThemeCard
          keyLabel='praxiesGestuelles'
          label={"Praxies gestuelles"}
          data={praxiesGestuelles}
        />
      </CardWrapper>

      <CardWrapper themeLabel="Activités extra-scolaires" >
        <AnamneseThemeCard
          keyLabel='extraScolaire'
          label={"Activités extra-scolaires"}
          data={extraScolaire}
        />
      </CardWrapper>
      
      <CardWrapper themeLabel="Sensorialité" >
        <SensorialiteCard />
      </CardWrapper>

      <CardWrapper themeLabel="Autres (motricité)" >
        <AnamneseThemeCard
          keyLabel='autresMotricite'
          label={"Autres (motricité)"}
          data={autresMotricite}
        />
      </CardWrapper>
    </article>
  )
}

export default MotricitePart
