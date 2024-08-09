import React, { useState } from 'react'
import ModalShadow from '../modals-common/modal-shadow'
import styles from './forgot-pass.module.css'
import { ModalHeader } from '../modals-common/modal-header'
import Image from 'next/image'
import { Input } from '../modals-common/Input'
import ForgotPasswordSection from './forgot-password-section'
import { ModalsStyles, RegisterStyle } from '@/utils/constantStyle'
import { ModalsButton } from '../modals-common/modals-button'
import TextBox from './text-box'
import { ShowSigninModal } from '../signin-modal/sign-in-modal'
import { toast } from 'react-hot-toast'
import { ForgotPassword } from '@/lib/api/auth'
import { ValidateEmail } from '@/utils/validators'

export const ShowForgotPasswordModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.set('ForgotPasswordModal', 'true')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('ForgotPasswordModal')
  modal.classList.remove('hidden')
}

export const HideForgotPasswordModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.delete('ForgotPasswordModal')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('ForgotPasswordModal')
  modal.classList.add('hidden')
}

export default function ForgotPasswordModal() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  let showModal = false
  if (typeof window !== 'undefined') {
    let winLocation: any = window.location
    const url = new URL(String(winLocation))
    const ForgotPasswordModal = url.searchParams.get('ForgotPasswordModal')
    if (ForgotPasswordModal === 'true') {
      showModal = true
    }
  }

  const NavigateToSignin = () => {
    HideForgotPasswordModal()
    ShowSigninModal()
  }

  const HandleForgotPass = (e: Event) => {
    e.preventDefault()
    setLoading(true)

    try {
      ForgotPassword(email).then((res: any) => {
        if (res.status === 'OK') {
          setLoading(false)
          HideForgotPasswordModal()
          setEmail('')
        }
        if (res.status === 'FIELD_ERROR') {
          res &&
            res.formFields.map((err: any) => {
              if (err.id === 'email') {
                setEmailError('Le champs email est obligatoire')
              }
            })
          setLoading(false)
          setLoading(false)
        }
      })
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast.error(err.message)
        setLoading(false)
      } else {
        toast.error('Oops! Something went wrong.')
        setLoading(false)
      }
    }
  }

  const HandleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const OnBlurFormEmail = () => {
    const res = ValidateEmail(email, emailError)
    if (res !== '') {
      setEmailError(res)
    } else {
      setEmailError('')
    }
  }

  return (
    <div
      className={`overflow-hidden absolute top-[100px] lg:fixed lg:inset-0 z-50 outline-none focus:outline-none p-0 ${
        showModal ? '' : 'hidden'
      }`}
      id="ForgotPasswordModal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-center content-center  align-center p-6 lg:p-0">
        <ModalShadow />
        <div
          className={`inline-block align-bottom z-50 rounded-lg text-left overflow-hidden shadow-xl w-full transform transition-all sm:my-24 lg:w-3/5 xl:w-1/2 sm:p-6 ${styles.modal_styles}`}
        >
          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
              <ModalHeader
                title="Réinitialiser le mot de passe"
                HideSigninModal={HideForgotPasswordModal}
              />
              <div className="px-6 lg:px-0 py-6">
                <div className="md:flex">
                  <div className="flex w-full lg:hidden justify-center">
                    <Image
                      className={`w-[50%] h-[50%] lg:w-[80%] lg:h-[80%]`}
                      width={250}
                      height={250}
                      src="/images/logo.svg"
                      alt=""
                    />
                  </div>
                  <div className="lg:flex">
                    <div
                      className={`w-full xl:w-1/2 ${styles.bg} lg:p-0 lg:pr-3`}
                    >
                      <ForgotPasswordSection />

                      <div className="mb-6">
                        <div className={`${RegisterStyle.headingStyle.main}`}>
                          <h3
                            className={`my-6 ${RegisterStyle.headingStyle.title} text-start`}
                          >
                            Réinitialisez votre mot de passe
                          </h3>
                        </div>
                        <div className="xl:mt-12">
                          <div className="mb-3">
                            <Input
                              id="id5"
                              label="Adresse e-mail"
                              value={email}
                              change={HandleEmailChange}
                              link=""
                              onBlur={OnBlurFormEmail}
                              error={emailError}
                              type="email"
                              placeholder="Adresse e-mail"
                            />
                            <span className="text-red-500 py-3">
                              {emailError}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full xl:w-1/2 lg:pr-3">
                      <TextBox />
                    </div>
                  </div>
                </div>
                <div
                  className={`${ModalsStyles.modalsStyle.modalFooter.buttonFooterBlock} mt-3 lg:mb-0`}
                >
                  <ModalsButton
                    styles={styles.btn_sigup}
                    action={HandleForgotPass}
                    isButtonDisabled={``}
                    label={
                      loading
                        ? 'Chargement...'
                        : 'Réinitialiser le mot de passe'
                    }
                  />
                  <ModalsButton
                    styles={styles.create_compte_btn}
                    action={NavigateToSignin}
                    label="Retour à la page de connexion"
                    isButtonDisabled={``}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
