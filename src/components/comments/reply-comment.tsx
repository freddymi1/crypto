'use client'

import React, { useState } from 'react'
import styles from './comments.module.css'
import { CommentInput } from './comment-input'
import { Comment } from '@/interfaces/comment'
import { Article } from '@/interfaces/article'
import { CommentChild } from './comments-child'
import { ProfileComment } from './profile-comment'
import { FiMoreHorizontal } from 'react-icons/fi'
import OutsideClickDetector from '@/utils/outside-click-detector'
import { ActionPopover } from './action-popover'
import { ButtonBlock } from './button-block'
import { Profile } from '@/interfaces/profile'

interface ReplyCommentProps {
  HandlePostComment: (parentId: string) => void
  ToggleOpenPopover: (index: string) => void
  replyComment: string
  HandleReplyCommentChange: (e: any) => void
  setShowReplyComment: any
  showReplyComment: boolean
  commentsItems: Comment[] | any[]
  comment: Comment | any
  replySuccess: boolean
  setReplySuccess: any
  replyComSuccess: boolean
  setReplyComSuccess: any
  article: Article
  loading: boolean
  openPopover: boolean
  isOpenPopover: any
  setOpenPopover: any
  DeleteComment: (commentId: string) => void
  HandleCancelComment: () => void
  userId: Profile | any
  commentId: string
  setIsEdit: any
  setReplyComment: any
  setCommentId: any
  setActiveComment: any
  activeComment: string
  GoToCommentParentSection: (parentId: string, commentId: string) => void
}
export const ReplyComment: React.FC<ReplyCommentProps> = ({
  replyComment,
  HandleReplyCommentChange,
  ToggleOpenPopover,
  setShowReplyComment,
  showReplyComment,
  HandlePostComment,
  commentsItems,
  comment,
  replySuccess,
  setReplyComSuccess,
  replyComSuccess,
  setReplySuccess,
  article,
  loading,
  openPopover,
  isOpenPopover,
  setOpenPopover,
  DeleteComment,
  HandleCancelComment,
  userId,
  commentId,
  setIsEdit,
  setReplyComment,
  setCommentId,
  setActiveComment,
  activeComment,
  GoToCommentParentSection
}) => {
  const [isReply, setIsReply] = useState(false)
  const [commentIndex, setCommentIndex] = useState<any>(null)

  const [showOtherComments, setShowOtherComments] = useState<boolean>(false)

  const HandleShowReplyComment = (index: string) => {
    setIsReply(true)
    setCommentIndex(index)
    setReplyComSuccess(true)
    setReplySuccess(false)
    setShowReplyComment(true)
    setActiveComment('')
  }

  const EditComment = (comment: Comment, index: string) => {
    setIsEdit(true)
    setOpenPopover(false)
    setReplyComment(comment.content)
    HandleShowReplyComment(index)
    setCommentId(comment.id)
  }

  const HandleShowOtherComment = () => {
    setShowOtherComments((value) => !value)
  }

  return (
    <div
      className={`${
        ((showReplyComment && comment.id === commentId) ||
          comment.childrenCount > 0) &&
        styles.respondCom
      }`}
    >
      {comment.id === commentId && showReplyComment && (
        <div className={`flex w-full py-6 px-3 xl:px-6`}>
          <div
            className={`${replySuccess ? 'block' : 'hidden'} w-full ml-2 ${
              styles.redactor_content
            }`}
          >
            <CommentInput
              Cancel={HandleCancelComment}
              loading={loading}
              value={replyComment}
              onChange={HandleReplyCommentChange}
              onFocus={() => setShowReplyComment(true)}
              HandlePostComment={() => HandlePostComment(comment.id)}
              showCommentPost={showReplyComment}
            />
          </div>
        </div>
      )}

      {showOtherComments === false && (
        <>
          {comment.children[0] && comment.children[0] !== null && (
            <div className="pl-6 relative">
              <div className="py-6 pr-6 flex w-full justify-between">
                <ProfileComment item={comment.children[0]} />
                {((comment.children[0] && comment.children[0].author.id) ===
                  userId?.id ||
                  userId?.role === 'admin' ||
                  userId?.role === 'moderator') && (
                  <div
                    onClick={() =>
                      ToggleOpenPopover(
                        comment.children[0] && comment.children[0].id
                      )
                    }
                    className={`cursor-pointer ${styles._comment_menu}`}
                  >
                    <FiMoreHorizontal />
                  </div>
                )}
              </div>

              {openPopover === true &&
                isOpenPopover ===
                  (comment.children[0] && comment.children[0].id) && (
                  <OutsideClickDetector onClose={() => setOpenPopover(false)}>
                    <ActionPopover
                      item={comment.children[0]}
                      EditComment={EditComment}
                      DeleteComment={DeleteComment}
                    />
                  </OutsideClickDetector>
                )}
              <div className="pt-3 pb-0 pr-3 xl:pr-6">
                <p className="pb-3">
                  <span className={`${styles.comment_response}`}>
                    En réponse à
                  </span>{' '}
                  <strong
                    onClick={() =>
                      GoToCommentParentSection(
                        comment.children[0] && comment.children[0].id,
                        comment.children[0] && comment.children[0].parent.id
                      )
                    }
                    className="cursor-pointer capitalize"
                  >
                    {comment.children[0] &&
                      comment.children[0].parent.authorUsername}
                  </strong>
                </p>
                <p>{comment.children[0] && comment.children[0].content}</p>
                {comment.children[0] &&
                  comment.children[0].state === 'deleted' && (
                    <div className="pb-6">
                      <i className={`${styles.text_deleted}`}>
                        [commentaire supprimé]
                      </i>
                    </div>
                  )}

                {comment.children[0] &&
                  comment.children[0].state !== 'deleted' && (
                    <ButtonBlock
                      item={comment.children[0]}
                      HandleShowReplyComment={HandleShowReplyComment}
                    />
                  )}
              </div>
              {comment.children[0] &&
                comment.children[0].id === commentIndex &&
                isReply && (
                  <div className={`pb-12 pr-3 xl:pr-6`}>
                    <div
                      className={`${
                        replyComSuccess ? 'block' : 'hidden'
                      } w-full ${styles.redactor_content}`}
                    >
                      <CommentInput
                        Cancel={HandleCancelComment}
                        loading={loading}
                        value={replyComment}
                        onChange={HandleReplyCommentChange}
                        onFocus={() => setShowReplyComment(true)}
                        HandlePostComment={() =>
                          HandlePostComment(comment.children[0].id)
                        }
                        showCommentPost={showReplyComment}
                      />
                    </div>
                  </div>
                )}
            </div>
          )}
        </>
      )}

      <div className={`${styles.commentContent}`}>
        {showOtherComments === false && (
          <div
            className="w-auto pb-6 px-6 cursor-pointer"
            onClick={HandleShowOtherComment}
          >
            {comment && comment.childrenCount > 1 && (
              <button
                className={`flex gap-2 px-3 py-2 rounded-full w-auto ${styles.show_comment_btn}`}
              >
                <span>Voir plus de réponses </span>
                <span>({comment.childrenCount - 1})</span>
              </button>
            )}
          </div>
        )}

        {showOtherComments && (
          <>
            {
              <CommentChild
                GoToCommentParentSection={GoToCommentParentSection}
                activeComment={activeComment}
                comments={commentsItems}
                childCount={comment.childrenCount}
                userId={userId}
                ToggleOpenPopover={ToggleOpenPopover}
                setOpenPopover={setOpenPopover}
                EditComment={EditComment}
                DeleteComment={DeleteComment}
                HandleShowReplyComment={HandleShowReplyComment}
                HandleCancelComment={HandleCancelComment}
                loading={loading}
                replyComment={replyComment}
                HandleReplyCommentChange={HandleReplyCommentChange}
                setShowReplyComment={setShowReplyComment}
                HandlePostComment={HandlePostComment}
                showReplyComment={showReplyComment}
                commentIndex={commentIndex}
                isReply={isReply}
                replyComSuccess={replyComSuccess}
                openPopover={openPopover}
                isOpenPopover={isOpenPopover}
              />
            }
          </>
        )}
      </div>
    </div>
  )
}
