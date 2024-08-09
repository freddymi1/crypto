import React from 'react'
import styles from './comments.module.css'

interface FilterSelectProps {
  menu: any[]
}
export const FilterSelect: React.FC<FilterSelectProps> = ({ menu }) => {
  return (
    <select className={`${styles.selectBox}`}>
      {menu.map((item, index) => (
        <React.Fragment key={index}>
          <option value={item.label}>{item.label}</option>
          <option className={`${styles.divider}`} disabled></option>
        </React.Fragment>
      ))}
    </select>
  )
}
