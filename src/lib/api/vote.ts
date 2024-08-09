import { toast } from 'react-hot-toast'

export const VotedArticle = async (articleId: string, voteType: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/votes/${articleId}/${voteType}`,
      {
        method: 'POST'
      }
    )

    return response
  } catch (error) {
    toast.error('Erreur lors du vote')
  }
}
