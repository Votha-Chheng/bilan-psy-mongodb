import { Loader2Icon } from 'lucide-react'
import React from 'react'

const LoadingDatas = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <p>Chargement des données...</p>
      <Loader2Icon className='animate-spin' />
    </div>
  )
}

export default LoadingDatas