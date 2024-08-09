import { Category, CategoryFromApi } from '@/interfaces/categorie'

export async function getAllCategory(): Promise<Category[]> {
  const res = await fetch(`${process.env.API_URL}/articles/categories`)
  let raw = await res.json()
  const data: Category[] = raw.map((d: CategoryFromApi) => {
    return {
      id: d.id,
      slug: d.slug,
      title: d.title,
      metaTitle: d.meta_title,
      description: d.description,
      image: d.image,
      articlesCount: d.articles_count
    }
  })
  return data
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  const res = await fetch(`${process.env.API_URL}/articles/categories/${slug}`)
  let raw = await res.json()
  const data: Category = {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    metaTitle: raw.meta_title,
    image: raw.image,
    articlesCount: raw.articles_count
  }
  return data
}
