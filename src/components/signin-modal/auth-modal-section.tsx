import Image from 'next/image'
import styles from './sign-in-modal.module.css'
import Link from 'next/link'

export const ModalSection = () => {
  return (
    <div>
      <div className="w-full flex justify-center z-50">
        <Image
          className={`w-[50%] h-[50%] lg:w-[80%] lg:h-[80%]`}
          width={250}
          height={250}
          src="/images/logo.svg"
          alt=""
        />
      </div>
      <div className="mt-0">
        <h3 className="text-center text-xl xl:text-2xl">
          Connectez-vous à Cryptovore ou inscrivez-vous pour donner votre avis
        </h3>
        <p className="mt-2 text-center">
          Sur Cryptovore, vous trouverez les meilleurs deals de vos marques et
          marchands préférés, partagés par notre communauté
        </p>
        <div className="w-full text-center mt-3 md:mt-6 xl:mt-12">
          <Link className={styles.linkL} href="#">
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  )
}
