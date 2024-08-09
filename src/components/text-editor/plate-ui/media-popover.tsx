import React, { useEffect } from 'react'
import {
  isCollapsed,
  useElement,
  usePlateEditorState,
  useRemoveNodeButton
} from '@udecode/plate-common'
import { floatingMediaActions } from '@udecode/plate-media'
import { useReadOnly, useSelected } from 'slate-react'

import { Icons } from '@/components/text-editor/icons'

import { Button } from './button'
import { Popover, PopoverAnchor, PopoverContent } from './popover'

export interface MediaPopoverProps {
  pluginKey?: string
  children: React.ReactNode
}

export function MediaPopover({ pluginKey, children }: MediaPopoverProps) {
  const readOnly = useReadOnly()
  const selected = useSelected()
  const editor = usePlateEditorState()

  const isOpen = !readOnly && selected && isCollapsed(editor.selection)

  useEffect(() => {
    if (!isOpen) {
      floatingMediaActions.isEditing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const element = useElement()
  const { props: buttonProps } = useRemoveNodeButton({ element })

  if (readOnly) return <>{children}</>

  return (
    <Popover open={isOpen}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent className="w-auto p-1">
        <div className="box-content flex h-9 items-center gap-1">
          <Button variant="ghost" size="sms" {...buttonProps}>
            <Icons.delete className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
