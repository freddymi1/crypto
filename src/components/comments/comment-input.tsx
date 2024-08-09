import React from 'react'
import styles from './comments.module.css'
import { AiOutlineSend } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'

interface CommentInputProps {
  value: string
  onChange: (e: any) => void
  onFocus: any
  showCommentPost: boolean
  HandlePostComment: () => void
  loading: boolean
  Cancel: any
}
export const CommentInput: React.FC<CommentInputProps> = ({
  value,
  onChange,
  onFocus,
  showCommentPost,
  HandlePostComment,
  loading,
  Cancel
}) => {
  return (
    <React.Fragment>
      <textarea
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        autoFocus={showCommentPost}
        className={`w-full p-2 rounded-md ${styles.textarea}`}
        name="message"
        id="message"
        cols={20}
        rows={showCommentPost ? 5 : 2}
      ></textarea>
      {showCommentPost && (
        <div className={`flex gap-3 ${styles.textarea_footer}`}>
          <button onClick={Cancel} className={`p-2 ${styles.btn}`}>
            <MdOutlineCancel />
            <span className="ml-2">Annuler</span>
          </button>
          <button
            onClick={() => HandlePostComment()}
            className={`p-2 ${styles.btn}`}
            disabled={loading}
          >
            {loading ? (
              <>Chargement...</>
            ) : (
              <>
                <AiOutlineSend />
                <span className="ml-2">Envoyer</span>
              </>
            )}
          </button>
        </div>
      )}
    </React.Fragment>
  )
}
