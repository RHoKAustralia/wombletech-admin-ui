import { IAuthClient } from './IAuthClient'
import { okResponseJson } from './utility'

/* eslint-disable camelcase */
const convertTokenResponse = ({
  id_token,
  token_type,
  access_token,
  refresh_token,
  expires_in
}: {
  id_token: string,
  token_type: string,
  access_token: string,
  refresh_token: string,
  expires_in: number
}) => ({
  id: id_token,
  access: access_token,
  refresh: refresh_token,
  expireAt: Date.now() + expires_in * 1000
})

const convertUserInfoResponse = ({ email } : { email: string }) => ({ email })

class AuthConnector {

  private authClient: IAuthClient

  constructor(authClient: IAuthClient) {
    this.authClient = authClient;
  }

  loginUrl = (state: string, codeChallenge: string) => this.authClient.loginUrl(state, codeChallenge)

  logInByCode = (code: string, codeVerifier: string) =>
    this.authClient.logInByCode(code, codeVerifier)
      .then(okResponseJson)
      .then(convertTokenResponse)

  refresh = (token: string) =>
    this.authClient.refresh(token)
      .then(okResponseJson)
      .then(convertTokenResponse)

  userInfo = (token: string) =>
    this.authClient.userInfo(token)
      .then(okResponseJson)
      .then(convertUserInfoResponse)

  logoutUrl = () => this.authClient.logoutUrl()
}

export { AuthConnector }
