import React from 'react'
import { FaPlus } from 'react-icons/fa'
import styles from './image-drag-zone.module.css'

interface ImageDragZoneProps {
  HandleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export const ImageDragZone: React.FC<ImageDragZoneProps> = ({
  HandleFileChange
}) => {
  return (
    <label
      className={`flex flex-col cursor-pointer align-center items-center justify-center text-center ${styles.drop_zone}`}
    >
      <input
        onChange={HandleFileChange}
        accept="image/*"
        multiple
        type="file"
        hidden
      />
      <div
        className={`p-3 w-full lg:w-1/4 flex gap-2 text-md font-bold items-center justify-center border-dashed cursor-pointer ${styles.img_upload}`}
      >
        <FaPlus size="1.2em" />
        Upload images
      </div>
      <h3 className="py-2">OU</h3>
      <h2 className="font-bold">Glisser-déposer des images</h2>
    </label>
  )
}
