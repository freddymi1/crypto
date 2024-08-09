'use client'

import { ModalsStyles, RegisterStyle } from '@/utils/constantStyle'
import React, { useState } from 'react'
import styles from './signup-modal.module.css'
import { ModalHeader } from '../modals-common/modal-header'
import { ModalsButton } from '../modals-common/modals-button'
import ModalShadow from '../modals-common/modal-shadow'
import ModalsSocialButton from '../modals-common/modals-social-button'
import { Input } from '../modals-common/Input'
import { toast } from 'react-hot-toast'
import { InputCheckbox } from './input-checkbox'
import { ShowSigninModal } from '../signin-modal/sign-in-modal'
import { Heading } from '../article-common/heading'
import { SignupModalSection } from './signup-modal-section'
import { SignUp } from '@/lib/api/auth'
import {
  ValidateEmail,
  ValidatePassword,
  ValidateUsername
} from '@/utils/validators'

export const ShowSignupModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.set('SignupModal', 'true')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('SignupModal')
  modal.classList.remove('hidden')
}

export const HideSignupModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.delete('SignupModal')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('SignupModal')
  modal.classList.add('hidden')
}

export default function SignUpModal() {
  const [email, setEmail] = useState<string | any>('')
  const [password, setPassword] = useState<string | any>('')
  const [username, setUserName] = useState<string | any>('')
  const [emailError, setEmailError] = useState<string | any>('')
  const [passwordError, setPasswordError] = useState<string | any>('')
  const [usernameError, setUsernameError] = useState<string | any>('')
  const [checkNewsLetter, setCheckNewsLetter] = useState<boolean>(false)
  const [checkCondition, setCheckCondition] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  let showModal = false
  if (typeof window !== 'undefined') {
    let winLocation: any = window.location
    const url = new URL(String(winLocation))
    const SignupModal = url.searchParams.get('SignupModal')
    if (SignupModal === 'true') {
      showModal = true
    }
  }

  const HandleRegister = (e: Event) => {
    e.preventDefault()
    setLoading(true)

    try {
      SignUp(email, username, password).then((res: any) => {
        if (res.status === 'OK') {
          setLoading(false)
          HideSignupModal()
          setEmail('')
          setUserName('')
          setPassword('')
        }
        if (res.status === 'FIELD_ERROR') {
          setLoading(false)
          res &&
            res.formFields.map((err: any) => {
              if (err.id === 'email') {
                if (
                  err.error ===
                  'This email already exists. Please sign in instead.'
                ) {
                  setEmailError('Cette adresse email est déjà utilisée')
                } else {
                  setEmailError('Le champs email est obligatoire')
                }
              }
              if (err.id === 'password') {
                setPasswordError('Le champs mot de passe est obligatoire')
              }
              if (err.id === 'username') {
                setUsernameError("Le champs nom d'utilisateur est obligatoire")
              }
            })
        }
      })
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast.error(err.message)
        setLoading(false)
      } else {
        toast.error("Oops! Quelque chose s'est mal passé.")
        setLoading(false)
      }
    }
  }

  const HandleEmailChange = (e: any) => {
    setEmail(e.target.value)
    const res = ValidateEmail(email, emailError)
    if (res !== '') {
      setEmailError(res)
    } else {
      setEmailError('')
    }
  }

  const HandleUsernameChange = (e: any) => {
    setUserName(e.target.value)
    const res = ValidateUsername(username, usernameError)
    if (res !== '') {
      setUsernameError(res)
    } else {
      setUsernameError('')
    }
  }

  const HandlePasswordChange = (e: any) => {
    setPassword(e.target.value)
    if (password.length > 0) {
      setPasswordError('')
    }
  }

  const HandleSignIn = () => {
    HideSignupModal()
    ShowSigninModal()
  }

  const OnBlurFormEmail = () => {
    const res = ValidateEmail(email, emailError)
    if (res !== '') {
      setEmailError(res)
    } else {
      setEmailError('')
    }
  }

  const OnBlureFormUsername = () => {
    const res = ValidateUsername(username, usernameError)
    if (res !== '') {
      setUsernameError(res)
    } else {
      setUsernameError('')
    }
  }

  const OnBlurPassForm = () => {
    const res = ValidatePassword(password, passwordError)
    if (res !== '') {
      setPasswordError(res)
    } else {
      setPasswordError('')
    }
  }

  const HandleCheckNewsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckNewsLetter(event.target.checked)
  }

  const HandleChecConditionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckCondition(event.target.checked)
  }

  const isButtonDisabled = !checkCondition

  return (
    <div
      className={`overflow-hidden absolute top-[100px] lg:fixed lg:inset-0 z-50 outline-none focus:outline-none p-0 ${
        showModal ? '' : 'hidden'
      }`}
      id="SignupModal"
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
                title="Bienvenue sur cryptovore !"
                HideSigninModal={HideSignupModal}
              />
              <div className="px-6 lg:px-0 py-6">
                <div className="md:flex">
                  <div className={`w-full xl:w-1/2 ${styles.bg} p-0 lg:pr-3`}>
                    <SignupModalSection />
                    <div className="my-6">
                      <ModalsSocialButton />
                    </div>
                  </div>
                  <div className="w-full xl:w-1/2 pl-0 lg:pl-3">
                    <div className={RegisterStyle.headingStyle.main}>
                      <Heading
                        title="S'enregistrer avec une adresse e-mail"
                        subtitle=""
                        center
                      />
                    </div>
                    <div className="mt-[40px]">
                      <Input
                        id="id2"
                        label="Email"
                        value={email}
                        change={HandleEmailChange}
                        link=""
                        onBlur={OnBlurFormEmail}
                        error={emailError}
                        type="email"
                        placeholder="Adresse email"
                      />

                      <span className="text-red-500 py-3">{emailError}</span>

                      <Input
                        id="id3"
                        label="Nom d'utilisateur"
                        value={username}
                        change={HandleUsernameChange}
                        link=""
                        onBlur={OnBlureFormUsername}
                        error={usernameError}
                        type="text"
                        placeholder="Nom d'utilisateur"
                      />

                      <span className="text-red-500 py-3">{usernameError}</span>

                      <Input
                        id="id4"
                        label="Mot de passe"
                        value={password}
                        change={HandlePasswordChange}
                        link=""
                        onBlur={OnBlurPassForm}
                        error={passwordError}
                        type="password"
                        placeholder="Mot de passe"
                      />
                      <span className="text-red-500 py-3">{passwordError}</span>
                    </div>
                    <InputCheckbox
                      HandleChecConditionChange={HandleChecConditionChange}
                      HandleCheckNewsChange={HandleCheckNewsChange}
                      isNewsLChecked={checkNewsLetter}
                      isConditionChecked={checkCondition}
                    />
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
              action={HandleSignIn}
              isButtonDisabled=""
              label="Vous avez déjà un compte ?"
            />
            <ModalsButton
              styles={isButtonDisabled ? styles.disabled : styles.btn_sigup}
              isButtonDisabled={isButtonDisabled}
              action={HandleRegister}
              label={loading ? 'Chargement...' : "S'inscrire"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
