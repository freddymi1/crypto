import styles from './article-common.module.css'
import { Article } from '@/interfaces/article'
import { VotedArticle } from '@/lib/api/vote'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaMinus } from 'react-icons/fa'
import { useSessionContext } from 'supertokens-auth-react/recipe/session'
import ReactLoading from 'react-loading'
import { ShowSigninModal } from '../signin-modal/sign-in-modal'

interface ArticleVotesButtonProps {
  article: Article | any
}

export const ArticleVotesButton: React.FC<ArticleVotesButtonProps> = ({
  article
}) => {
  let session = useSessionContext()

  const [votes, setVotes] = useState<number>(article.temperature)
  const [loading, setLoading] = useState<boolean>(false)

  let { accessTokenPayload }: any = session

  let token = accessTokenPayload && accessTokenPayload.refreshTokenHash1

  const HandleVoteActions = async (articleId: string, typeVote: string) => {
    setLoading(true)
    if (token === undefined) {
      ShowSigninModal()
      setLoading(false)
    } else {
      return await VotedArticle(articleId, typeVote).then((response: any) => {
        if (response.status !== 204) {
          toast.error('Erreur lors du vote')
          setLoading(false)
          setVotes((prevCount) => prevCount)
        } else {
          switch (typeVote) {
            case 'upvote':
              setVotes((prevCount) => prevCount + 1)
              setLoading(false)
              break

            case 'downvote':
              setVotes((prevCount) => prevCount - 1)
              setLoading(false)
              break

            default:
              break
          }
        }
      })
    }
  }

  return (
    <div
      className={`flex gap-1 justify-between w-[120px] px-3 ${styles.btn_vote}`}
    >
      <button
        onClick={() => HandleVoteActions(article.id, 'downvote')}
        className={`${styles.btnMinus}`}
      >
        <FaMinus size="1.2em" />
      </button>

      <label className={`font-bold ${styles.nbr_vote}`}>
        {loading ? (
          <ReactLoading
            type="spin"
            color="#e26400"
            height={'20px'}
            width={'20px'}
            className="loading"
            delay={0}
          />
        ) : (
          <span>{votes}°</span>
        )}
      </label>

      <button
        onClick={() => HandleVoteActions(article.id, 'upvote')}
        className={`${styles.btnPlus}`}
      >
        <Image
          src="/images/icons/fusee.gif"
          width={24}
          height={24}
          alt="fusee"
          className={`${styles.iconFuse}`}
        />
      </button>
    </div>
  )
}
