'use client'

import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import { NavbarStyle } from '@/utils/constantStyle'
import { MenuItems } from './menu-items'
import { MdLogout } from 'react-icons/md'
import { FaRegBell, FaRegBookmark, FaRegUser, FaTags } from 'react-icons/fa'
import { AiOutlineSetting, AiOutlineStar } from 'react-icons/ai'
import { BiComment } from 'react-icons/bi'
import { getMyProfile } from '@/lib/api/profile'
import { Profile } from '@/interfaces/profile'
import { RiFolderShieldFill } from 'react-icons/ri'

interface NotifProps {
  setIsOpen: any
  logout: any
}

export const UserItems: React.FC<NotifProps> = ({ setIsOpen, logout }) => {
  const [user, setUser] = useState<Profile>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    getMyProfile()
      .then((data: any) => {
        if (data) {
          setLoading(false)
          setUser(data)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log('Erreur', error)
      })
  }, [])

  return (
    <div className={NavbarStyle.userMenu.menuItems}>
      <div className={`p-4 capitalize flex ${styles.profile_section_item}`}>
        {loading ? (
          <div className={`w-full rounded-xl ${styles.loading}`}></div>
        ) : (
          <>{user?.username}</>
        )}
      </div>
      <>
        <MenuItems
          link="/"
          onClick={() => setIsOpen(false)}
          label="Aperçu de l'activité"
          icons={<FaRegUser />}
        />
        <MenuItems
          link="/profile"
          onClick={() => setIsOpen(false)}
          label="Mes badges"
          icons={<AiOutlineStar />}
        />
        <MenuItems
          link="/profile"
          onClick={() => setIsOpen(false)}
          label="Articles postés"
          icons={<FaTags />}
        />
        <MenuItems
          link="/categories"
          onClick={() => setIsOpen(false)}
          label="Categories"
          icons={<RiFolderShieldFill />}
        />

        <MenuItems
          link="/profile"
          onClick={() => setIsOpen(false)}
          label="Discussions postées"
          icons={<BiComment />}
        />
        <MenuItems
          link="/profile"
          onClick={() => setIsOpen(false)}
          label="Articles sauvegardés"
          icons={<FaRegBookmark />}
        />
        <MenuItems
          link="/profile"
          onClick={() => setIsOpen(false)}
          label="Mes alertes"
          icons={<FaRegBell />}
        />
        <MenuItems
          link="/profile"
          onClick={() => setIsOpen(false)}
          label="Paramètres"
          icons={<AiOutlineSetting />}
        />
      </>
      <div
        onClick={logout}
        className={`p-4 flex gap-2 ${styles.profil_popup_footer}`}
      >
        <span className="mt-0.5">
          <MdLogout />
        </span>
        <span>Déconnexion</span>
      </div>
    </div>
  )
}
