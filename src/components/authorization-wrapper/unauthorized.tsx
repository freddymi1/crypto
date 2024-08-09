import { useEffect } from 'react'
import { ShowSigninModal } from '../signin-modal/sign-in-modal'
import { useRouter } from 'next/navigation'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

export default function Unauthorized() {
  const router = useRouter()
  let session = useSessionContext()
  let { accessTokenPayload, loading }: any = session

  let token = accessTokenPayload && accessTokenPayload.refreshTokenHash1

  useEffect(() => {
    if (loading === false && token === undefined) {
      router.push('/?SigninModal=true')
      ShowSigninModal()
    }
  }, [loading, token])
  return (
    <div className="flex min-h-[64vh] flex-col items-center justify-center"></div>
  )
}
