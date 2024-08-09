import React from 'react'
import styles from './modals-common.module.css'
import { IoMdClose } from 'react-icons/io'
import { ModalsStyles } from '@/utils/constantStyle'

interface ModalHeaderProps {
  HideSigninModal: () => void
  title: string
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  HideSigninModal,
  title
}) => {
  return (
    <div className="flex justify-between w-full p-6 lg:p-0" id="modal-title">
      <h3 className={`text-xl xl:text-2xl ${styles.modal_title}`}>{title}</h3>
      <button
        onClick={HideSigninModal}
        className={`${ModalsStyles.modalsStyle.headerModal.subMain} text-gray-500`}
      >
        <IoMdClose size={18} />
      </button>
    </div>
  )
}
