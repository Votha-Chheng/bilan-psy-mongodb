import React, { FC, ReactNode } from 'react'

type DomainWrapperProps = {
  display: boolean
  children: ReactNode
}

const DomainWrapper: FC<DomainWrapperProps> = ({children, display}) => {
  if(!display) return null
  return (
    <section className='overflow-hidden min-w-full'>
      {children}
    </section>
  )
}

export default DomainWrapper