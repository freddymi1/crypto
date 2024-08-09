'use client'

import React from 'react'
import styles from './upload-image-modal.module.css'

import ReactLoading from 'react-loading'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ImageDragZone } from '../upload-image-common/image-drag-zone'

interface UploadImageProps {
  selectedFilePreviews: File[] | any
  loading: boolean
  image: File[] | any
  HandleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  RemoveImageOnList: (e: Event, id: string) => void
  HandleDrop: (event: React.DragEvent<HTMLDivElement>) => void
  HandleDragOver: (event: React.DragEvent<HTMLDivElement>) => void
}

export const UploadImageZone: React.FC<UploadImageProps> = ({
  selectedFilePreviews,
  loading,
  image,
  HandleFileChange,
  RemoveImageOnList,
  HandleDrop,
  HandleDragOver
}) => {
  return (
    <div className="block w-full mt-6 mb-6">
      <div className="pt-6 xl:pt-0 w-full flex justify-center items-center content-center">
        <div
          onDrop={HandleDrop}
          onDragOver={HandleDragOver}
          className={`${styles.drop_image_box} w-full`}
        >
          {selectedFilePreviews.length > 0 ? (
            <div className="relative h-auto w-full">
              {loading ? (
                <div
                  className={`w-full relative min-h-[300px] ${styles.bloc_img}`}
                >
                  <ReactLoading
                    type="spin"
                    color="#e26400"
                    height={'10%'}
                    width={'10%'}
                    className="loading"
                    delay={0}
                  />
                </div>
              ) : (
                <>
                  {image.length > 0 && (
                    <div className={`w-full relative ${styles.bloc_img}`}>
                      <img src={image[0].url} alt="Test" />

                      <div
                        onClick={(e: any) => RemoveImageOnList(e, image[0].id)}
                        className={`${styles.delete_img_btn}`}
                      >
                        <AiOutlineCloseCircle size="1.5em" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <ImageDragZone HandleFileChange={HandleFileChange} />
          )}
        </div>
      </div>
    </div>
  )
}
