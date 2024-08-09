import { Comment } from '@/interfaces/comment'
import React from 'react'
import { ButtonBlock } from './button-block'
import { CommentInput } from './comment-input'
import OutsideClickDetector from '@/utils/outside-click-detector'
import { ActionPopover } from './action-popover'
import { ProfileComment } from './profile-comment'
import { FiMoreHorizontal } from 'react-icons/fi'
import styles from './comments.module.css'
import { Profile } from '@/interfaces/profile'

interface CommentChildProps {
  comments: Comment[] | any[]
  HandlePostComment: (parentId: string) => void
  ToggleOpenPopover: (index: string) => void
  replyComment: string
  HandleReplyCommentChange: (e: any) => void
  HandleShowReplyComment: (index: string) => void
  setShowReplyComment: any
  showReplyComment: boolean
  loading: boolean
  setOpenPopover: any
  EditComment: (comment: Comment, index: string) => void
  DeleteComment: (commentId: string) => void
  HandleCancelComment: () => void
  commentIndex: any
  isReply: boolean
  replyComSuccess: any
  openPopover: any
  isOpenPopover: any
  childCount: number
  userId: Profile | any
  GoToCommentParentSection: (parentId: string, commentId: string) => void
  activeComment: string
}
export const CommentChild: React.FC<CommentChildProps> = ({
  comments,
  ToggleOpenPopover,
  setOpenPopover,
  EditComment,
  DeleteComment,
  HandleShowReplyComment,
  HandleCancelComment,
  loading,
  replyComment,
  HandleReplyCommentChange,
  setShowReplyComment,
  HandlePostComment,
  showReplyComment,
  commentIndex,
  isReply,
  replyComSuccess,
  openPopover,
  isOpenPopover,
  childCount,
  userId,
  GoToCommentParentSection,
  activeComment
}) => {
  return (
    <div>
      {comments &&
        comments.map((com: any, index) => (
          <div key={com.id} className="relative">
            <div
              id={`comment-${com.id}`}
              className={`${activeComment === com.id ? 'comment-active' : ''}`}
            >
              <div className="py-6 px-3 xl:px-6 flex w-full justify-between">
                <ProfileComment item={com} />
                {com.state !== 'deleted' && (
                  <>
                    {(com.authorId === userId?.id ||
                      userId?.role === 'admin' ||
                      userId?.role === 'moderator') && (
                      <div
                        onClick={() => ToggleOpenPopover(com.id)}
                        className={`cursor-pointer ${styles._comment_menu}`}
                      >
                        <FiMoreHorizontal />
                      </div>
                    )}
                  </>
                )}
              </div>
              {openPopover && isOpenPopover === com.id && (
                <OutsideClickDetector onClose={() => setOpenPopover(false)}>
                  <ActionPopover
                    item={com}
                    EditComment={EditComment}
                    DeleteComment={DeleteComment}
                  />
                </OutsideClickDetector>
              )}

              <div className="pt-3 pb-0 px-3 xl:px-6">
                <p className="pb-3">
                  <span className={`${styles.comment_response}`}>
                    En réponse à
                  </span>{' '}
                  <strong
                    className="cursor-pointer capitalize"
                    onClick={() =>
                      GoToCommentParentSection(
                        com.id,
                        com.parent && com.parent.id
                      )
                    }
                  >
                    {com.parent && com.parent.authorUsername}
                  </strong>
                </p>
                <p>{com.content}</p>
                {com.state === 'deleted' && (
                  <div className="pb-6">
                    <i className={`${styles.text_deleted}`}>
                      [commentaire supprimé]
                    </i>
                  </div>
                )}
                {com.state !== 'deleted' && (
                  <ButtonBlock
                    item={com}
                    HandleShowReplyComment={HandleShowReplyComment}
                  />
                )}
              </div>
            </div>
            {com.id === commentIndex && isReply && (
              <div className={`pb-12 px-3 xl:px-6`}>
                <div
                  className={`${replyComSuccess ? 'block' : 'hidden'} w-full ${
                    styles.redactor_content
                  }`}
                >
                  <CommentInput
                    Cancel={HandleCancelComment}
                    loading={loading}
                    value={replyComment}
                    onChange={HandleReplyCommentChange}
                    onFocus={() => setShowReplyComment(true)}
                    HandlePostComment={() => HandlePostComment(com.id)}
                    showCommentPost={showReplyComment}
                  />
                </div>
              </div>
            )}
            <div className={`${styles.commentContent}`}>
              {
                <CommentChild
                  GoToCommentParentSection={GoToCommentParentSection}
                  activeComment={activeComment}
                  childCount={childCount}
                  userId={userId}
                  comments={com.children}
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
            </div>
          </div>
        ))}
    </div>
  )
}
