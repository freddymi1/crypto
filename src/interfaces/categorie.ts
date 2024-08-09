import { UUID } from 'crypto'

export type CategoryFromApi = {
  title: string
  meta_title: string
  slug: string
  description: string
  image: string
  articles_count: number
  id: UUID
}

export type Category = {
  title: string
  metaTitle: string
  slug: string
  description: string
  image: string
  articlesCount: number
  id: UUID
}
