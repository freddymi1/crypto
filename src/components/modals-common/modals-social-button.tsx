import { RegisterStyle } from '@/utils/constantStyle'
import React from 'react'
import { Button } from './button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillApple, AiFillGithub } from 'react-icons/ai'
import { Heading } from '../article-common/heading'

export default function ModalsSocialButton() {
  return (
    <div className={`${RegisterStyle.headingStyle.main}`}>
      <Heading title="Connectez-vous via un réseau social" subtitle="" center />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
        style=""
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
        style=""
      />

      <Button
        outline
        label="Continue with Apple"
        icon={AiFillApple}
        onClick={() => {}}
        style=""
      />
    </div>
  )
}
