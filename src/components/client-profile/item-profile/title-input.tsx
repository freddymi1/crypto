import React from 'react'
import styles from '../profile-client.module.css'

interface InterfaceProps {
  label: string
  radius: string
}

export const LabelForInput: React.FC<InterfaceProps> = ({ label, radius }) => {
  return (
    <div
      className="w-full p-3 text-start text-bold mb-12"
      style={{ borderRadius: radius }}
    >
      <p className={styles.label_btn}>{label}</p>
    </div>
  )
}
