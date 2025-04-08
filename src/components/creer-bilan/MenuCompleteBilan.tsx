'use client'

import { useMenuItemStore } from '@/stores/menuItemStore'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const MenuCompleteBilan = () => {
  const searchParams = useSearchParams()

  const {menuItem, setMenuItem} = useMenuItemStore()

  useEffect(()=> {
    setMenuItem(searchParams.get("menu-item"))
  }, [searchParams])

  const itemClassName = "cursor-pointer border-black border-2 w-[20%] p-2 text-center rounded-md transition-all duration-100 tracking-wider"

  return (
    <nav className='w-full pb-2'>
      <ul className='flex justify-around'>
        <Link href={`?menu-item=en-tete`} className={`${(menuItem === "en-tete") || !menuItem ? "bg-black text-white text-lg font-bold":"text-gray-400"} ${itemClassName}`}>
          <li>
            En-tête
          </li>
        </Link>
        <Link href={`?menu-item=anamnese`} className={`${menuItem === "anamnese" ? "bg-black text-white  text-lg font-bold":"text-gray-400"} ${itemClassName}`}>
          <li>
              Anamnèse
          </li>
        </Link>
        <Link className={`${menuItem === "bilan" ? "bg-black text-white  text-lg font-bold":"text-gray-400"} ${itemClassName}`} href={`?menu-item=bilan`}>
          <li>
              Bilan
          </li>
        </Link>
        <Link href={`?menu-item=conclusion`} className={`${menuItem === "conclusion" ? "bg-black text-white  text-lg font-bold":"text-gray-400"} ${itemClassName}`}>
          <li>
              Conclusion
          </li>
        </Link>
        <Link href={`?menu-item=amenagements`} className={`${menuItem === "amenagements" ? "bg-black text-white  text-lg font-bold":"text-gray-400"} ${itemClassName}`}>
          <li>
              Annexe/Aménagements
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default MenuCompleteBilan
