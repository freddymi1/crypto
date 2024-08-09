export const ValidateEmail = (email: string, message: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) {
    return (message = 'Adresse email invalide')
  } else {
    return (message = '')
  }
}

export const ValidatePassword = (password: string, message: string) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

  if (!passwordPattern.test(password) || password.length < 8) {
    return (message =
      'Le mot de passe doit comporter au moins 8 caractères et contenir au moins une lettre et un chiffre')
  } else {
    return (message = '')
  }
}

export const ValidateUsername = (username: string, message: string) => {
  // Define a regular expression for the username pattern
  const usernamePattern = process.env.REGEX_VALIDATE_USERNAME

  if (usernamePattern) {
    const usernameRegex = new RegExp(usernamePattern)

    if (!usernameRegex.test(username)) {
      return (message =
        "Le nom d'utilisateur doit comporter de 3 à 24 caractères et peut contenir des lettres, des chiffres, et les caractères - . _")
    } else {
      return (message = '')
    }
  } else {
    console.error('Regex pattern not found in environment variables.')
  }
}
