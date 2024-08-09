import React from 'react'
import styles from '../profile-client.module.css'

interface InterfaceProps {
  label: string
  bgColor: string
  color: string
  border: string
  radius: string
  action: any
}

export const ButtonAvatar: React.FC<InterfaceProps> = ({
  label,
  bgColor,
  color,
  border,
  action,
  radius
}) => {
  return (
    <div
      onClick={action}
      className="w-full p-3 text-center text-bold cursor-pointer"
      style={{
        backgroundColor: bgColor,
        color: color,
        border: border,
        borderRadius: radius
      }}
    >
      <p className={styles.label_btn}>{label}</p>
    </div>
  )
}
