import React from 'react'
import styles from './comments.module.css'
import { Comment } from '@/interfaces/comment'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

interface ActionPopoverProps {
  EditComment: (item: Comment, index: string) => void
  DeleteComment: (commentId: string) => void
  item: Comment
}
export const ActionPopover: React.FC<ActionPopoverProps> = ({
  EditComment,
  DeleteComment,
  item
}) => {
  return (
    <div
      className={`absolute w-auto xl:w-[400px] top-[70px] right-6 rounded-lg p-6 ${styles.popover}`}
    >
      <div
        onClick={() => EditComment(item, item.id)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <AiOutlineEdit />
        <span>Modifier le commentaire</span>
      </div>
      <div
        onClick={() => DeleteComment(item.id)}
        className="flex items-center gap-2 pt-6 cursor-pointer"
      >
        <AiOutlineDelete />
        <span>Supprimer le commentaire</span>
      </div>
    </div>
  )
}
