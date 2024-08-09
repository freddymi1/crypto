'use client'

import React from 'react'
import styles from './navbar.module.css'
import { NavbarStyle } from '@/utils/constantStyle'
import { usePathname, useRouter } from 'next/navigation'
import { SortButton } from '../article-category/sort-button'

export const NavLink = () => {
  const router = useRouter()
  const url = usePathname()
  const NavigateToPage = (url: string) => {
    router.push(url)
  }

  return (
    <div className={`${NavbarStyle.navItem} py-2`}>
      <SortButton
        action={() => NavigateToPage('/')}
        label="Bullish"
        classN={`font-bold ${url === '/' ? styles.active : ''}`}
      />
      <SortButton
        action={() => NavigateToPage('/bearish')}
        label="Bearish"
        classN={`font-bold ${url === '/bearish' ? styles.active : ''}`}
      />
      <SortButton
        action={() => NavigateToPage('/latest')}
        label="Nouveaux"
        classN={`font-bold ${url === '/latest' ? styles.active : ''}`}
      />
      <SortButton
        action={() => NavigateToPage('/most-commented')}
        label="Plus commentés"
        classN={`font-bold ${url === '/most-commented' ? styles.active : ''}`}
      />
    </div>
  )
}
