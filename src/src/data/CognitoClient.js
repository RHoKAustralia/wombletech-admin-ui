import fetch from 'isomorphic-fetch'

const config = {
  subdomain: undefined,
  region: undefined,
  clientId: undefined
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
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: mapToQuery({
      client_id: config.clientId,
      ...bodyOptions
    })
  })

const tokenForCode = code =>
  tokenRequest({
    redirect_uri: ownUrl(),
    grant_type: 'authorization_code',
    code
  })
const tokenForRefreshToken = token =>
  tokenRequest({
    grant_type: 'refresh_token',
    refresh_token: token
  })

const CognitoClient = ({ apiSubDomain, awsRegion, cognitoClientId }) => {
  config.subdomain = apiSubDomain
  config.region = awsRegion
  config.clientId = cognitoClientId

  return {
    loginUrl: () => {
      const query = mapToQuery({
        response_type: 'code',
        client_id: config.clientId,
        redirect_uri: ownUrl()
      })
      return `${baseUrl()}/login?${query}`
    },

    logInByCode: code => (code ? tokenForCode(code) : Promise.reject()),

    refresh: token => (token ? tokenForRefreshToken(token) : Promise.reject()),

    userInfo: token =>
      fetch(`${baseUrl()}/oauth2/userInfo`, {
        headers: new Headers({
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
