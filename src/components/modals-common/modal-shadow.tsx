import React from 'react'
import { HideForgotPasswordModal } from '../forgot-password-modal/forgot-password-modal'
import { HideSigninModal } from '../signin-modal/sign-in-modal'
import { HideSignupModal } from '../signup-modal/signup-modal'
import { HideUploadImageModal } from '../upload-image-modal/upload-image-modal'

export default function ModalShadow() {
  const HideModal = () => {
    HideForgotPasswordModal()
    HideSigninModal()
    HideSignupModal()
    HideUploadImageModal()
  }
  return (
    <>
      <div
        onClick={HideModal}
        className="fixed inset-0 bg-neutral-800/70 transition-opacity"
        aria-hidden="true"
      ></div>
      <span className="hidden sm:inline-block" aria-hidden="true">
        &#8203;
      </span>
    </>
  )
}
