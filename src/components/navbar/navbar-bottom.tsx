import { FaRegUser } from 'react-icons/fa'
import styles from './navbar.module.css'
import { HiHome } from 'react-icons/hi2'
import { AiOutlineSearch, AiOutlineUserSwitch } from 'react-icons/ai'
import { NavbarBottomItems } from './navbar-bottom-items'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

export const NavbarBottom = () => {
  let session = useSessionContext()
  let { accessTokenPayload }: any = session

  let token = accessTokenPayload && accessTokenPayload.refreshTokenHash1
  return (
    <div
      className={`sticky bottom-0 flex justify-between items-center right-0 left-0 xl:hidden px-6 py-3 ${styles.nav_bottom}`}
    >
      <NavbarBottomItems
        items={[
          { icons: <HiHome size="2em" />, href: '/' },
          { icons: <AiOutlineSearch size="2em" />, href: '/' },
          {
            icons:
              token !== undefined ? (
                <AiOutlineUserSwitch size="2em" />
              ) : (
                <FaRegUser size="2em" />
              ),
            href: '/profile'
          }
        ]}
      />
    </div>
  )
}
