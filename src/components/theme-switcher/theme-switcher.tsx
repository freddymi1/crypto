'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaMoon } from 'react-icons/fa'
import { BsFillSunFill } from 'react-icons/bs'
import styles from './theme.module.css'
import { HiOutlineMoon } from 'react-icons/hi2'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [theme, mounted])

  if (!mounted) {
    return null
  }

  const toggleTheme = (e: Event) => {
    e.preventDefault()

    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div className="flex gap-2">
      <div
        onClick={(e: any) => toggleTheme(e)}
        className={`hidden xl:flex ${styles.moon_icon}`}
      >
        {theme === 'dark' ? (
          <BsFillSunFill size="1.2em" color="#e9e515" />
        ) : (
          <FaMoon size="1.2em" />
        )}
      </div>

      <div
        onClick={(e: any) => toggleTheme(e)}
        className={`flex xl:hidden cursor-pointer px-4 py-3 w-full ${styles.theme_shweetcher}`}
      >
        {theme === 'dark' ? (
          <div className="flex items-center gap-4">
            <HiOutlineMoon size="1.2em" color="#111b1e" />
            <span className={`${styles.mode} font-bold`}>Mode claire</span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <FaMoon size="1.2em" />
            <span className={`${styles.mode} font-bold`}>Mode sombre</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ThemeSwitcher
