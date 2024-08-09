import React from 'react'
import { Container } from '../container/container'
import { NavbarStyle } from '@/utils/constantStyle'
import { NavLink } from './nav-link'
import { CategorySelectorBar } from './category-selector-bar'

export default function HeaderCategoriesAndNavigationLink() {
  return (
    <React.Fragment>
      <div
        className={`hidden lg:block relative px-3 xl:px-0 ${NavbarStyle.subDivNavMenu} menu-items`}
      >
        <Container>
          <div
            className={`relative xl:mt-[68px] ${NavbarStyle.navItem} nav-items`}
          >
            <CategorySelectorBar />
          </div>
        </Container>
      </div>
      <div
        className={`relative px-3 xl:px-0  ${NavbarStyle.subDivNavList} nav-styles`}
      >
        <Container>
          <NavLink />
        </Container>
      </div>
    </React.Fragment>
  )
}
