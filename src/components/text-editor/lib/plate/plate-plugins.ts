import { createAlignPlugin } from '@udecode/plate-alignment'
import { createAutoformatPlugin } from '@udecode/plate-autoformat'
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from '@udecode/plate-basic-marks'
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE
} from '@udecode/plate-block-quote'
import {
  createExitBreakPlugin,
  createSoftBreakPlugin
} from '@udecode/plate-break'
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock
} from '@udecode/plate-code-block'
import { createComboboxPlugin } from '@udecode/plate-combobox'
import { createCommentsPlugin } from '@udecode/plate-comments'
import {
  createPlugins,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  PlateLeaf,
  RenderAfterEditable,
  withProps
} from '@udecode/plate-common'
import { createEmojiPlugin } from '@udecode/plate-emoji'

import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin
} from '@udecode/plate-font'
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  KEYS_HEADING
} from '@udecode/plate-heading'
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight'
import {
  createHorizontalRulePlugin,
  ELEMENT_HR
} from '@udecode/plate-horizontal-rule'
import { createIndentPlugin } from '@udecode/plate-indent'
import { createIndentListPlugin } from '@udecode/plate-indent-list'
import { createKbdPlugin } from '@udecode/plate-kbd'
import { createLineHeightPlugin } from '@udecode/plate-line-height'
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link'
import {
  createTodoListPlugin,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL
} from '@udecode/plate-list'
import {
  createImagePlugin,
  createMediaEmbedPlugin,
  ELEMENT_IMAGE
} from '@udecode/plate-media'
import {
  createMentionPlugin,
  ELEMENT_MENTION,
  ELEMENT_MENTION_INPUT
} from '@udecode/plate-mention'
import { createNodeIdPlugin } from '@udecode/plate-node-id'
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH
} from '@udecode/plate-paragraph'
import { createResetNodePlugin } from '@udecode/plate-reset-node'
import { createSelectOnBackspacePlugin } from '@udecode/plate-select'
import { createBlockSelectionPlugin } from '@udecode/plate-selection'
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx'
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md'
import { createTablePlugin, ELEMENT_TD } from '@udecode/plate-table'
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block'

import { autoformatPlugin } from './autoformatPlugin'
import { BlockquoteElement } from '../../plate-ui/blockquote-element'
import { EmojiCombobox } from '../../plate-ui/emoji-combobox'
import { HeadingElement } from '../../plate-ui/heading-element'
import { HighlightLeaf } from '../../plate-ui/highlight-leaf'
import { HrElement } from '../../plate-ui/hr-element'
import { ImageElement } from '../../plate-ui/image-element'
import { LinkElement } from '../../plate-ui/link-element'
import { LinkFloatingToolbar } from '../../plate-ui/link-floating-toolbar'
import { ListElement } from '../../plate-ui/list-element'
import { MentionElement } from '../../plate-ui/mention-element'
import { MentionInputElement } from '../../plate-ui/mention-input-element'
import { ParagraphElement } from '../../plate-ui/paragraph-element'
import { withPlaceholders } from '../../plate-ui/placeholder'

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  defaultType: ELEMENT_PARAGRAPH
}

const resetBlockTypesCodeBlockRule = {
  types: [ELEMENT_CODE_BLOCK],
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock
}

export const plugins = createPlugins(
  [
    // Nodes
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable
    }),

    createImagePlugin({
      options: {
        async uploadImage(dataUrl) {
          return dataUrl
        }
      }
    }),
    createMediaEmbedPlugin(),
    createMentionPlugin(),
    createTablePlugin(),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),

    // Block Style
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3]
        }
      }
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK
          ]
        }
      }
    }),
    createIndentListPlugin(),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [ELEMENT_PARAGRAPH, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3]
        }
      }
    }),

    // Functionality
    createAutoformatPlugin(autoformatPlugin),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0
        }
      }
    }),
    createComboboxPlugin(),
    createEmojiPlugin({
      renderAfterEditable: EmojiCombobox
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter'
          },
          {
            hotkey: 'mod+shift+enter',
            before: true
          },
          {
            hotkey: 'enter',
            query: {
              start: true,
              end: true,
              allow: KEYS_HEADING
            },
            relative: true,
            level: 1
          }
        ]
      }
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          {
            ...resetBlockTypesCommonRule,
            hotkey: 'Enter',
            predicate: isBlockAboveEmpty
          },
          {
            ...resetBlockTypesCommonRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtBlockStart
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: 'Enter',
            predicate: isCodeBlockEmpty
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtCodeBlockStart
          }
        ]
      }
    }),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [ELEMENT_IMAGE, ELEMENT_HR]
        }
      }
    }),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: 'shift+enter' },
          {
            hotkey: 'enter',
            query: {
              allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD]
            }
          }
        ]
      }
    }),

    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH }
    }),

    // Collaboration
    createCommentsPlugin(),

    // Deserialization
    createDeserializeDocxPlugin(),
    createDeserializeMdPlugin()
  ],
  {
    components: withPlaceholders({
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_HR]: HrElement,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
      [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
      [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
      [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
      [ELEMENT_IMAGE]: ImageElement,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_MENTION]: MentionElement,
      [ELEMENT_MENTION_INPUT]: MentionInputElement,
      [ELEMENT_UL]: withProps(ListElement, { variant: 'ul' }),
      [ELEMENT_OL]: withProps(ListElement, { variant: 'ol' }),
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' })
    })
  }
)
