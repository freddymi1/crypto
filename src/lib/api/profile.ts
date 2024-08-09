import { Profile } from '@/interfaces/profile'

export async function getMyProfile(): Promise<Profile> {
  const res = await fetch(`${process.env.API_URL}/users/me`)
  let raw = await res.json()
  const data: Profile = {
    id: raw.id,
    email: raw.email,
    username: raw.username,
    role: raw.role,
    profilePicture: raw.profile_picture
  }
  return data
}
