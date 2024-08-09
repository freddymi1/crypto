import React from 'react'
import styles from './navbar.module.css'
import { ModalsStyles, NavbarStyle } from '@/utils/constantStyle'
import { AiFillSetting, AiOutlineMail } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'

interface Props {
  setIsOpen: any
}

export const MessageItems: React.FC<Props> = ({ setIsOpen }) => {
  return (
    <div className={NavbarStyle.userMenu.menuItems}>
      <div className={`p-4 ${styles.notif_title}`}>
        <div className={styles.title}>
          <span>
            <AiOutlineMail size="1.2em" />
          </span>
          <span className="ml-2">Messages!</span>
        </div>
        <button className={ModalsStyles.modalsStyle.headerModal.subMain}>
          <IoMdClose size="2em" />
        </button>
      </div>
      <div className={styles.notif_content}>Oupssss!</div>
      <div className={`p-4 flex gap-2 ${styles.notif_footer}`}>
        <span className="mt-0.5">
          <AiFillSetting size="1.5em" />
        </span>
      </div>
    </div>
  )
}
