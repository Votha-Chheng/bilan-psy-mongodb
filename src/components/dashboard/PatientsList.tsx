'use client'

import { usePatientInfoStore } from '@/stores/patientInfoStore'
import React, { useEffect } from 'react'
import PatientCard from './PatientCard'

const PatientsListe = () => {
  const {fetchAllPatients, allPatients} = usePatientInfoStore()

  useEffect(()=> {
    fetchAllPatients()
  }, [])


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