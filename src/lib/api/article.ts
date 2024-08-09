import {
  ArticleSummary,
  ArticleSummaryFromApi,
  Article
} from '@/interfaces/article'
import { toast } from 'react-hot-toast'

export async function getArticlesSummary(
  sortBy: string
): Promise<ArticleSummary[]> {
  const res = await fetch(
    `${process.env.API_URL}/articles/summaries?sort=${sortBy}`
  )
  let raw = await res.json()
  const data: ArticleSummary[] = raw.map((d: ArticleSummaryFromApi) => {
    return {
      versionId: d.version_id,
      id: d.id,
      slug: d.slug,
      title: d.title,
      creationDatetime: d.creation_datetime,
      updateDatetime: d.update_datetime,
      shortContent: d.short_content,
      authorId: d.author_id,
      authorUsername: d.author_username,
      images: d.images,
      commentsCount: d.comments_count,
      temperature: d.temperature
    }
  })
  return data
}

export async function getArticlesSummaryWithParams(
  category: string,
  sort: string
): Promise<ArticleSummary[]> {
  const res = await fetch(
    `${process.env.API_URL}/articles/summaries?category=${category}&sort=${sort}`
  )
  let raw = await res.json()
  const data: ArticleSummary[] = raw.map((d: ArticleSummaryFromApi) => {
    return {
      versionId: d.version_id,
      id: d.id,
      slug: d.slug,
      title: d.title,
      creationDatetime: d.creation_datetime,
      updateDatetime: d.update_datetime,
      shortContent: d.short_content,
      authorId: d.author_id,
      authorUsername: d.author_username,
      images: d.images,
      commentsCount: d.comments_count,
      temperature: d.temperature,
      categories: d.categories
    }
  })
  return data
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(`${process.env.API_URL}/articles/${slug}`)
  let raw = await res.json()
  const data: Article = {
    versionId: raw.version_id,
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    authorUsername: raw.author_username,
    images: raw.images,
    creationDatetime: raw.creation_datetime,
    updateDatetime: raw.update_datetime,
    shortContent: raw.short_content,
    content: raw.content,
    authorId: raw.author_id,
    commentsCount: raw.comments_count,
    temperature: raw.temperature,
    categories: raw.categories
  }
  return data
}

export const PostArticleData = async (
  title: string,
  images: string[],
  categories: string[],
  content: string
) => {
  try {
    const response = await fetch(`${process.env.API_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        images: images,
        categories: categories,
        content: content
      })
    })

    if (response.ok) {
      // Data successfully posted
      toast.success('Article posté avec succès')
    } else {
      // Handle error
      toast.error("Erreur lors de la poste de l'article")
    }
    return response
  } catch (error) {
    toast.error("Erreur lors de la poste de l'article")
  }
}

export const UpdateArticleData = async (
  title: string,
  images: string[],
  categories: string[],
  content: string,
  articleId: string
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/articles/${articleId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          images: images,
          categories: categories,
          content: content
        })
      }
    )

    if (response.ok) {
      // Data successfully posted
      toast.success('Article mis a jours avec succès')
    } else {
      // Handle error
      toast.error("Erreur lors de la mise a jour de l'article")
    }
    return response
  } catch (error) {
    toast.error("Erreur lors de la mise a jour de l'article")
  }
}
