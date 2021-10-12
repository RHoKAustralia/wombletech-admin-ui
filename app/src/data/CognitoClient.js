import fetch from 'isomorphic-fetch'

const config = {
  subdomain: undefined,
  region: undefined,
  clientId: undefined,
  scope: undefined
}

const baseUrl = () =>
  `https://${config.subdomain}.auth.${config.region}.amazoncognito.com`

const mapToQuery = struct =>
  Object.entries(struct)
    .map(kv => `${kv[0]}=${kv[1]}`)
    .join('&')

const ownUrl = () => window.location.origin

const tokenRequest = bodyOptions =>
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

const tokenForCode = (code, codeVerifier) => {
  return tokenRequest({
    redirect_uri: ownUrl(),
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier
  })
}

const tokenForRefreshToken = token =>
  tokenRequest({
    grant_type: 'refresh_token',
    refresh_token: token
  })

const CognitoClient = ({ apiSubDomain, awsRegion, cognitoClientId, scope }) => {
  config.subdomain = apiSubDomain
  config.region = awsRegion
  config.clientId = cognitoClientId
  config.scope = scope

  return {
    loginUrl: (state, codeChallenge) => {
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
    },

    logInByCode: (code, codeVerifier) => (code
      ? tokenForCode(code, codeVerifier)
      : Promise.reject(
        new Error('Need code')
      )
    ),

    refresh: token => (token
      ? tokenForRefreshToken(token)
      : Promise.reject(
        new Error('Need token')
      )),

    userInfo: token =>
      fetch(`${baseUrl()}/oauth2/userInfo`, {
        headers: new global.Headers({
          Authorization: `Bearer ${token}`
        })
      }),

    logoutUrl: () => {
      const query = mapToQuery({
        client_id: config.clientId,
        logout_uri: ownUrl()
      })
      return `${baseUrl()}/logout?${query}`
    }
  }
}

export { CognitoClient }
