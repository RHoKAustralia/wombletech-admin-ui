const displayable = ({ expiresAt, willRefresh }) => ({
  expiresAt: new Date(expiresAt).toLocaleString(),
  willRefresh
})

const GetSessionInfo = tokenStatus => () => displayable(tokenStatus())
const GetUserInfo = userInfo => () => userInfo()

const LogIn = loginUrl => () => { window.location = loginUrl() }
const LogInByCode = logInByCode => code => logInByCode(code)
const LogOut = logoutUrl => () => { window.location = logoutUrl() }
const LoggedIn = hasSession => () => hasSession()

export { GetSessionInfo, GetUserInfo, LogIn, LogInByCode, LogOut, LoggedIn }
