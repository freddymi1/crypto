import React from 'react'

interface SortButtonProps {
  action: () => void
  label: string
  classN: any
}
export const SortButton: React.FC<SortButtonProps> = ({
  action,
  label,
  classN
}) => {
  return (
    <button onClick={action} className={classN}>
      {label}
    </button>
  )
}
