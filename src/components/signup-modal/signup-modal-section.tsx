import Image from 'next/image'
import React from 'react'

export const SignupModalSection = () => {
  return (
    <div>
      <div className="w-full flex justify-center">
        <Image width={250} height={250} src="/images/logo.svg" alt="" />
      </div>
      <div className="mt-0">
        <h3 className="text-center">Enregistrez-vous via un réseau social</h3>
      </div>
    </div>
  )
}
