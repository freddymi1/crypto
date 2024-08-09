import React from 'react'
import styles from '../profile-client.module.css'

interface InterfaceProps {
  label: string
  radius: string
  style: string
}

export const BtnInput: React.FC<InterfaceProps> = ({
  label,
  style,
  radius
}) => {
  return (
    <div
      className={`${style} w-full p-3 text-center text-bold mb-12`}
      style={{ borderRadius: radius }}
    >
      <p className={styles.label_btn}>{label}</p>
    </div>
  )
}
