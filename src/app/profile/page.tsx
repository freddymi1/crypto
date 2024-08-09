import AuthorizerWrapper from '@/components/authorization-wrapper/authorization-wrapper'
import ClientProfile from '@/components/client-profile/client-profile'

export async function generateMetadata() {
  return {
    title: 'Profil du client',
    description: 'Profil du client'
  }
}

async function Profile() {
  return (
    <AuthorizerWrapper>
      <ClientProfile />
    </AuthorizerWrapper>
  )
}

export default Profile
