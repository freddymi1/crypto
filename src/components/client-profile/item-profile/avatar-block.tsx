'use client'

import React, { Fragment, useState } from 'react'
import styles from '../profile-client.module.css'
import { ButtonAvatar } from './button-avatar'
import { HandleUploadFile } from '@/lib/api/file'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

export default function AvatarBlock() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedFilePreviews, setSelectedFilePreviews] = useState<any>([])

  const handleUploaded = (e: Event) => {
    e.preventDefault()

    const files = Array.from(selectedFiles)
    toast.success('Upload image effectuer avec succès.')
    // return handleUpload(files, 'user_profile_picture')
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || null
    if (!files) return

    const fileList = Array.from(files)

    setSelectedFiles(fileList)

    const filePreviews = fileList.map((file) => URL.createObjectURL(file))
    setSelectedFilePreviews([...selectedFilePreviews, ...filePreviews])
  }

  return (
    <Fragment>
      <label>
        <input onChange={handleFileChange} type="file" hidden />
        <div
          className={`${styles.avatar_block} aspect-video rounded-full flex items-center justify-center border-dashed cursor-pointer`}
        >
          {selectedFilePreviews ? (
            <>
              {selectedFilePreviews.map((url: any, index: number) => (
                <div key={index} className={`w-full ${styles.bloc_img}`}>
                  <Image
                    width={200}
                    height={200}
                    src={url}
                    alt="Profile client"
                  />
                </div>
              ))}
            </>
          ) : (
            <div
              className={`w-[200px] h-[220px] rounded-full bg-gray-400 ${styles.img_fond}`}
            ></div>
          )}
        </div>
      </label>
      <div className="w-full flex flex-col lg:flex-row justify-center gap-2 mt-6 lg:px-16">
        <ButtonAvatar
          action={(e: any) => handleUploaded(e)}
          label="Remplacer"
          bgColor="#fff"
          color="#111b1e80"
          border="2px solid #111b1e70"
          radius="50px"
        />
        <ButtonAvatar
          action={() => setSelectedFilePreviews('')}
          label="Effacer"
          bgColor="#dbdbdb30"
          color="#e26400"
          border="0px"
          radius="50px"
        />
      </div>
      <p className={`text-sm text-center py-2 ${styles.text_min}`}>
        Optimisé pour les images carrées
      </p>
    </Fragment>
  )
}
