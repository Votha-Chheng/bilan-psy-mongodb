import CompleteBilanBody from '@/components/creer-bilan/CompleteBilanBody'
import ConvertToDocxButton from '@/components/creer-bilan/ConvertToDocxButton'
import MenuCompleteBilan from '@/components/creer-bilan/MenuCompleteBilan'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CompleteBilanPage = async() => {
  return (
    <main>
      <header className='flex justify-between mx-7.5 py-4 items-center'>
        <Button asChild>
          <Link href='/dashboard'>
            <ArrowLeftCircle/> Retour à l'accueil
          </Link>
        </Button>
        <h2 className='uppercase font-bold tracking-wider text-xl'>Complétez le bilan psychomoteur</h2>
        <ConvertToDocxButton/>
      </header>
      <Separator/>
      <MenuCompleteBilan/>
      <CompleteBilanBody/>
    </main>
  )
}

export default CompleteBilanPage