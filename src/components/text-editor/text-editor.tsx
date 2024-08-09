'use client'

import React, { useEffect, useState } from 'react'
import { Plate, PlateProvider, useEditorRef } from '@udecode/plate-common'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

import { plugins } from './lib/plate/plate-plugins'
import { cn } from './lib/utils'
import { FixedToolbar } from '@/components/text-editor/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/text-editor/plate-ui/fixed-toolbar-buttons'
import ElementEditor from './plate-ui/element-editor'

interface InputDescriptionProps {
  setContent: any
  content: string | any
  isEdited: boolean
}

export const TextEditor: React.FC<InputDescriptionProps> = ({
  setContent,
  content,
  isEdited
}) => {
  return (
    <div className="relative z-0">
      <PlateProvider
        onChange={(val) => setContent(val)}
        value={content}
        plugins={plugins}
        initialValue={isEdited ? '' : content}
      >
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <ElementEditor />

        <div className="flex">
          <Plate
            editableProps={{
              autoFocus: true,
              className: cn(
                'relative max-w-full leading-[1.4] outline-none [&_strong]:font-bold',
                '!min-h-[300px] w-full p-6'
              )
            }}
          ></Plate>
        </div>
      </PlateProvider>
    </div>
  )
}
