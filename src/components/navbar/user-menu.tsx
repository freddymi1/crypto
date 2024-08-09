'use client'
import styles from './navbar.module.css'
import { NavbarStyle } from '@/utils/constantStyle'
import { FaPlus, FaRegUser } from 'react-icons/fa'
import { useState } from 'react'
import {
  AiOutlineMail,
  AiOutlineBell,
  AiOutlineSearch,
  AiOutlineUserSwitch
} from 'react-icons/ai'
import ThemeSwitcher from '../theme-switcher/theme-switcher'
import { UserItems } from './user-item'
import OutsideClickDetector from '@/utils/outside-click-detector'
import { NotifMenu } from './notif-menu'
import { MessageItems } from './message-item'
import Session from 'supertokens-web-js/recipe/session'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { toast } from 'react-hot-toast'
import { ShowSigninModal } from '../signin-modal/sign-in-modal'

interface UserMenuProps {
  RedirectToPostPage: () => void
}

export const UserMenu: React.FC<UserMenuProps> = ({ RedirectToPostPage }) => {
  let session = useSessionContext()

  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false)
  const [isOpenMail, setIsOpenMail] = useState<boolean>(false)
  const [isOpenNotif, setIsOpenNotif] = useState<boolean>(false)

  let { accessTokenPayload }: any = session

  let token = accessTokenPayload && accessTokenPayload.refreshTokenHash1

  const ToggleOpenMenu = (type: string) => {
    switch (type) {
      case 'user':
        if (token !== undefined) {
          setIsOpenUserMenu((value) => !value)
          setIsOpenMail(false)
          setIsOpenNotif(false)
        } else {
          ShowSigninModal()
        }
        break
      case 'email':
        setIsOpenMail((value) => !value)
        setIsOpenUserMenu(false)
        setIsOpenNotif(false)
        break
      case 'notification':
        setIsOpenNotif((value) => !value)
        setIsOpenMail(false)
        setIsOpenUserMenu(false)
        break
      default:
        break
    }
  }

  const logout = async () => {
    try {
      await Session.signOut()
      toast.success('Deconnexion effectuer avec succes')
    } catch (err) {
      toast.error('Erreur')
    }
  }

  return (
    <div className={`${NavbarStyle.userMenu.main}`}>
      <div className={NavbarStyle.userMenu.subStyle}>
        <div className="hidden xl:block ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className={NavbarStyle.userMenu.inputSearch}
              placeholder="Recherche..."
            />
          </div>
        </div>
        &nbsp;
        <div
          onClick={() => ToggleOpenMenu('email')}
          className={`hidden xl:flex ${styles.btn_icon}`}
        >
          <AiOutlineMail size="1.5em" />
        </div>
        <div
          onClick={() => ToggleOpenMenu('notification')}
          className={`hidden xl:flex ${styles.btn_icon}`}
        >
          <AiOutlineBell size="1.5em" />
        </div>
        {token !== undefined ? (
          <div
            onClick={() => ToggleOpenMenu('user')}
            className={`hidden xl:flex ${styles.btn_icon_con}`}
          >
            <AiOutlineUserSwitch size="1.2em" />
          </div>
        ) : (
          <button
            onClick={() => ShowSigninModal()}
            className={`${NavbarStyle.userMenu.connexBtn}`}
          >
            <FaRegUser size="1.2em" />
            <div className={NavbarStyle.userMenu.avatarBlock}>Connexion</div>
          </button>
        )}
        <div
          onClick={RedirectToPostPage}
          className={NavbarStyle.userMenu.posterStyler}
        >
          <FaPlus size="1.2em" />
          <div className={NavbarStyle.userMenu.avatarBlock}>Poster...</div>
        </div>
        <div
          onClick={RedirectToPostPage}
          className={`flex xl:hidden mr-3 xl:mr-0 ${styles.btn_add}`}
        >
          <FaPlus size="1.2em" />
        </div>
        <div className="hidden xl:block pr-3 xl:pr-0">
          <ThemeSwitcher />
        </div>
      </div>

      {isOpenMail && (
        <OutsideClickDetector onClose={() => setIsOpenMail(false)}>
          <div
            className={`${NavbarStyle.userMenu.menuItemsMainMail} ${styles.menu_notif}`}
          >
            <MessageItems setIsOpen={setIsOpenUserMenu} />
          </div>
        </OutsideClickDetector>
      )}

      {isOpenNotif && (
        <OutsideClickDetector onClose={() => setIsOpenNotif(false)}>
          <div
            className={`${NavbarStyle.userMenu.menuItemsMainNotif} ${styles.menu_notif}`}
          >
            <NotifMenu setIsOpen={setIsOpenUserMenu} />
          </div>
        </OutsideClickDetector>
      )}

      {isOpenUserMenu && (
        <OutsideClickDetector onClose={() => setIsOpenUserMenu(false)}>
          <div
            className={`${NavbarStyle.userMenu.menuItemsMain} ${styles.menu_notif}`}
          >
            <UserItems logout={logout} setIsOpen={setIsOpenUserMenu} />
          </div>
        </OutsideClickDetector>
      )}
    </div>
  )
}
