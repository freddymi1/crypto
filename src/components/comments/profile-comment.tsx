import React from 'react'
import styles from './comments.module.css'
import { BiTime } from 'react-icons/bi'
import { Comment } from '@/interfaces/comment'
import { FormatDateMobile, FormatDateWeb } from '@/utils/moment'

interface ProfileCommentProps {
  item: Comment | any
}

export const ProfileComment: React.FC<ProfileCommentProps> = ({ item }) => {
  const postedDate = new Date(item.creationDatetime)
  return (
    <div className={`${styles.avatarCom}`}>
      <div className={`flex ${styles.profilAvatar}`}>
        {item.author && item.author.profilePicture === null ? (
          <h3 className={`m-0 ${styles.avatarTitle} uppercase`}>
            {item.author.username.slice(0, 1)}
          </h3>
        ) : (
          <img
            src={item.author && item.author.profilePicture}
            className="rounded-full"
            alt={`Photo-${item.author && item.author.username}`}
          />
        )}
      </div>
      <div className="block ml-2">
        <label htmlFor="" className={`cursor-pointer ${styles.userComment}`}>
          {item.author && item.author.username}
        </label>
        <label htmlFor="" className="flex items-center">
          <BiTime size="1.3em" />

          <span className="ml-2 hidden lg:flex">
            {FormatDateWeb(postedDate)}
          </span>
          <span className="ml-2 flex lg:hidden">
            {FormatDateMobile(postedDate)}
          </span>
        </label>
      </div>
    </div>
  )
}
