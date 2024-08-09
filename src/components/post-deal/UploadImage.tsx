'use client'

import React, { useState } from 'react'
import styles from './poste-deal.module.css'
import { FaPlus } from 'react-icons/fa'

import ReactLoading from 'react-loading'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ImageDragZone } from '../upload-image-common/image-drag-zone'

interface UploadImageProps {
  selectedFilePreviews: File[] | any
  loading: boolean
  images: File[]
  HandleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  RemoveImageOnList: (e: Event, index: number) => void
  HandleDrop: (event: React.DragEvent<HTMLDivElement>) => void
  HandleDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  StartDrag: (
    index: number | any,
    event: React.DragEvent<HTMLDivElement>
  ) => void
  OnDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  OnDrop: (index: number, event: React.DragEvent<HTMLDivElement>) => void
}

export const UploadImage: React.FC<UploadImageProps> = ({
  selectedFilePreviews,
  loading,
  images,
  HandleFileChange,
  RemoveImageOnList,
  HandleDrop,
  HandleDragOver,
  StartDrag,
  OnDragOver,
  OnDrop
}) => {
  return (
    <div className="block w-full mt-6 mb-6">
      <h5 className="pb-2 text-xl font-bold">L'essentiel</h5>
      <p className="font-bold">Galerie d'images</p>
      <div className="relative my-2">
        <div className="h-auto xl:flex w-full border border-dashed rounded-md p-6">
          <div className="w-full xl:w-1/3 lg:pr-6">
            <h5 className="pb-3 text-xl font-bold">
              Mettez votre article en valeur avec des images.
            </h5>
            <p className="text-sm">
              Ajoutez jusqu'à 8 images pour illustrer votre deal. Vous pouvez
              les déposer et les faire glisser pour les réorganiser et choisir
              l'image principale.
            </p>
          </div>

          <div className="pt-6 xl:pt-0 w-full xl:w-2/3 flex justify-center items-center content-center">
            <div
              onDrop={HandleDrop}
              onDragOver={HandleDragOver}
              className={`${styles.drop_image_box} w-full`}
            >
              {selectedFilePreviews.length > 0 ? (
                <div className="relative inline-grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 grid-rows-1 h-auto w-full">
                  {loading ? (
                    <>
                      {selectedFilePreviews.map((index: number) => (
                        <div
                          key={index}
                          className={`w-full relative min-h-[100px] ${styles.bloc_img}`}
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
                      ))}
                    </>
                  ) : (
                    <>
                      {images &&
                        images.map((image: any, index: number) => (
                          <div
                            key={index}
                            className={`w-full relative ${styles.bloc_img}`}
                            draggable="true"
                            onDragStart={(event) => StartDrag(index, event)}
                            onDragOver={(event) => OnDragOver(event)}
                            onDrop={(event) => OnDrop(index, event)}
                          >
                            <img src={image.url} alt="Test" />
                            {index === 0 && (
                              <div className={`px-3 py-1 ${styles.active_img}`}>
                                Image principale
                              </div>
                            )}
                            <div
                              onClick={(e: any) => RemoveImageOnList(e, index)}
                              className={`${styles.delete_img_btn}`}
                            >
                              <AiOutlineCloseCircle size="1.5em" />
                            </div>
                          </div>
                        ))}
                      <label
                        className={`flex flex-col align-center items-center justify-center text-center ${styles.bg_img_upload}`}
                      >
                        <input
                          onChange={HandleFileChange}
                          accept="image/*"
                          multiple
                          type="file"
                          hidden
                        />
                        <div
                          className={`p-3 w-full flex gap-2 text-md font-bold items-center justify-center border-dashed cursor-pointer ${styles.img_upload}`}
                        >
                          <FaPlus size="1.2em" />
                          Upload images
                        </div>
                        <h3 className="py-2">OU</h3>
                        <h2 className="font-bold">
                          Glisser-déposer des images
                        </h2>
                      </label>
                    </>
                  )}
                </div>
              ) : (
                <ImageDragZone HandleFileChange={HandleFileChange} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
