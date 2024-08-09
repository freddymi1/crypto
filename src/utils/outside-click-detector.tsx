import React, { useRef, useEffect } from 'react'

interface OutsideClickDetectorProps {
  onClose: () => void
  children: any
}

const OutsideClickDetector: React.FC<OutsideClickDetectorProps> = ({
  onClose,
  children
}) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const node = nodeRef.current
      if (node) {
        const divs = node.querySelectorAll('div')
        const thirdDiv = divs[2] as HTMLDivElement

        if (thirdDiv && !thirdDiv.contains(event.target as Node)) {
          onClose()
        }
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose() // Close the popup or modal
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [onClose])

  return <div ref={nodeRef}>{children}</div>
}

export default OutsideClickDetector
