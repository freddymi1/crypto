import { NavbarStyle } from '@/utils/constantStyle'
import React from 'react'
import styles from '../profile-client.module.css'

interface MenuProfileProps {
  label: string
  icons: string | any
}

export const ItemProfile: React.FC<MenuProfileProps> = ({ label, icons }) => {
  return (
    <div
      className={`flex align-center gap-2 cursor-pointer ${NavbarStyle.userMenu.subMenuItems.main} ${styles.items}`}
    >
      <span>{icons}</span>
      <span>{label}</span>
    </div>
  )
}
