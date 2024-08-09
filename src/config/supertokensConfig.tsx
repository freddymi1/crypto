import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import ThirdPartyEmailPassword, {
  Github,
  Google,
  Apple
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword'

export const supertokensConfig = () => {
  return {
    appInfo: {
      appName: String(process.env.APP_NAME),
      apiDomain: String(process.env.API_URL),
      websiteDomain: String(process.env.FRONTEND_URL),
      apiBasePath: String(process.env.SUPERTOKENS_API_BASE_PATH),
      websiteBasePath: String(process.env.SUPERTOKENS_FRONTEND_BASE_PATH)
    },
    recipeList: [
      ThirdPartyEmailPassword.init({
        signInAndUpFeature: {
          providers: [Github.init(), Google.init(), Apple.init()]
        }
      }),
      EmailPasswordReact.init(),
      SessionReact.init()
    ],
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            window.location.href = href
          }
        }
      }
    }
  }
}
