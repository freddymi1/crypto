import { createContext, useContext, useState, ReactNode } from 'react'

type TextEditorContextType = {
  imageUrl: string
  setImageUrl: (value: string) => void
  textEditorContent: any
  setTextEditorContent: (value: any) => void
}

const TextEditorContext = createContext<TextEditorContextType | undefined>(
  undefined
)

export function TextEditorProvider({ children }: { children: ReactNode }) {
  const [imageUrl, setImageUrl] = useState('')
  const [textEditorContent, setTextEditorContent] = useState<any>(null)
  return (
    <TextEditorContext.Provider
      value={{ imageUrl, setImageUrl, textEditorContent, setTextEditorContent }}
    >
      {children}
    </TextEditorContext.Provider>
  )
}

export function useTextEditor() {
  const context = useContext(TextEditorContext)
  if (context === undefined) {
    throw new Error('useModal doit être utilisé dans un ModalProvider')
  }
  return context
}
