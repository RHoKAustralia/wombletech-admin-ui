import { useCases } from '../../config/deps'
import { LoginButton } from './LoginButton'
import { LogoutButton } from './LogoutButton'

const AuthButton = () => (
  useCases.auth.loggedIn() ? <LogoutButton /> : <LoginButton />
)

export { AuthButton }
