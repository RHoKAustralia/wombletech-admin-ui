import { generateNonce, base64URLEncode, sha256 } from '../lib'

const cache = {
  tokens: {
    id: undefined,
    access: undefined,
    refresh: undefined,
    expireAt: 0
  },
  userInfo: {
    email: undefined
  }
}

const tokenRefreshWindowSizeMs = 10 * 60 * 1000

const tokensNeedRefresh = () =>
  Date.now() > cache.tokens.expireAt - tokenRefreshWindowSizeMs

const tokenStatus = () => ({
  expiresAt: cache.tokens.expireAt,
  willRefresh: Boolean(cache.tokens.refresh)
})

class Session {

  private log: any;
  private refresh: any;
  private logInByCodeAndVerifier: any;
  private userInfoByToken: any;
  private getLoginUrl: any;
  private getLogoutUrl: any;

  constructor({
  loginUrl,
  logInByCodeAndVerifier,
  refresh,
  userInfoByToken,
  logoutUrl,
  log
}: {
  loginUrl: any,
  logInByCodeAndVerifier: any,
  refresh: any,
  userInfoByToken: any,
  logoutUrl: any,
  log: any
}) {
  this.getLoginUrl = loginUrl;
  this.logInByCodeAndVerifier = logInByCodeAndVerifier;
  this.refresh = refresh;
  this.userInfoByToken = userInfoByToken;
  this.getLogoutUrl = logoutUrl;
  this.log = log;
  }

  private refreshTokens = () =>
    this.refresh(cache.tokens.refresh).then(this.onReceivedTokens)

  getToken = () =>
    tokensNeedRefresh()
      ? this.refreshTokens().then(() => cache.tokens.access)
      : Promise.resolve(cache.tokens.access)

  private onReceivedTokens = (tokens: any) => {
    cache.tokens = { ...cache.tokens, ...tokens }
    this.log.debug(cache.tokens)
    return tokenStatus()
  }

  private onReceivedUserInfo = (info: any) => {
    cache.userInfo = { ...cache.userInfo, ...info }
    this.log.debug(cache.userInfo)
    return cache.userInfo
  }

  hasSession = () => Boolean(cache.tokens.id)

  tokenStatus = () => tokenStatus()

  loginUrl = async () => {
    const state = await generateNonce()
    const codeVerifier = await generateNonce()
    sessionStorage.setItem(`cognito-codeVerifier-${state}`, codeVerifier)
    const codeChallenge = base64URLEncode(await sha256(codeVerifier))

    return this.getLoginUrl(state, codeChallenge)
  }

  logoutUrl = () => this.getLogoutUrl()

  logInByCode = (code: string, state: string) => {
    const codeVerifier = sessionStorage.getItem(`cognito-codeVerifier-${state}`)
    sessionStorage.removeItem(`cognito-codeVerifier-${state}`)

    return this.logInByCodeAndVerifier(code, codeVerifier).then(this.onReceivedTokens)
  }

  userInfo = () =>
    cache.userInfo.email
      ? Promise.resolve(cache.userInfo)
      : this.getToken()
        .then((token: string) => this.userInfoByToken(token))
        .then(this.onReceivedUserInfo)

}

export { Session }
