import React, { useState } from 'react'

import styles from './comments.module.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import { ProfileComment } from './profile-comment'
import { ButtonBlock } from './button-block'
import { Comment } from '@/interfaces/comment'
import { ReplyComment } from './reply-comment'
import { Article } from '@/interfaces/article'
import Separator from './separator'
import OutsideClickDetector from '@/utils/outside-click-detector'
import { ActionPopover } from './action-popover'
import { Profile } from '@/interfaces/profile'

interface CommentSectionProps {
  comments: Comment[]
  article: Article
  ToggleOpenPopover: (index: string) => void
  EditComment: (comment: Comment, index: string) => void
  DeleteComment: (commentId: string) => void
  openPopover: boolean
  setOpenPopover: any
  isOpenPopover: any
  replyComment: string
  setReplyComment: any
  HandlePostComment: () => void
  commentIndex: any
  setCommentIndex: any
  showReplyComment: any
  setShowReplyComment: any
  replySuccess: any
  setReplySuccess: any
  replyComSuccess: any
  setReplyComSuccess: any
  HandleShowReplyComment: (index: string, element: Comment) => void
  loading: boolean
  HandleCancelComment: () => void
  targetElementRef: any
  user: Profile
  setIsEdit: any
  setCommentId: any
  token: string
}
export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  article,
  ToggleOpenPopover,
  EditComment,
  DeleteComment,
  openPopover,
  setOpenPopover,
  isOpenPopover,
  replyComment,
  HandlePostComment,
  commentIndex,
  showReplyComment,
  setShowReplyComment,
  replySuccess,
  setReplySuccess,
  replyComSuccess,
  setReplyComSuccess,
  HandleShowReplyComment,
  HandleCancelComment,
  loading,
  targetElementRef,
  user,
  setIsEdit,
  setCommentId,
  setReplyComment,
  token
}) => {
  const [activeComment, setActiveComment] = useState<string>('')
  const HandleReplyCommentChange = (e: any) => {
    e.preventDefault()
    setReplyComment(e.target.value)
  }

  const FilterCommentByParentId = (elements: any[]): any[] => {
    return elements
      .filter((element) => element.parent && element.parent.id === undefined)
      .map((parentElement) => {
        let children = CreateChildren(parentElement.id)
        return {
          ...parentElement,
          children: children,
          childrenCount: children.reduce(
            (acc, child) => acc + child.childrenCount + 1,
            0
          )
        }
      })

    function CreateChildren(parentId: string): any[] {
      let children = elements
        .filter(
          (element) =>
            element.parent &&
            element.parent.id === parentId &&
            element.id !== parentId
        )
        .map((childElement) => {
          let grandChildren = CreateChildren(childElement.id)
          return {
            ...childElement,
            children: grandChildren,
            childrenCount: grandChildren.reduce(
              (acc, child) => acc + child.childrenCount + 1,
              0
            )
          }
        })
      return children
    }
  }

  const commentsElements = FilterCommentByParentId(comments)

  commentsElements.forEach((item) => {
    item.creationDatetime = new Date(item.creationDatetime)
  })

  const GoToCommentParentSection = (parentId: string, commentId: string) => {
    const commentElement = document.getElementById(`comment-${commentId}`)

    if (commentElement) {
      setActiveComment(commentId)
      setTimeout(() => {
        setActiveComment('')
      }, 5000)

      commentElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }

  return (
    <React.Fragment>
      {comments.length > 0 && (
        <React.Fragment>
          <div className={`${styles.blockRes}`}>
            <div className={`${styles.commentContent}`}>
              {commentsElements &&
                commentsElements
                  .sort(
                    (dateA, dateB) =>
                      dateB.creationDatetime.getTime() -
                      dateA.creationDatetime.getTime()
                  )
                  .map((item: any, index: number) => {
                    return (
                      <div key={index} className="relative">
                        <div
                          id={`comment-${item.id}`}
                          className={`${
                            activeComment === item.id ? 'comment-active' : ''
                          }`}
                        >
                          <div className="py-6 px-6 w-full flex justify-between">
                            <ProfileComment item={item} />
                            {((token !== undefined &&
                              (item.author && item.author.id) === user?.id) ||
                              user?.role === 'admin' ||
                              user?.role === 'moderator') && (
                              <div
                                onClick={() => ToggleOpenPopover(item.id)}
                                className={`cursor-pointer ${styles._comment_menu}`}
                              >
                                <FiMoreHorizontal />
                              </div>
                            )}
                          </div>

                          {openPopover && isOpenPopover === item.id && (
                            <OutsideClickDetector
                              onClose={() => setOpenPopover(false)}
                            >
                              <ActionPopover
                                item={item}
                                EditComment={EditComment}
                                DeleteComment={DeleteComment}
                              />
                            </OutsideClickDetector>
                          )}

                          <div className="p-6">
                            <p>{item.content}</p>
                            {item.state === 'deleted' && (
                              <i className={`${styles.text_deleted}`}>
                                [commentaire supprimé]
                              </i>
                            )}
                            {item.state !== 'deleted' && (
                              <div className="flex justify-between">
                                <div className="flex gap-3 items-center">
                                  <ButtonBlock
                                    item={item}
                                    HandleShowReplyComment={
                                      HandleShowReplyComment
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          id="replyComment"
                          ref={targetElementRef}
                          className={`pt-0 pl-6`}
                        >
                          <ReplyComment
                            loading={loading}
                            GoToCommentParentSection={GoToCommentParentSection}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            userId={user}
                            commentId={commentIndex}
                            setCommentId={setCommentId}
                            setIsEdit={setIsEdit}
                            setReplyComment={setReplyComment}
                            replyComment={replyComment}
                            HandleReplyCommentChange={HandleReplyCommentChange}
                            setShowReplyComment={setShowReplyComment}
                            showReplyComment={showReplyComment}
                            HandlePostComment={HandlePostComment}
                            commentsItems={item && item.children}
                            comment={item}
                            replySuccess={replySuccess}
                            replyComSuccess={replyComSuccess}
                            setReplySuccess={setReplySuccess}
                            setReplyComSuccess={setReplyComSuccess}
                            article={article}
                            ToggleOpenPopover={ToggleOpenPopover}
                            openPopover={openPopover}
                            isOpenPopover={isOpenPopover}
                            setOpenPopover={setOpenPopover}
                            DeleteComment={DeleteComment}
                            HandleCancelComment={HandleCancelComment}
                          />
                        </div>
                        <div className="mb-0">
                          <Separator />
                        </div>
                      </div>
                    )
                  })}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
