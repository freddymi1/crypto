import AboutArticle from '@/components/detail-article/about-article/about-article'
import ArticleDetail from '@/components/detail-article/article-detail/article-detail'
import { getArticleBySlug } from '@/lib/api/article'
import Breadcrum from '@/components/navbar/breadcrum'
import { Comments } from '@/components/comments/comments'

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}) {
  const article = await getArticleBySlug(params.slug)
  return {
    title: article.title,
    content: article.shortContent
  }
}

async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  return (
    <>
      <Breadcrum
        crumList={[
          { text: 'Acceuil', href: '/' },
          { text: 'Test Category', href: '/categories/test-category' },
          { text: article.title, href: `/articles/${params.slug}` }
        ]}
      />
      <div className="max-w-[2520px] mx-auto 2xl:px-60 xl:px-32 md:24 sm:px-2 px-4 pb-6]">
        <ArticleDetail article={article} />
        <AboutArticle article={article} />
        <Comments article={article} />
      </div>
    </>
  )
}

export default ArticlePage
