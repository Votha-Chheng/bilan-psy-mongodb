import SignInForm from '@/components/authentication/SignInForm'
import React from 'react'

const ConnexionPage = () => {
  console.log(process.env.DATABASE_URL)
  return (
    <div className='w-full h-screen flex justify-center items-center gap-5'>
      <SignInForm/>
    </div>
  )
}

export default ConnexionPage