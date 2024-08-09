'use client'

import { ModalsStyles, RegisterStyle } from '@/utils/constantStyle'
import React, { useState } from 'react'
import styles from './sign-in-modal.module.css'
import { ModalHeader } from '../modals-common/modal-header'
import { ModalsButton } from '../modals-common/modals-button'
import { ModalSection } from '@/components/signin-modal/auth-modal-section'
import ModalsSocialButton from '../modals-common/modals-social-button'
import ModalShadow from '../modals-common/modal-shadow'
import { Input } from '../modals-common/Input'
import { toast } from 'react-hot-toast'
import { ShowSignupModal } from '../signup-modal/signup-modal'
import { SignIn } from '@/lib/api/auth'
import { ValidateEmail, ValidatePassword } from '@/utils/validators'

export const ShowSigninModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.set('SigninModal', 'true')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('SigninModal')
  modal.classList.remove('hidden')
}

export const HideSigninModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.delete('SigninModal')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('SigninModal')
  modal.classList.add('hidden')
}

export default function SignInModal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [loading, setLoading] = useState(false)

  let showModal = false
  if (typeof window !== 'undefined') {
    let winLocation: any = window.location
    const url = new URL(String(winLocation))
    const SigninModal = url.searchParams.get('SigninModal')
    if (SigninModal === 'true') {
      showModal = true
    }
  }

  const HandleSignIn = (e: Event) => {
    e.preventDefault()
    setLoading(true)

    try {
      SignIn(email, password).then((res: any) => {
        if (res.status === 'OK') {
          setLoading(false)
          HideSigninModal()
          setEmail('')
          setPassword('')
        }
        if (res.status === 'WRONG_CREDENTIALS_ERROR') {
          setLoading(false)
          setEmailError(
            "La combinaison du mot de passe de l'e-mail est incorrecte"
          )
          setPasswordError(
            "La combinaison du mot de passe de l'e-mail est incorrecte"
          )
        }
        if (res.status === 'FIELD_ERROR') {
          res &&
            res.formFields.map((err: any) => {
              if (err.id === 'email') {
                setEmailError('Le champs email est obligatoire')
              }
              if (err.id === 'password') {
                setPasswordError('Le champs mot de passe est obligatoire')
              }
            })
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

  const HandleCreateCompte = () => {
    ShowSignupModal()
    HideSigninModal()
  }

  const OnBlurFormEmail = () => {
    const res = ValidateEmail(email, emailError)
    if (res !== '') {
      setEmailError(res)
    } else {
      setEmailError('')
    }
  }

  const OnBlurFormPassword = () => {
    if (password !== '') {
      setPasswordError('')
    } else {
      setPasswordError('Le champs mot de passe est obligatoire')
    }
  }

  const HandleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  const HandlePasswordChange = (e: any) => {
    setPassword(e.target.value)
    setPasswordError('')
  }

  return (
    <div
      className={`overflow-hidden absolute top-[100px] lg:fixed lg:inset-0 z-50 outline-none focus:outline-none p-0 ${
        showModal ? '' : 'hidden'
      }`}
      id="SigninModal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-center content-center  align-center p-6 lg:p-0">
        <ModalShadow />

        <div
          className={`inline-block align-bottom z-50 rounded-lg text-left overflow-hidden shadow-xl w-full transform transition-all sm:my-24 lg:w-3/5 xl:w-1/2 sm:p-6 ${styles.modalStyles}`}
        >
          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
              <ModalHeader
                title="Bienvenue sur cryptovore !"
                HideSigninModal={HideSigninModal}
              />
              <div className="px-6 lg:px-0 py-6">
                <div className="md:flex mt-3.5">
                  <div className={`w-full xl:w-1/2 ${styles.bg} lg:pr-3`}>
                    <ModalSection />
                  </div>
                  <div className="w-full xl:w-1/2 lg:pl-3 z-50">
                    <div className={`${RegisterStyle.headingStyle.main}`}>
                      <ModalsSocialButton />
                    </div>
                    <div className={RegisterStyle.headingStyle.main}>
                      <p
                        className={`mt-6 ${RegisterStyle.headingStyle.title} text-start`}
                      >
                        Connexion
                      </p>
                    </div>
                    <div className="mt-[14px]">
                      <Input
                        id="id0"
                        label="Email"
                        value={email}
                        change={HandleEmailChange}
                        link=""
                        type="email"
                        error={emailError}
                        onBlur={OnBlurFormEmail}
                        placeholder="Adresse email"
                      />
                      <span className="text-red-500 py-3">{emailError}</span>

                      <Input
                        id="id1"
                        label="Mot de passe"
                        value={password}
                        error={passwordError}
                        onBlur={OnBlurFormPassword}
                        change={HandlePasswordChange}
                        link="Mot de passe oublier?"
                        type="password"
                        placeholder="Mot de passe"
                      />
                      <span className="text-red-500 py-3">{passwordError}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`p-6 lg:p-0 ${ModalsStyles.modalsStyle.modalFooter.buttonFooterBlock}`}
          >
            <ModalsButton
              styles={styles.create_compte_btn}
              action={HandleCreateCompte}
              label="Créer une compte"
              isButtonDisabled=""
            />
            <ModalsButton
              styles={styles.btn_sigup}
              action={HandleSignIn}
              label={loading ? 'Chargement...' : 'Connexion'}
              isButtonDisabled={``}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
