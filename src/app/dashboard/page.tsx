
import PatientsList from '@/components/dashboard/PatientsList'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'

const DashboardPage = async() => {

  return (
    <section>
      <div className='mx-auto flex justify-center pt-5'>
        <Button className='p-5'>
          <Link href='/creer-bilan' className='flex items-center gap-x-2 text-xl uppercase'>
            Créer un nouveau bilan psychomoteur
          </Link>
        </Button>
      </div>
      <Separator className='w-full h-0.5 my-5'/>
      <h1 className='text-3xl text-center font-bold'>Liste des patients dans la base de données</h1>
      <PatientsList/>

    </section>

  )
}

export default DashboardPage