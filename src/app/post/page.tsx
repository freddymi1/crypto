import AuthorizerWrapper from '@/components/authorization-wrapper/authorization-wrapper'
import PostArticle from '@/components/post-deal/post-article'
import { getAllCategory } from '@/lib/api/category'

export async function generateMetadata() {
  return {
    title: 'Poster un article',
    description: 'Poster un article'
  }
}

async function PostDeal() {
  const data = await getAllCategory()

  return (
    <AuthorizerWrapper>
      <PostArticle categories={data} />
    </AuthorizerWrapper>
  )
}

export default PostDeal
