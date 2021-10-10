const displayable = ({ expiresAt, willRefresh }) => ({
  expiresAt: new Date(expiresAt).toLocaleString(),
  willRefresh
})

const GetSessionInfo = tokenStatus => () => displayable(tokenStatus())
const GetUserInfo = userInfo => () => userInfo()

const LogIn = loginUrl => async () => { window.location = await loginUrl() }
const LogInByCode = logInByCode => (code, state) => logInByCode(code, state)
const LogOut = logoutUrl => () => { window.location = logoutUrl() }
const LoggedIn = hasSession => () => hasSession()

export { GetSessionInfo, GetUserInfo, LogIn, LogInByCode, LogOut, LoggedIn }
