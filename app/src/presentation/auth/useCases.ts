const displayable = ({ expiresAt, willRefresh }: {expiresAt: any, willRefresh: any}) => ({
  expiresAt: new Date(expiresAt).toLocaleString(),
  willRefresh
})

const GetSessionInfo = (tokenStatus: any) => () => displayable(tokenStatus())
const GetUserInfo = (userInfo: any) => () => userInfo()

const LogIn = (loginUrl: any) => async () => { window.location = await loginUrl() }
const LogInByCode = (logInByCode: any) => (code: any, state: any) => logInByCode(code, state)
const LogOut = (logoutUrl: any) => () => { window.location = logoutUrl() }
const LoggedIn = (hasSession: any) => () => hasSession()

export { GetSessionInfo, GetUserInfo, LogIn, LogInByCode, LogOut, LoggedIn }
