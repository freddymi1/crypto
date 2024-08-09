'use client'

import React, { useCallback, useState } from 'react'
import styles from './upload-image-modal.module.css'
import { ModalHeader } from '../modals-common/modal-header'
import ModalShadow from '../modals-common/modal-shadow'
import { toast } from 'react-hot-toast'
import { HandleUploadFile } from '@/lib/api/file'
import { UploadImageZone } from './upload-image-zone'
import { useTextEditor } from './text-editor-context/text-editor-context'

export const ShowUploadImageModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.set('UploadImgModal', 'true')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('UploadImgModal')
  modal.classList.remove('hidden')
}

export const HideUploadImageModal = () => {
  const url = new URL(String(window.location))
  url.searchParams.delete('UploadImgModal')
  window.history.pushState(null, '', url.toString())
  const modal: any = document.getElementById('UploadImgModal')
  modal.classList.add('hidden')
}

export default function UploadImageModal() {
  const [loading, setLoading] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)

  const [image, setImage] = useState<File[] | any[]>([])
  const [imagesUrl, setImagesUrl] = useState<string[]>([])

  const [selectedFilePreviews, setSelectedFilePreviews] = useState<
    File[] | any
  >([])

  const { setImageUrl } = useTextEditor()

  const [isDragging, setIsDragging] = useState(false)

  let showModal = false
  if (typeof window !== 'undefined') {
    let winLocation: any = window.location
    const url = new URL(String(winLocation))
    const UploadImgModal = url.searchParams.get('UploadImgModal')
    if (UploadImgModal === 'true') {
      showModal = true
    }
  }

  const HandleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (isDragging === false) {
      const files = Array.from(event.dataTransfer.files)
      setIsDragging(false)
      const filePreviews = files.map((file) => URL.createObjectURL(file))
      setSelectedFilePreviews([...selectedFilePreviews, ...filePreviews])
      setImage(files)
      HandleUploadedFiles(files, 'article_image')
    }
  }

  const HandleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
    },
    []
  )

  // On change input file on upluad image
  const HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || null
    if (!files) return

    const fileList = Array.from(files)

    const filePreviews = fileList.map((file) => URL.createObjectURL(file))
    setSelectedFilePreviews(filePreviews)

    HandleUploadedFiles(fileList, 'article_content')
  }

  // Upload images with API
  const HandleUploadedFiles = (selectedFiles: any[], type: string) => {
    setLoading(true)
    const promises = selectedFiles.map((image: any) =>
      HandleUploadFile(image, type)
    )

    Promise.all(promises)
      .then((responses) => {
        if (responses.length === 0) {
          toast.error("Erreur lors de l'upload des images.")
          setSelectedFilePreviews([])
          setImage([])
        } else {
          setImage(responses)

          const items: any[] = []

          const listsImgs = []
          listsImgs.push(...image, ...responses)

          listsImgs.forEach((img: any) => {
            items.push(img.url)
          })
          setImagesUrl([...imagesUrl, ...items])

          setLoading(false)
          toast.success('Upload image effectuer avec succès.')
        }
      })
      .catch((error) => {
        toast.error('Error uploading images:', error)
        setSelectedFilePreviews([])
        setImage([])
        setLoading(false)
      })
  }

  // Remove image from list
  const RemoveImageOnList = (e: Event, imageId: string) => {
    e.preventDefault()
    const newImg = image.filter((data: any) => data.id !== imageId)
    setImage(newImg)
    setSelectedFilePreviews(newImg)
    if (selectedFilePreviews.length === 0) {
      setSelectedFilePreviews([])
    }
  }

  const ValidateUploadImage = () => {
    setLoadingBtn(true)
    setTimeout(() => {
      HideUploadImageModal()
      setImageUrl(image[0].url)
      setImage([])
      setSelectedFilePreviews([])
      setLoadingBtn(false)
    }, 3000)
  }

  return (
    <div
      className={`overflow-hidden absolute top-[100px] lg:fixed lg:inset-0 z-50 outline-none focus:outline-none p-0 ${
        showModal ? '' : 'hidden'
      }`}
      id="UploadImgModal"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-center content-center  align-center p-6 lg:p-0">
        <ModalShadow />

        <div
          className={`inline-block align-bottom z-50 rounded-lg text-left overflow-hidden shadow-xl w-full transform transition-all sm:my-24 lg:w-3/5 xl:w-2/5 sm:p-6 ${styles.modalStyles}`}
        >
          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
              <ModalHeader
                title="Ajouter une image"
                HideSigninModal={HideUploadImageModal}
              />
              <div className="px-6 lg:px-0">
                <div className="mt-3.5">
                  <UploadImageZone
                    selectedFilePreviews={selectedFilePreviews}
                    loading={loading}
                    image={image}
                    HandleFileChange={HandleFileChange}
                    RemoveImageOnList={RemoveImageOnList}
                    HandleDrop={HandleDrop}
                    HandleDragOver={HandleDragOver}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`p-6 lg:p-0 lg:flex flex-row gap-4 justify-end w-full`}
          >
            <button
              onClick={HideUploadImageModal}
              className={`${styles.cancelBtn}`}
            >
              Annuler
            </button>
            <button
              onClick={ValidateUploadImage}
              className={`${styles.validateBtn}`}
            >
              {loadingBtn ? 'Chargement...' : 'Valider'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
