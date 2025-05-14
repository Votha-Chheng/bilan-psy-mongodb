'use client'

import { usePatientInfoStore } from '@/stores/patientInfoStore'
import React, { useEffect } from 'react'
import PatientCard from './PatientCard'
import LoadingDatas from '../sharedUI/LoadingDatas'

const PatientsListe = () => {
  const {fetchAllPatients, allPatients, loadingAllPatients} = usePatientInfoStore()

  useEffect(()=> {
    fetchAllPatients()
  }, [])

  if(loadingAllPatients) return <LoadingDatas/>

  return (
    <div className='mx-5'>
      {
        allPatients && allPatients.map((patient)=> (
          <PatientCard key={patient.id} patient={patient} />
        ))
      }
    </div>
  )
}

export default PatientsListe