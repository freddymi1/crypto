import React from 'react'
import { BtnInput } from './btn-input'
import { LabelForInput } from './title-input'
import styles from '../profile-client.module.css'

export default function FormBtn() {
  return (
    <div className="w-full xl:flex mt-16">
      <div className="w-full hidden xl:block xl:w-1/3">
        <LabelForInput label="Votre pseudonyme" radius="50px" />
        <LabelForInput label="Votre description" radius="50px" />
        <LabelForInput label="Adresse e-mail associée" radius="50px" />
        <LabelForInput label="Définir un mot de passe" radius="50px" />
        <LabelForInput label=" Données de compte" radius="50px" />
        <LabelForInput label="Supprimer mon compte" radius="50px" />
      </div>
      <div className="w-full xl:w-2/3">
        <BtnInput
          label="Modifier le pseudo"
          style={styles.btn_prl}
          radius="50px"
        />
        <BtnInput
          label="Modifier la description"
          style={styles.btn_prl}
          radius="50px"
        />
        <BtnInput
          label="Modifier l’adresse email"
          style={styles.btn_prl}
          radius="50px"
        />
        <BtnInput
          label="Definir un mot de passe"
          style={styles.btn_prl}
          radius="50px"
        />
        <BtnInput
          label=" Générer mes données"
          style={styles.btn_prl}
          radius="50px"
        />
        <BtnInput
          label="Supprimer mon compte"
          style={styles.btn_del}
          radius="50px"
        />
      </div>
    </div>
  )
}
