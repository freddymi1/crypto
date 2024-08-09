import { useState } from 'react'
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown
} from 'react-icons/md'

import styles from './footer.module.css'
import FooterSection from './footer-section'

function Footer() {
  const [showFooter, setShowFooter] = useState<boolean>(false)

  const toggleFooter = (e: any) => {
    e.preventDefault()
    setShowFooter(!showFooter)
  }

  return (
    <div id="footer" className="max-w-[2520px] relative">
      <footer
        className={`lg:flex justify-between w-full 2xl:px-60 xl:px-32 py-3 px-6 gap-3 z-1 ${styles.footer_main}`}
      >
        <a
          href="#nav"
          className={`hidden ${styles.btn_home} lg:flex px-3 py-2`}
        >
          <span>
            <MdOutlineKeyboardArrowUp size="1.2em" />
          </span>
          <span className="pl-2">Haut de page</span>
        </a>
        <a href="#nav" className={`lg:hidden ${styles.btn_home1} flex`}>
          <span>
            <MdOutlineKeyboardArrowUp size="1.2em" />
          </span>
        </a>
        <div>Pagination</div>
        <div
          onClick={toggleFooter}
          className={`lg:hidden ${styles.btn_home1} flex`}
        >
          <span>
            {showFooter ? (
              <MdOutlineKeyboardArrowUp size="1.2em" />
            ) : (
              <MdOutlineKeyboardArrowDown size="1.2em" />
            )}
          </span>
        </div>
      </footer>

      <FooterSection />
    </div>
  )
}

export default Footer
