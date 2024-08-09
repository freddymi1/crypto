'use client'

import { NavbarStyle } from '@/utils/constantStyle'
import styles from './navbar.module.css'
import Link from 'next/link'

interface MenuItemsProps {
  onClick: () => void
  label: string
  icons: string | any
  link: string
}
export const MenuItems: React.FC<MenuItemsProps> = ({
  onClick,
  label,
  icons,
  link
}) => {
  return (
    <Link
      href={link}
      onClick={onClick}
      className={`flex align-center gap-2 ${NavbarStyle.userMenu.subMenuItems.main} ${styles.menu_Style}`}
    >
      <span className="mt-0.5">{icons}</span>
      <span>{label}</span>
    </Link>
  )
}
