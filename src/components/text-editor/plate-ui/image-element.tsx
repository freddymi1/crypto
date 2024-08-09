import React, { useEffect, useState } from 'react'
import { PlateElement, PlateElementProps, Value } from '@udecode/plate-common'
import {
  ELEMENT_IMAGE,
  Image,
  TImageElement,
  useMediaState
} from '@udecode/plate-media'
import { useFocused, useReadOnly, useSelected } from 'slate-react'
import ReactLoading from 'react-loading'
import { cn } from '../lib/utils'

import { MediaPopover } from './media-popover'
import { Resizable, ResizeHandle, mediaResizeHandleVariants } from './resizable'
import { Caption, CaptionTextarea } from './caption'
import { useResizableStore } from '@udecode/plate-resizable'
import { toast } from 'react-hot-toast'
import { HandleUploadFile } from '@/lib/api/file'

const align = 'center'

export function ImageElement({
  className,
  ...props
}: PlateElementProps<Value, TImageElement>) {
  const { children, nodeProps, element, editor } = props
  const width = useResizableStore().get.width()
  const [loading, setLoading] = useState(false)

  const focused = useFocused()
  const selected = useSelected()
  const readOnly = useReadOnly()

  const GetImageType = (base64: string): string | null => {
    const matches = base64.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/)
    if (matches) {
      setLoading(true)
    }

    return matches ? matches[1] : null
  }

  const ConvertToFormdata = async () => {
    const imageType = GetImageType(element.url)

    if (!imageType) {
      // Invalid or unsupported image format
      return
    }

    const contentType = `image/${imageType}`
    const base64Data = element.url.split(',')[1] // Remove data:image/...
    const binaryString = window.atob(base64Data)

    const byteArray = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i)
    }

    const blob = new Blob([byteArray], { type: contentType })

    const file = new File([blob], 'Image-article-content', {
      type: `image/${imageType}`
    })

    const result = await HandleUploadFile(file, 'article_content')

    if (result) {
      setLoading(false)
      element.url = result.url
      toast.success('Upload image effectuer avec succès.')
    } else {
      setLoading(false)
      toast.error("Erreur lors de l'upload des images.")
    }
  }

  useEffect(() => {
    ConvertToFormdata()
  }, [])

  useMediaState()

  return (
    <MediaPopover pluginKey={ELEMENT_IMAGE}>
      <PlateElement className={cn('py-2.5', className)} {...props}>
        <figure className="group relative m-0" contentEditable={false}>
          {loading ? (
            <div className="w-full flex justify-center">
              <div
                id="loadingbox"
                className="flex w-full xl:w-1/3 py-16 loading-upload-image"
              >
                <ReactLoading
                  type="spin"
                  color="#e26400"
                  height={'15%'}
                  width={'15%'}
                  className="loading"
                  delay={0}
                />
              </div>
            </div>
          ) : (
            <Resizable
              align={align}
              options={{
                align,
                readOnly
              }}
            >
              <ResizeHandle
                options={{ direction: 'left' }}
                className={mediaResizeHandleVariants({ direction: 'left' })}
              />
              <Image
                className={cn(
                  'image-box',
                  'block w-full max-w-full cursor-pointer object-cover px-0',
                  'rounded-sm',
                  focused && selected && 'ring-2 ring-ring ring-offset-2'
                )}
                alt=""
                {...nodeProps}
              />
              <ResizeHandle
                options={{ direction: 'right' }}
                className={mediaResizeHandleVariants({ direction: 'right' })}
              />
            </Resizable>
          )}
        </figure>

        {children}
      </PlateElement>
    </MediaPopover>
  )
}
