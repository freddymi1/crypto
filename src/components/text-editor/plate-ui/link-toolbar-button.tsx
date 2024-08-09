import React from 'react'
import {
  useLinkToolbarButton,
  useLinkToolbarButtonState
} from '@udecode/plate-link'

import { Icons } from '@/components/text-editor/icons'

import { ToolbarButton } from './toolbar'

export function LinkToolbarButton() {
  const state = useLinkToolbarButtonState()
  const { props } = useLinkToolbarButton(state)

  return (
    <ToolbarButton tooltip="Link" {...props}>
      <Icons.link />
    </ToolbarButton>
  )
}
