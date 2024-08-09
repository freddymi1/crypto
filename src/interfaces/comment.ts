import { UUID } from 'crypto'

export type CommentFromApi = {
  content: string
  author_id: string
  creation_datetime: string
  parent_id: string
  state: string
  parent: CommentParentFromCommentApi
  author: CommentAuthorFromCommentApi
  id: UUID
}

export type Comment = {
  content: string
  authorId: string
  creationDatetime: string
  parentId: string
  state: string
  parent: CommentParent
  author: CommentAuthor
  id: UUID
}

export type CommentParentFromCommentApi = {
  id: UUID
  author_id: string
  author_username: string
}

export type CommentParent = {
  id: UUID
  authorId: string
  authorUsername: string
}

export type CommentAuthorFromCommentApi = {
  id: UUID
  username: string
  profile_picture: string
}

export type CommentAuthor = {
  id: UUID
  username: string
  profilePicture: string
}
