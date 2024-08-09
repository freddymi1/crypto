import { UUID } from 'crypto'

export type ProfileFromApi = {
  email: string
  username: string
  role: string
  profile_picture: string
  id: UUID
}

export type Profile = {
  email: string
  username: string
  role: string
  profilePicture: string
  id: UUID
}
