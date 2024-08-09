import { FiCornerUpLeft } from 'react-icons/fi'
import { BtnAboutArticle } from '../detail-article/about-article/btn-about-article'
import { AiOutlineLike } from 'react-icons/ai'
import { Comment } from '@/interfaces/comment'

interface ButtonBlocProps {
  item: Comment | any
  HandleShowReplyComment: (index: any, element: Comment) => void
}

export const ButtonBlock: React.FC<ButtonBlocProps> = ({
  item,
  HandleShowReplyComment
}) => {
  return (
    <div className="py-6 flex gap-3">
      <BtnAboutArticle
        onClick={() => {}}
        label={`J'aime`}
        icons={<AiOutlineLike />}
      />
      <BtnAboutArticle
        onClick={() => {
          HandleShowReplyComment(item.id, item)
        }}
        label={`Répondre`}
        icons={<FiCornerUpLeft />}
      />
    </div>
  )
}
