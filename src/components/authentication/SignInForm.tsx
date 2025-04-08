'use client'

import { useRouter } from 'next/navigation'
import React, { FC, useActionState, useEffect } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { signInAction } from '@/serverActions/usersActions'
import { authClient } from '@/utils/auth-client'
import { LoaderCircle } from 'lucide-react'
import TextInput from '../inputs/TextInput'
import SubmitButton from '../ui/SubmitButton'


const SignInForm: FC = () => {
  const [state, formAction, isPending] = useActionState(signInAction, {})
  const router = useRouter()
  const {data: session, isPending: isLoading } = authClient.useSession();

  
  useEffect(()=> {
    if(session?.session && !isLoading){
      router.replace("/dashboard")
    }
  }, [router, isLoading, session, state])

  
  if(!isLoading && !session) {
    return (
      <Card className='w-96 mx-auto p-5'>
        <CardTitle className='text-center'>Se connecter</CardTitle>
        <CardContent>
          <form action={formAction}>
            <TextInput type='email' label='E-mail' name="email" placeholder='Adresse e-mail' />
            <TextInput type='password' label='Mot de passe' name="password" placeholder='Mot de passe' />
            <SubmitButton isPending={isPending} label='Connexion' />
          </form>
        </CardContent>
      </Card>
    )
  } 
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
      <p className='font-bold'>Chargement de la page ou redirection... </p>
      <LoaderCircle className='animate-spin' />
    </div>
)
}

export default SignInForm