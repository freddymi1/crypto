import { NavbarStyle } from '@/utils/constantStyle'
import { UserMenu } from './user-menu'
import { Logo } from './logo'
import { FiMenu } from 'react-icons/fi'
import styles from './navbar.module.css'
import { FaEuroSign, FaHome } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { MobileMenu } from './mobile-menu'
import { HiOutlineScissors } from 'react-icons/hi2'
import { PiBookBookmarkBold } from 'react-icons/pi'
import { BiNews } from 'react-icons/bi'
import { BsTag } from 'react-icons/bs'
import { LiaComments } from 'react-icons/lia'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import { useRouter } from 'next/navigation'
import { Container } from '../container/container'
import { ShowSigninModal } from '../signin-modal/sign-in-modal'
import { RiFolderShieldFill } from 'react-icons/ri'
import Link from 'next/link'
import Image from 'next/image'
import ThemeSwitcher from '../theme-switcher/theme-switcher'

export default function Navbar() {
  const [menu, setMenu] = useState(false)

  let session = useSessionContext()

  const router = useRouter()

  let { accessTokenPayload }: any = session

  let token = accessTokenPayload && accessTokenPayload.refreshTokenHash1

  const detectScroll = () => {
    const scrollUp: any = document.getElementById('nav')

    if (window.scrollY >= 200) {
      scrollUp.classList.add('nav')
    } else {
      scrollUp.classList.remove('nav')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', detectScroll)
  }, [])

  const RedirectToPostPage = () => {
    if (token !== undefined) {
      window.location.href = '/post'
    } else {
      ShowSigninModal()
    }
  }

  const toggleMenu = () => {
    setMenu(!menu)
  }

  return (
    <div id="nav" className={`xl:py-2 ${NavbarStyle.navmain} nav-styles`}>
      <div className={NavbarStyle.subDivNav}>
        <Container>
          <div className={NavbarStyle.navItem}>
            <div className="flex flex-row xl:hidden items-center justify-between gap-0">
              <div
                onClick={toggleMenu}
                className={`xl:hidden p-4 cursor-pointer ${styles.menu_bar}`}
              >
                <FiMenu size="2em" />
              </div>
            </div>
            <Logo />

            <UserMenu RedirectToPostPage={RedirectToPostPage} />
          </div>
        </Container>
      </div>

      <div
        className={`xl:hidden h-full fixed top-0 z-50 bottom-0  ${
          menu ? `left-0` : `-left-full`
        } duration-300 ${styles.mobile_menu}`}
      >
        <div
          onClick={() => setMenu(false)}
          className="fixed w-full z-10 duration-0 h-screen shadow-lg bg-neutral-800/70"
        ></div>
        <div className={`py-1 z-50 bg-white fixed w-5/6 md:w-1/2 h-full`}>
          <div className="z-50 bg-dark w-full">
            <Link href="/" className={`flex items-center ${styles.logo_menu}`}>
              <Image
                alt="Logo"
                className={NavbarStyle.logoStyle.logo}
                height="50"
                width="50"
                src="/images/logo.svg"
              />

              <h2 className={`font-bold`}>CRYPTOVORE</h2>
            </Link>
          </div>
          <MobileMenu
            link="/"
            onClick={() => setMenu(false)}
            label="Accueil"
            icons={<FaHome />}
          />

          <MobileMenu
            link="/categories"
            onClick={() => setMenu(false)}
            label="Categories"
            icons={<RiFolderShieldFill />}
          />
          <MobileMenu
            link="/"
            onClick={() => {}}
            label="Bon plans"
            icons={<BsTag />}
          />
          <MobileMenu
            link="/profile"
            onClick={() => {}}
            label="Codes promo"
            icons={<HiOutlineScissors />}
          />
          <MobileMenu
            link="/profile"
            onClick={() => {}}
            label="Gratuit"
            icons={<FaEuroSign />}
          />
          <MobileMenu
            link="/profile"
            onClick={() => {}}
            label="Discussions"
            icons={<LiaComments />}
          />
          <MobileMenu
            link="/profile"
            onClick={() => {}}
            label="Guide d'achat"
            icons={<PiBookBookmarkBold />}
          />
          <MobileMenu
            link="/profile"
            onClick={() => {}}
            label="Magazine"
            icons={<BiNews />}
          />
          <ThemeSwitcher />
        </div>
      </div>
      {/* <NavbarBottom /> */}
    </div>
  )
}
