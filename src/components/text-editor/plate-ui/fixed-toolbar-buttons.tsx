import React from 'react'
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE
} from '@udecode/plate-basic-marks'
import { usePlateReadOnly } from '@udecode/plate-common'
import { ListStyleType } from '@udecode/plate-indent-list'
import { ELEMENT_IMAGE } from '@udecode/plate-media'

import { Icons } from '@/components/text-editor/icons'
import { EmojiDropdownMenu } from '@/components/text-editor/plate-ui/emoji-dropdown-menu'
import { IndentListToolbarButton } from '@/components/text-editor/plate-ui/indent-list-toolbar-button'
import { LinkToolbarButton } from '@/components/text-editor/plate-ui/link-toolbar-button'
import { MediaToolbarButton } from '@/components/text-editor/plate-ui/media-toolbar-button'
import { MarkToolbarButton } from './mark-toolbar-button'
import { ToolbarGroup } from './toolbar'

export function FixedToolbarButtons() {
  const readOnly = usePlateReadOnly()

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))'
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <EmojiDropdownMenu />
            </ToolbarGroup>
          </>
        )}
      </div>
    </div>
  )
}
