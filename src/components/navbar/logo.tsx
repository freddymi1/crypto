'use client'

import { NavbarStyle } from '@/utils/constantStyle'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './navbar.module.css'
import Link from 'next/link'

export const Logo = () => {
  const router = useRouter()
  return (
    <Link href="/" className="flex items-center">
      <Image
        alt="Logo"
        className={NavbarStyle.logoStyle.logo}
        height="50"
        width="50"
        src="/images/logo.svg"
      />

      <h2 className={`font-bold ${styles.title_logo}`}>CRYPTOVORE</h2>
    </Link>
  )
}
