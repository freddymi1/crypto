import { CommentFromApi, CommentParent } from '@/interfaces/comment'
import { toast } from 'react-hot-toast'

export const PostCommentByArticle = async (
  content: string,
  articleId: string,
  parentId?: string
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/comments-by-article/${articleId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content,
          parent_id: parentId
        })
      }
    )

    if (response.ok) {
      // Data successfully posted
    } else {
      toast.error('Erreur lors de la poste de commentaire')
    }

    let res = response.json()

    return res
  } catch (error) {
    toast.error('Erreur lors de la poste de commentaire')
  }
}

export async function getAllCommentByArticle(
  articleId: string
): Promise<Comment[]> {
  const res = await fetch(
    `${process.env.API_URL}/comments-by-article/${articleId}`
  )
  let raw = await res.json()
  const data: Comment[] | any = raw.map((d: CommentFromApi) => {
    return {
      id: d.id,
      content: d.content,
      authorId: d.author_id,
      parentId: d.parent_id,
      creationDatetime: d.creation_datetime,
      state: d.state,
      parent: {
        id: d.parent?.id,
        authorId: d.parent?.author_id,
        authorUsername: d.parent?.author_username
      },
      author: {
        id: d.author?.id,
        username: d.author?.username,
        profilePicture: d.author?.profile_picture
      }
    }
  })

  return data
}

export const EditCommentByArticle = async (
  content: string,
  commentId: string
) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/comments/${commentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: content
        })
      }
    )

    if (response.ok) {
      toast.success('Modification de commentaire ok!')
    } else {
      toast.error('Erreur lors de la modification de commentaire')
    }

    let res = response.json()

    return res
  } catch (error) {
    toast.error('Erreur lors de la modification de commentaire')
  }
}

export const DeleteCommentByArticle = async (commentId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.ok) {
      toast.success('Suppression de commentaire ok!')
    } else {
      toast.error('Erreur lors de la suppression de commentaire')
    }

    return response
  } catch (error) {
    toast.error('Erreur lors de la suppression de commentaire')
  }
}
