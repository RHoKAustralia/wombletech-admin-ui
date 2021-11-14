import fetch from 'isomorphic-fetch'
import { IAuthClient } from './IAuthClient'

const config = {
  subdomain: undefined as unknown as string,
  region: undefined as unknown as string,
  clientId: undefined as unknown as string,
  scope: undefined as unknown as string
}

const baseUrl = () =>
  `https://${config.subdomain}.auth.${config.region}.amazoncognito.com`

const mapToQuery = (struct: any) =>
  Object.entries(struct)
    .map(kv => `${kv[0]}=${kv[1]}`)
    .join('&')

const ownUrl = () => window.location.origin

const tokenRequest = (bodyOptions: any) =>
  fetch(`${baseUrl()}/oauth2/token`, {
    method: 'POST',
    headers: new global.Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: mapToQuery({
      client_id: config.clientId,
      ...bodyOptions
    })
  })

const tokenForCode = (code: string, codeVerifier: string) => {
  return tokenRequest({
    redirect_uri: ownUrl(),
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier
  })
}

const tokenForRefreshToken = (token: string) =>
  tokenRequest({
    grant_type: 'refresh_token',
    refresh_token: token
  })

class CognitoClient implements IAuthClient  {

  constructor ({ apiSubDomain, awsRegion, cognitoClientId, scope }: {
    apiSubDomain: string,
    awsRegion: string,
    cognitoClientId: string,
    scope: string
  }) {
  config.subdomain = apiSubDomain
  config.region = awsRegion
  config.clientId = cognitoClientId
  config.scope = scope
  }

  loginUrl = (state: string, codeChallenge: string) => {
    const query = mapToQuery({
      response_type: 'code',
      client_id: config.clientId,
      scope: config.scope,
      redirect_uri: ownUrl(),
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    })
    return `${baseUrl()}/login?${query}`
  }

  logInByCode = (code: string, codeVerifier: string) => (code
    ? tokenForCode(code, codeVerifier)
    : Promise.reject(
      new Error('Need code')
    )
  )

  refresh = (token: string) => (token
    ? tokenForRefreshToken(token)
    : Promise.reject(
      new Error('Need token')
    ))

  userInfo = (token: string) =>
    fetch(`${baseUrl()}/oauth2/userInfo`, {
      headers: new global.Headers({
        Authorization: `Bearer ${token}`
      })
    })

  logoutUrl = () => {
    const query = mapToQuery({
      client_id: config.clientId,
      logout_uri: ownUrl()
    })
    return `${baseUrl()}/logout?${query}`
  }
}

export { CognitoClient }
