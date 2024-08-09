import React from 'react'
import { FaLock } from 'react-icons/fa'
import { MdSecurity } from 'react-icons/md'

export default function FooterSection() {
  return (
    <div className="lg:flex justify-between w-full 2xl:px-60 xl:px-32 py-6 px-6 gap-3 z-1">
      <div className="text-center lg:text-start mb-6 lg:mb-0 w-full lg:w-3/5">
        <h3>Bienvenue dans la plus grande communauté shopping de France</h3>
        <p>
          Comme vous, plus de <strong>2,03 millions de personnes</strong> ont
          rejoint notre communauté pour partager plus de{' '}
          <strong> 1,08 millions d'offres vérifiées</strong>, menant à plus de{' '}
          <strong>28,92 millions d'échanges</strong> entre membres partageant
          leur expertise, astuces et conseils.
        </p>
        <hr className="flex lg:hidden mt-6" />
      </div>
      <div className="text-center lg:text-start mb-6 lg:mb-0 w-full lg:w-1/5">
        <h4>
          Nous sommes parmi les <strong>applications les mieux notées.</strong>
        </h4>
        <div className={`mt-6 p-6 rounded-xl card-bg`}>
          <div>
            <span>Chiffrement SSL 256 bits</span>
          </div>
          <div>
            <span>Conforme au RGPD</span>
          </div>
        </div>
        <hr className="flex lg:hidden mt-6" />
      </div>
      <div className="text-center lg:text-start w-full lg:w-1/5">
        <h4>
          Vos <strong>données sont en sécurité.</strong>
        </h4>
        <div className={`text-center w-full mt-6 p-6 rounded-xl card-bg`}>
          <label className=" flex justify-center lg:justify-start items-center align-center">
            <FaLock />
            <span className="pl-2">Chiffrement SSL 256 bits</span>
          </label>
          <label className=" flex justify-center lg:justify-start items-center align-center">
            <MdSecurity />
            <span className="pl-2">Conforme au RGPD</span>
          </label>
        </div>
      </div>
    </div>
  )
}
