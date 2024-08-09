'use client'

import React from 'react'
import Footer from '@/components/footer/footer'
import './globals.css'
import { Inter } from 'next/font/google'
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react'
import { supertokensConfig } from '../config/supertokensConfig'
import Navbar from '@/components/navbar/navbar'
import { ThemeProvider } from 'next-themes'
import MessageBanner from '@/components/message-banner/message-banner'
import { ToastProvider } from '@/components/toats-provider/toas-provider'
import SignInModal from '@/components/signin-modal/sign-in-modal'
import SignUpModal from '@/components/signup-modal/signup-modal'
import ForgotPasswordModal from '@/components/forgot-password-modal/forgot-password-modal'
import { NavbarBottom } from '@/components/navbar/navbar-bottom'
import UploadImageModal from '@/components/upload-image-modal/upload-image-modal'
import { TextEditorProvider } from '@/components/upload-image-modal/text-editor-context/text-editor-context'

if (typeof window !== 'undefined') {
  SuperTokensReact.init(supertokensConfig())
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
      </head>
      <body suppressHydrationWarning={true} className={`relavite`}>
        <ThemeProvider>
          <SuperTokensWrapper>
            <TextEditorProvider>
              <ToastProvider />
              <ForgotPasswordModal />
              <SignUpModal />
              <SignInModal />
              <UploadImageModal />
              <MessageBanner />
              <Navbar />

              {children}
              <Footer />
              <NavbarBottom />
            </TextEditorProvider>
          </SuperTokensWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
