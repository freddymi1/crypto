import { NavbarStyle } from '@/utils/constantStyle'
import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import styles from './navbar.module.css'
import { Container } from '../container/container'

interface BreadcrumProps {
  crumList: { text: string; href: string }[]
}

const Breadcrum: React.FC<BreadcrumProps> = (props: BreadcrumProps) => {
  const crumItemWithoutArrow = (text: string, href: string) => {
    return (
      <li className={`pr-3.5 ${styles.menu}`}>
        <a href={href}>{text}</a>
      </li>
    )
  }

  const crumItemWithArrow = (text: string, href: string) => {
    return (
      <li className={`pr-3.5 flex justify-center align-center`}>
        <a href={href} className={`mr-4 ${styles.menu}`}>
          {text}
        </a>
        <MdKeyboardArrowRight size="1.2em" className="mt-0.5" />
      </li>
    )
  }

  return (
    <div className={`${NavbarStyle.subDivNavList} py-2 nav-styles`}>
      <Container>
        <div className={`relative xl:mt-[68px] ${NavbarStyle.navItem} `}>
          <div className="flex items-center">
            <ul className="flex justify-center align-center pl-2">
              {props.crumList.map((crum, index) => (
                <React.Fragment key={index}>
                  {index === props.crumList.length - 1
                    ? crumItemWithoutArrow(crum.text, crum.href)
                    : crumItemWithArrow(crum.text, crum.href)}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Breadcrum
