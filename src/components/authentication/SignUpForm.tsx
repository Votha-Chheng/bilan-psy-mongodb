'use client'

import { signUpAction } from '@/serverActions/usersActions'
import { useRouter } from 'next/navigation'
import React, { FC, useActionState, useEffect } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { authClient } from '@/utils/auth-client'
import TextInput from '../inputs/TextInput'
import SubmitButton from '../ui/SubmitButton'

const SignUpForm: FC = () => {
  const [state, formAction, isPending] = useActionState(signUpAction, {})
  const router = useRouter()
  const { data: session } = authClient.useSession();

  useEffect(()=> {
    if(session?.session){
      router.push("/dashboard")
    }
  }, [router, session?.session])

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
