import { generateNonce, base64URLEncode, sha256 } from '../lib'

const cache = {
  tokens: {
    id: undefined,
    access: undefined,
    refresh: undefined,
    expireAt: undefined
  },
  userInfo: {
    email: process.env.NODE_ENV === 'developmentx' ? 'dev-mode' : undefined
  }
}

const tokenRefreshWindowSizeMillis = 10 * 60 * 1000

const tokensNeedRefresh = () =>
  Date.now() > cache.tokens.expireAt - tokenRefreshWindowSizeMillis

const tokenStatus = () => ({
  expiresAt: cache.tokens.expireAt,
  willRefresh: Boolean(cache.tokens.refresh)
})

const Session = ({
  loginUrl,
  logInByCode,
  refresh,
  userInfo,
  logoutUrl,
  log
}) => {
  const refreshTokens = () =>
    refresh(cache.tokens.refresh).then(onReceivedTokens)

  const getToken = () =>
    tokensNeedRefresh()
      ? refreshTokens().then(() => cache.tokens.access)
      : Promise.resolve(cache.tokens.access)

  const onReceivedTokens = tokens => {
    cache.tokens = { ...cache.tokens, ...tokens }
    log.debug(cache.tokens)
    return tokenStatus()
  }

  const onReceivedUserInfo = info => {
    cache.userInfo = { ...cache.userInfo, ...info }
    log.debug(cache.userInfo)
    return cache.userInfo
  }

  return {
    hasSession: () =>
      process.env.NODE_ENV === 'developmentx' ? true : Boolean(cache.tokens.id),

    getToken,
    tokenStatus,

    loginUrl: async () => {
      const state = await generateNonce()
      const codeVerifier = await generateNonce()
      sessionStorage.setItem(`cognito-codeVerifier-${state}`, codeVerifier)
      const codeChallenge = base64URLEncode(await sha256(codeVerifier))

      return loginUrl(state, codeChallenge)
    },
    logoutUrl,

    logInByCode: (code, state) => {
      const codeVerifier = sessionStorage.getItem(`cognito-codeVerifier-${state}`)
      sessionStorage.removeItem(`cognito-codeVerifier-${state}`)

      return logInByCode(code, codeVerifier).then(onReceivedTokens)
    },

    userInfo: () =>
      cache.userInfo.email
        ? Promise.resolve(cache.userInfo)
        : getToken()
          .then(token => userInfo(token))
          .then(onReceivedUserInfo)
  }
}

export { Session }
