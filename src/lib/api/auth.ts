import { toast } from 'react-hot-toast'
import {
  signIn,
  signUp,
  sendPasswordResetEmail
} from 'supertokens-web-js/recipe/emailpassword'

export const SignIn = async (email: string, password: string) => {
  let response = await signIn({
    formFields: [
      {
        id: 'email',
        value: email
      },
      {
        id: 'password',
        value: password
      }
    ]
  })

  if (response.status === 'OK') {
    toast.success('Bravo, Authentification effectue avec succès')
  }

  return response
}

export const SignUp = async (
  email: string,
  username: string,
  password: string
) => {
  let response = await signUp({
    formFields: [
      {
        id: 'email',
        value: email
      },
      {
        id: 'password',
        value: password
      },
      {
        id: 'username',
        value: username
      }
    ]
  })

  if (response.status === 'OK') {
    toast.success('Bravo, inscription effectuée avec succès')
  }

  return response
}

export const ForgotPassword = async (email: string) => {
  let response = await sendPasswordResetEmail({
    formFields: [
      {
        id: 'email',
        value: email
      }
    ]
  })

  if (response.status === 'OK') {
    toast.success(
      'Veuillez vérifier votre e-mail pour le lien de réinitialisation du mot de passe!'
    )
  }

  return response
}
