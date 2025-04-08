import React, { FC, useState } from 'react'
import { Card, CardFooter } from '../ui/card'
import { PatientInfoFromDB } from '@/@types/PatientTypes'
import dayjs from 'dayjs'
import { Button } from '../ui/button'
import Link from 'next/link'
import { EyeIcon, Trash2Icon } from 'lucide-react'
import DeletePatientAlert from '../sharedUI/alertsAndDialogs/DeletePatientAlert'

type PatientCardProps = {
  patient: PatientInfoFromDB
}

const PatientCard: FC<PatientCardProps> = ({patient}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <DeletePatientAlert openDialog={open} setOpenDialog={setOpen} patientId={patient.id!}/>
      <Card className='p-3 my-5'>
        <small>Fiche créée le {dayjs(patient.createdAt).format("DD/MM/YYYY")} sous l&apos;identifiant n°{patient.id}</small>
        <div className='flex justify-between '>
          <div>
            <p>
              <span>Nom : </span><span className='font-bold'>{patient.nom}</span>
            </p>
            <p>
              <span>Pénom : </span><span className='font-bold'>{patient.prenom}</span> 
            </p>
            
            <div className='flex gap-x-2 items-center'>
              <span>Sexe : </span>
              <span className='font-bold'>{patient.sexe === "m" ? "Masculin" : "Féminin"}</span>
            </div>
          </div>
          <div>
            <p className='flex gap-x-2 items-center'>
              <span>Date de naissance : </span><span className='font-bold'>{dayjs(patient.dateNaissance).format("DD/MM/YYYY") }</span>
            </p>
            <span>Médecin prescripteur : </span><span className='font-bold'>{patient.medecin}</span>
          </div>
        </div>
        <CardFooter className='p-0'>
          <p className='underline underline-offset-2'>Motif</p>
          <p>&nbsp;:&nbsp;{patient.motif}</p>
        </CardFooter>
        <div className='w-full flex gap-x-8 justify-end'>
          <Button className='text-right'>
            <Link className='flex gap-2 items-center' href={`/creer-bilan/${patient.id}`}>
              <EyeIcon/> Voir/Modifier le bilan psychomoteur
            </Link>
          </Button>
          <Button className='bg-red-700 flex gap-2 items-center hover:bg-red-900' onClick={()=> setOpen(true)}>
            <Trash2Icon/> Supprimer le patient
          </Button>
        </div>
      </Card>
    </>
  )
}

export default PatientCard