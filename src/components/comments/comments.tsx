'use client'

import { Article } from '@/interfaces/article'
import React, { useEffect, useRef, useState } from 'react'
import styles from './comments.module.css'
import {
  DeleteCommentByArticle,
  EditCommentByArticle,
  PostCommentByArticle,
  getAllCommentByArticle
} from '@/lib/api/comment'
import { CommentInput } from './comment-input'
import { FilterSelect } from './filter-select'
import Separator from './separator'
import { CommentSection } from './comment-section'
import { Comment } from '@/interfaces/comment'
import { Profile } from '@/interfaces/profile'
import { getMyProfile } from '@/lib/api/profile'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'

interface CommentsProps {
  article: Article
}
export const Comments: React.FC<CommentsProps> = ({ article }) => {
  const [comments, setComments] = useState<Comment[] | any[]>([])
  const [showCommentPost, setShowCommentPost] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [openPopover, setOpenPopover] = useState<boolean>(false)

  const [isOpenPopover, setIsOpenPopover] = useState<any>(null)

  const [commentId, setCommentId] = useState<string>('')
  const [isEdit, setIsEdit] = useState(false)
  const [replyComment, setReplyComment] = useState<string>('')

  const [commentIndex, setCommentIndex] = useState<any>(null)
  const [showReplyComment, setShowReplyComment] = useState(false)

  const [isReply, setIsReply] = useState(false)
  const [replySuccess, setReplySuccess] = useState(false)
  const [replyComSuccess, setReplyComSuccess] = useState(false)

  const targetElementRef = useRef<HTMLDivElement | null>(null)
  const [user, setUser] = useState<Profile | any>()
  const [loadingProfil, setLoadingProfil] = useState<boolean>(false)
  const [commentsCount, setCommentsCount] = useState<number>(
    article.commentsCount
  )

  let session = useSessionContext()
  let { accessTokenPayload }: any = session

  let token = accessTokenPayload && accessTokenPayload.refreshTokenHash1

  const HandleCancelComment = () => {
    setShowCommentPost(false)
    setShowReplyComment(false)
    setReplyComment('')
    setComment('')
  }

  const HandleShowReplyComment = async (index: string, element: Comment) => {
    setIsReply(!isReply)
    setCommentIndex(index)
    setReplySuccess(true)
    setReplyComSuccess(true)
    setShowReplyComment(true)
    setReplyComment('')
  }

  useEffect(() => {
    if (token !== undefined) {
      GetUserProfil()
    }
    GetAllComments()
  }, [article.id, isEdit, token])

  const GetAllComments = () => {
    getAllCommentByArticle(article.id).then((data) => {
      setComments(data)
    })
  }

  const GetUserProfil = () => {
    setLoadingProfil(true)
    getMyProfile()
      .then((data: any) => {
        if (data) {
          setLoadingProfil(false)
          setUser(data)
        }
      })
      .catch((error) => {
        setLoadingProfil(false)
        console.log('Erreur', error)
      })
  }

  const HandlePostComment = async (parentId?: string) => {
    let content = ''
    if (comment !== '') content = comment
    if (replyComment !== '') content = replyComment
    setLoading(true)
    if (isEdit) {
      return await EditCommentByArticle(content, commentId).then((res: any) => {
        if (res) {
          setLoading(false)
          setShowCommentPost(false)
          setShowReplyComment(false)
          setComments([...comments, { content: res.content }])
          setComment('')
          setReplyComment('')
          setIsEdit(false)
          setReplySuccess(false)
          setReplyComSuccess(false)
          GetAllComments()
        }
      })
    } else {
      return await PostCommentByArticle(content, article.id, parentId).then(
        (res: any) => {
          if (res) {
            setLoading(false)
            setShowCommentPost(false)
            setShowReplyComment(false)
            setCommentsCount(commentsCount + 1)
            setComments([
              ...comments,
              {
                id: res.id,
                authorId: res.author_id,
                parentId: res.parent_id,
                content: res.content,
                creationDatetime: res.creation_datetime
              }
            ])
            setComment('')
            setReplyComment('')
            setReplySuccess(false)
            setReplyComSuccess(false)
            GetAllComments()
          }
        }
      )
    }
  }

  const HandleCommentChange = (e: any) => {
    e.preventDefault()
    setComment(e.target.value)
  }

  const ToggleOpenPopover = (index: string) => {
    setIsOpenPopover(index)
    setOpenPopover((value) => !value)
    setReplySuccess(false)
    setShowCommentPost(false)
    setShowReplyComment(false)
    setReplyComSuccess(false)
  }

  const EditComment = (comment: Comment, index: string) => {
    setIsEdit(true)
    setOpenPopover(false)
    setCommentId(comment.id)
    if (comment.parentId !== null) {
      setReplyComment(comment.content)
      setShowCommentPost(false)
    } else {
      setComment(comment.content)
      setShowReplyComment(false)
      setShowCommentPost(true)
    }

    window.scrollTo(0, 600)
  }

  const DeleteComment = (commentId: string) => {
    try {
      const res = DeleteCommentByArticle(commentId).then((ress) => {
        if (ress !== undefined) {
          setOpenPopover(false)
          setCommentsCount(commentsCount - 1)
          GetAllComments()
        } else {
          setOpenPopover(false)
        }
      })
      return res
    } catch (err) {
      console.log('Error')
      setOpenPopover(false)
    }
  }

  return (
    <div
      id="comment"
      ref={targetElementRef}
      className={`mt-6 py-6 mb-3.5 rounded-lg shadow card-bg`}
    >
      <div className="px-6">
        <div className="lg:flex gap-2 align-center items-center">
          <h4 className={styles.title}>
            {commentsCount ? commentsCount : 0} commentaires
          </h4>
          <p>triés par</p>
          <FilterSelect
            menu={[
              { label: "Le meilleur d'abord", action: '' },
              { label: "Le plus récent d'abord", action: '' },
              { label: "Le plus ancien d'abord", action: '' },
              { label: "Le plus util d'abord", action: '' }
            ]}
          />
        </div>
        <div className="py-4">
          <div className="flex w-full">
            <div className={`hidden lg:flex ${styles.profilAvatar}`}>
              <h3 className={styles.avatarTitle}>A</h3>
            </div>
            <div className={`w-full lg:ml-2 ${styles.redactor_content}`}>
              <CommentInput
                loading={loading}
                value={comment}
                Cancel={HandleCancelComment}
                onChange={HandleCommentChange}
                onFocus={() => setShowCommentPost(true)}
                HandlePostComment={HandlePostComment}
                showCommentPost={showCommentPost}
              />
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <CommentSection
        article={article}
        token={token}
        comments={comments}
        user={user}
        setIsEdit={setIsEdit}
        setCommentId={setCommentId}
        ToggleOpenPopover={ToggleOpenPopover}
        EditComment={EditComment}
        DeleteComment={DeleteComment}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        isOpenPopover={isOpenPopover}
        replyComment={replyComment}
        setReplyComment={setReplyComment}
        HandlePostComment={HandlePostComment}
        commentIndex={commentIndex}
        setCommentIndex={setCommentIndex}
        showReplyComment={showReplyComment}
        setShowReplyComment={setShowReplyComment}
        replySuccess={replySuccess}
        setReplySuccess={setReplySuccess}
        replyComSuccess={replyComSuccess}
        setReplyComSuccess={setReplyComSuccess}
        HandleShowReplyComment={HandleShowReplyComment}
        loading={loading}
        HandleCancelComment={HandleCancelComment}
        targetElementRef={targetElementRef}
      />
    </div>
  )
}
