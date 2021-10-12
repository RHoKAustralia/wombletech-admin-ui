/* eslint-disable camelcase */
const convertTokenResponse = ({
  id_token,
  token_type,
  access_token,
  refresh_token,
  expires_in
}) => ({
  id: id_token,
  access: access_token,
  refresh: refresh_token,
  expireAt: Date.now() + expires_in * 1000
})

const convertUserInfoResponse = ({ email }) => ({ email })

const okResponseJsonElse = (defaultReturn = {}) => response =>
  response.ok ? response.json() : defaultReturn
const okResponseJson = okResponseJsonElse()

const AuthConnector = ({
  loginUrl,
  logInByCode,
  refresh,
  userInfo,
  logoutUrl
}) => ({
  loginUrl: (state, codeChallenge) => loginUrl(state, codeChallenge),

  logInByCode: (code, codeVerifier) =>
    logInByCode(code, codeVerifier)
      .then(okResponseJson)
      .then(convertTokenResponse),

  refresh: token =>
    refresh(token)
      .then(okResponseJson)
      .then(convertTokenResponse),

  userInfo: token =>
    userInfo(token)
      .then(okResponseJson)
      .then(convertUserInfoResponse),

  logoutUrl: () => logoutUrl()
})

export { AuthConnector }
