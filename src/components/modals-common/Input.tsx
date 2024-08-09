'use client'

import { RegisterStyle } from '@/utils/constantStyle'
import { HideSigninModal } from '../signin-modal/sign-in-modal'
import { ShowForgotPasswordModal } from '../forgot-password-modal/forgot-password-modal'

interface InputProps {
  id: string
  error: string
  label: string
  link: string
  type?: string
  placeholder?: string
  value: string
  change: (e: any) => void
  onBlur: () => void
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  link,
  placeholder,
  value,
  error,
  change,
  onBlur
}) => {
  const ForgotPasswordAction = () => {
    HideSigninModal()
    ShowForgotPasswordModal()
  }
  return (
    <div className={`${RegisterStyle.main} mb-3`}>
      <div className="flex justify-between">
        <label className="text-md font-bold mb-2">{label}</label>
        <a
          onClick={ForgotPasswordAction}
          className="text-neutral-500 font-bold text-sm"
        >
          {link}
        </a>
      </div>
      <input
        id={id}
        value={value}
        onChange={change}
        type={type}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${
          error !== '' ? 'border-red-500' : 'border-gray-200'
        } className="mt-2 peer w-full p-2 pt-2 font-light border-2 rounded-full outline-none transition disabled:opacity-70 disabled:cursor-not-allowed"`}
      />
    </div>
  )
}
