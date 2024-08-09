'use client'

import React, { useEffect } from 'react'
import { ELEMENT_IMAGE, insertImage } from '@udecode/plate-media'

import { Icons } from '@/components/text-editor/icons'

import { ToolbarButton } from './toolbar'
import { ShowUploadImageModal } from '@/components/upload-image-modal/upload-image-modal'
import { usePlateEditorState } from '@udecode/plate-common'
import { useTextEditor } from '@/components/upload-image-modal/text-editor-context/text-editor-context'

export function MediaToolbarButton({
  nodeType
}: {
  nodeType?: typeof ELEMENT_IMAGE
}) {
  const editor = usePlateEditorState()

  const { imageUrl } = useTextEditor()

  useEffect(() => {
    if (imageUrl !== '') {
      insertImage(editor, imageUrl)
    }
  }, [editor, imageUrl])

  return (
    <ToolbarButton>
      <div
        onClick={ShowUploadImageModal}
        className="flex items-center justify-center h-60"
      >
        <Icons.image />
      </div>
    </ToolbarButton>
  )
}
