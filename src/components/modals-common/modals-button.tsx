import React from 'react'
import styles from './modals-common.module.css'

interface ModalButtonProps {
  action: (e: any) => void
  label: string
  styles: any
  isButtonDisabled: any
}
export const ModalsButton: React.FC<ModalButtonProps> = ({
  action,
  label,
  styles,
  isButtonDisabled
}) => {
  return (
    <div className="w-full mb-6 lg:mb-0">
      <button
        disabled={isButtonDisabled}
        onClick={action}
        className={`${styles}`}
      >
        {label}
      </button>
    </div>
  )
}
