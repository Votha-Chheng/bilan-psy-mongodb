import { AnamneseResults } from '@/@types/Anamnese'
import SimpleAnamneseInputForm from '@/components/forms/anamnese/SimpleAnamneseInputForm'
import AnamneseDBDialog from '@/components/sharedUI/alertsAndDialogs/AnamneseDBDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import { usePatientInfoStore } from '@/stores/patientInfoStore'
import { CornerUpLeft, Database, EditIcon } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'

type AnamneseThemeCardProps = {
  label: string
  keyLabel: keyof AnamneseResults
  data: string|undefined|null
}

const AnamneseThemeCard:FC<AnamneseThemeCardProps> = ({ label, keyLabel, data }) => {
  const {anamneseResults} = useAnamneseSearchDBStore()
  const [edit, setEdit] = useState<boolean>(false)

  const [openDBDialog, setOpenDBDialog] = useState<boolean>(false)

  useEffect(()=> {
    if(!data){
      setEdit(true)
    } else {
      setEdit(false)
    }
  }, [data])

  
  return (
    <Card className='px-5 pt-1.5 my-5 gap-0'>
      <AnamneseDBDialog
        open={openDBDialog}
        setOpen={setOpenDBDialog}
        dialogTitle={`Données enregistrées précédemment concernant le thème ${label} :`}
        searchKeys={[keyLabel]}
      />
      <span className={`flex gap-x-2 items-center border border-transparent hover:border-slate-500 w-fit p-2 rounded-md mb-1`}>&bull; 
        <span className='underline underline-offset-2 whitespace-nowrap font-bold'>{label} : </span> 
        <span className={`${edit && "opacity-30"}`}>{anamneseResults && anamneseResults[keyLabel]}</span>
        {
          edit
          ?
          <CornerUpLeft 
            size={20} 
            className={`cursor-pointer text-red-700 ${(anamneseResults && !anamneseResults[keyLabel]) ?"hidden":"block"}`}
            onClick={()=> setEdit(false)}
          />
          :
          <EditIcon size={17.5} className='cursor-pointer text-slate-400 hover:scale-110 hover:text-orange-400 transition-colors duration-100' onClick={()=> setEdit(true)}/>
        }
      </span>
      {
        edit &&
        <SimpleAnamneseInputForm 
          buttonLabel={anamneseResults && anamneseResults[keyLabel] ? "Remplacer la description":"Ajouter la description"} 
          name={keyLabel} 
          defaultValue={(anamneseResults && anamneseResults[keyLabel] as string|null|undefined) ?? undefined}
          keyAnamnese={keyLabel}
          themeTitle={label}
          setEdit={setEdit}
          edit={edit}
        />
      }
      <Separator className='mb-2.5' />
      <Button className='w-fit' size="sm" onClick={()=> setOpenDBDialog(true)}>
        <Database/> Voir les descriptions dans la base de données pour le thème "{label}"
      </Button>
    </Card>
  )
}

export default AnamneseThemeCard
