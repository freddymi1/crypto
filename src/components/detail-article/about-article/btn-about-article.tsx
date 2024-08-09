'use client'

import styles from './about-article.module.css'

interface MenuItemsProps {
  onClick: () => void
  label: string
  icons: string | any
}
export const BtnAboutArticle: React.FC<MenuItemsProps> = ({
  onClick,
  label,
  icons
}) => {
  return (
    <div onClick={onClick} className={`flex gap-2 p-3  ${styles.btn_comment}`}>
      {icons}
      {label}
    </div>
  )
}
