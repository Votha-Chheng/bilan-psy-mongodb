import CreatePatientForm from '@/components/forms/patient/CreatePatientForm'
import React from 'react'

const CreerBilanPage = () => {
  return (
    <>
      <h1 className="font-bold text-2xl text-center border-b-2 border-black p-5 mb-5 uppercase tracking-widest">Création d&apos;une fiche de bilan psychomoteur</h1>
      <div className='px-10'>
        <CreatePatientForm/>
      </div>
    </>
  )
}

export default CreerBilanPage
