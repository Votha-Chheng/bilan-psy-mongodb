'use client'

import { signUpAction } from '@/serverActions/usersActions'
import React, { FC, useActionState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { authClient } from '@/utils/auth-client'
import TextInput from '../inputs/TextInput'
import SubmitButton from '../ui/SubmitButton'
import { Link, LoaderCircle } from 'lucide-react'
import { Button } from '../ui/button'

const SignUpForm: FC = () => {
  const [state, formAction, isPending] = useActionState(signUpAction, {})
  const { data: session } = authClient.useSession();
  
  if(isPending) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
        <p className='font-bold'>Chargement de la page ou redirection... </p>
        <LoaderCircle className='animate-spin' />
      </div>
    )
  }

  if(state.success || session?.user) {
    return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
      <Link href={`/dashboard`}>
        <Button>
          Cliquez pour accéder à votre tableau de bord
        </Button>
      </Link>
    </div>
    )
  }


  return (
    <Card className='w-96 mx-auto p-5'>
      <CardTitle className='text-center'>Créer un compte</CardTitle>
      <CardContent>
        <form action={formAction}>
          <TextInput vertical={true} type='email' label='E-mail' name="email" placeholder='Adresse e-mail'/>
          <TextInput vertical={true} type='text' label="Nom d'utilisateur" name="name" placeholder="Nom d'utilisateur" />
          <TextInput vertical={true} type='password' label='Mot de passe' name="password" placeholder='Mot de passe' />
          <SubmitButton isPending={isPending} />
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUpForm
