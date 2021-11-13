import { useCases } from '../../config/deps'

export const LoginButton = () => (
  <button onClick={() => useCases.auth.logIn()}>Log in using Cognito</button>
)
