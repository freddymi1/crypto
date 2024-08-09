'use client'

import styles from './navbar.module.css'
import { NavbarStyle } from '@/utils/constantStyle'
import { VscSettings } from 'react-icons/vsc'
import { useCallback, useState } from 'react'

export const FilterMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const ToggleOpenMenu = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className={NavbarStyle.userMenu.main}>
      <div
        onClick={ToggleOpenMenu}
        className={`${NavbarStyle.userMenu.filterStyler}`}
      >
        <VscSettings size="1.2em" />
        <div className={NavbarStyle.userMenu.avatarBlock}>Filtrer</div>
      </div>

      <div className={`xl:hidden flex ${styles.filter_btn}`}>
        <VscSettings size="1.2em" />
      </div>

      {isOpen && (
        <div className={NavbarStyle.userMenu.menuItemsMain}>
          <div className={NavbarStyle.userMenu.menuItems}>OK</div>
        </div>
      )}
    </div>
  )
}
