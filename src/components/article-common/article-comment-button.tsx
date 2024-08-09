import { Article } from '@/interfaces/article'
import styles from './article-common.module.css'
import { LiaCommentsSolid } from 'react-icons/lia'

interface ArticleCommentButtonProps {
  article: Article | any
  GoToCommentSection: () => void
}

export const ArticleCommentButton: React.FC<ArticleCommentButtonProps> = ({
  article,
  GoToCommentSection
}) => {
  return (
    <div
      onClick={GoToCommentSection}
      className={`flex justify-between px-3 py-0 ${styles.btn_comment}`}
    >
      <button className={`btn ${styles.comment}`}>
        <LiaCommentsSolid size="1.2em" />
      </button>
      <span className={`font-bold ${styles.nbr_comment}`}>
        {article.commentsCount}
      </span>
    </div>
  )
}
