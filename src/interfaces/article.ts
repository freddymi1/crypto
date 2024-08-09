import { UUID } from 'crypto'

export type ArticleSummaryFromApi = {
  version_id: UUID
  id: UUID
  slug: string
  creation_datetime: string
  update_datetime: string
  title: string
  short_content: string
  author_id: UUID
  author_username: string
  comments_count: number
  images: string
  temperature: number
  categories: string[]
}

export type ArticleSummary = {
  versionId: UUID
  id: UUID
  slug: string
  creationDatetime: string
  updateDatetime: string
  title: string
  shortContent: string
  authorId: UUID
  authorUsername: string
  commentsCount: number
  images: string
  temperature: number
  categories: string[]
}

export type Article = ArticleSummary & {
  content: string
}
