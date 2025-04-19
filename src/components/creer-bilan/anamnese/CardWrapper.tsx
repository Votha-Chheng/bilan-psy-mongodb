import { useAnamneseSearchDBStore } from '@/stores/anamneseSearchDBStore'
import React, { FC, ReactNode } from 'react'

type CardWrapperProps = {
  children: ReactNode
  themeLabel: string
}

const CardWrapper: FC<CardWrapperProps> = ({children, themeLabel, }) => {
  const {chosenThemes} = useAnamneseSearchDBStore()

  return (
    <div>
      {
        chosenThemes.includes(themeLabel) &&
        children
      }
    </div>
  )
}

export default CardWrapper
