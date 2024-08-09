'use client'

import { NavbarStyle } from '../../utils/constantStyle'

interface ContainerProps {
  children: React.ReactNode
}
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={NavbarStyle.containerNavStyle.main}>{children}</div>
}
