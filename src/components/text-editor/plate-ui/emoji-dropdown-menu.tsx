import React from 'react'
import {
  EmojiDropdownMenuOptions,
  useEmojiDropdownMenuState
} from '@udecode/plate-emoji'

import { Icons } from '@/components/text-editor/icons'
import { EmojiToolbarDropdown } from '@/components/text-editor/plate-ui/emoji-toolbar-dropdown'
import {
  ToolbarButton,
  ToolbarButtonProps
} from '@/components/text-editor/plate-ui/toolbar'

import { emojiCategoryIcons, emojiSearchIcons } from './emoji-icons'
import { EmojiPicker } from './emoji-picker'

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions
} & ToolbarButtonProps

export function EmojiDropdownMenu({
  options,
  ...props
}: EmojiDropdownMenuProps) {
  const { isOpen, setIsOpen, emojiPickerState } =
    useEmojiDropdownMenuState(options)

  return (
    <EmojiToolbarDropdown
      control={
        <ToolbarButton pressed={isOpen} isDropdown tooltip="Emoji" {...props}>
          <Icons.emoji />
        </ToolbarButton>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <EmojiPicker
        {...emojiPickerState}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons
        }}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  )
}
