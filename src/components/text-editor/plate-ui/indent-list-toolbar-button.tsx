import React from 'react'
import {
  ListStyleType,
  useIndentListToolbarButton,
  useIndentListToolbarButtonState
} from '@udecode/plate-indent-list'

import { Icons } from '@/components/text-editor/icons'

import { ToolbarButton, ToolbarButtonProps } from './toolbar'

export function IndentListToolbarButton({
  nodeType = ListStyleType.Disc
}: ToolbarButtonProps & { nodeType?: ListStyleType }) {
  const state = useIndentListToolbarButtonState({ nodeType })
  const { props } = useIndentListToolbarButton(state)

  return (
    <ToolbarButton
      tooltip={
        nodeType === ListStyleType.Disc ? 'Bulleted List' : 'Numbered List'
      }
      {...props}
    >
      {nodeType === ListStyleType.Disc ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  )
}
