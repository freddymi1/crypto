import React from 'react'
import BullsComponent from '../bulls-component/bulls-component'
import CryptoPopulaire from '../crypto-populaire/crypto-populaire'

export default function Widgets() {
  return (
    <div className="hidden xl:block w-full xl:w-1/4 sm:w-full">
      <BullsComponent />
      <CryptoPopulaire />
    </div>
  )
}
