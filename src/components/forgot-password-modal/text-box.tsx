import React from 'react'
import styles from './forgot-pass.module.css'
import Image from 'next/image'

export default function TextBox() {
  return (
    <div>
      <div className="hidden w-full lg:flex justify-center">
        <Image
          className={styles.logo}
          width={250}
          height={250}
          src="/images/logo.svg"
          alt=""
        />
      </div>

      <h2 className="text-2xl text-center">Pas de panique !</h2>

      <div className="text-center pb-[1.2rem] pt-12">
        <h5 className="text-xl">C'est rien, ça arrive d'oublier !</h5>
      </div>
    </div>
  )
}
