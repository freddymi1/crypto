'use client'

import React from 'react'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import Unauthorized from './unauthorized'

export default function AuthorizerWrapper({
  children
}: {
  children: React.ReactNode
}) {
  let session = useSessionContext()

  let { accessTokenPayload }: any = session

  let token = accessTokenPayload && accessTokenPayload.refreshTokenHash1

  if (token !== undefined) {
    return <>{children}</>
  } else {
    return <Unauthorized />
  }
}
