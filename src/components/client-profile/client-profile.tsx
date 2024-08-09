'use client'

import React from 'react'
import styles from './profile-client.module.css'
import { ItemProfile } from './item-profile/item-profil'
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineUser
} from 'react-icons/ai'
import { FiShare2, FiUsers } from 'react-icons/fi'
import AvatarBlock from './item-profile/avatar-block'
import FormBtn from './item-profile/form-btn'

export default function ClientProfile() {
  return (
    <div className="flex">
      <div className="max-w-[2520px] w-full xl:flex 2xl:px-60 xl:px-32 md:24 py-3 px-6 gap-3  xl:mt-[60px]">
        <div
          className={`w-full hidden xl:block xl:w-1/3 px-2 ${styles.parametre}`}
        >
          <div className="py-6">
            <h3 className={styles.title}>Paramètre</h3>

            <div className="mt-6 mx-6">
              <ItemProfile label="Profil" icons={<AiOutlineUser />} />
              <ItemProfile label="Préférences" icons={<AiOutlineSetting />} />
              <ItemProfile
                label="Connexion via réseau social"
                icons={<FiShare2 />}
              />
              <ItemProfile label="Notifications" icons={<AiOutlineBell />} />
              <ItemProfile label="Abonnements" icons={<AiOutlineMail />} />
              <ItemProfile
                label="Membres suivis / ignorés"
                icons={<FiUsers />}
              />
            </div>
          </div>
        </div>

        <div className="w-full xl:w-2/3 px-2">
          <div className="py-6">
            <h3 className={styles.title}>Profil</h3>
            <div className="mt-2">
              <h4 className={styles.subtitle_avatar}>Votre avatar</h4>
              <p className="text-sm">Facultatif</p>
            </div>
            <div className="mt-6 lg:mx-6 flex flex-col justify-center items-center align-center w-full">
              <AvatarBlock />
            </div>

            <div>
              <FormBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
