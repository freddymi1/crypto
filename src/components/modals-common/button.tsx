'use client'

import { ButtonStyle } from '@/utils/constantStyle'

interface ButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: string | any
  style: string
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  style
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: style }}
      className={`${ButtonStyle.mainBtnStyle}
			${outline ? 'bg-white' : 'bg-rose-500'} 
			${outline ? 'border-black' : 'border-rose-500'} 
			${outline ? 'text-black' : 'text-white'}
			${small ? 'py-1' : 'py-2'}
			${small ? 'text-sm' : 'text-md'}
			${small ? 'font-light' : 'font-semibold'}
			${small ? 'border-[1px]' : 'border-2'}
		`}
    >
      {Icon && <Icon size={24} className={ButtonStyle.btnIcon} />}
      {label}
    </button>
  )
}
