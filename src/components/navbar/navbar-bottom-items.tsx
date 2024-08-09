import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import { FaRegUser } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi2'
import { AiOutlineSearch } from 'react-icons/ai'

interface NavbarBottomItemsProps {
  items: any[]
}

export const NavbarBottomItems: React.FC<NavbarBottomItemsProps> = ({
  items
}) => {
  return (
    <>
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={`${styles.navbar_bottom_items}`}
        >
          {item.icons}
        </Link>
      ))}
    </>
  )
}
