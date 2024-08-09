import { useTextEditor } from '@/components/upload-image-modal/text-editor-context/text-editor-context'
import { insertElements, usePlateEditorState } from '@udecode/plate-common'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import React, { useEffect } from 'react'

export default function ElementEditor() {
  const editor = usePlateEditorState()

  const { textEditorContent } = useTextEditor()

  useEffect(() => {
    if (textEditorContent !== null) {
      insertElements(editor, textEditorContent)
    }
  }, [editor, textEditorContent])

  return <div></div>
}
