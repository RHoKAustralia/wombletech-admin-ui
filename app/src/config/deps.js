import {
  LogIn,
  LogInByCode,
  LoggedIn,
  GetSessionInfo,
  GetUserInfo,
  LogOut
} from '../presentation/auth/useCases'
import { Donations, Session } from '../domain'
import { AuthConnector, CognitoClient, WombleClient } from '../data'

const log = {
  debug: process.env.NODE_ENV === 'development' ? console.log : () => {},
  info: console.log
}

// Auth
const cognitoClient = CognitoClient({
  apiSubDomain: 'wombletech-rhok',
  awsRegion: 'ap-southeast-2',
  cognitoClientId: '1omq88dvrudfhtm0f8nt7et16d',
  scope: 'admin-ui/admin openid'
})

const authConnector = AuthConnector({
  loginUrl: cognitoClient.loginUrl,
  logInByCode: cognitoClient.logInByCode,
  refresh: cognitoClient.refresh,
  userInfo: cognitoClient.userInfo,
  logoutUrl: cognitoClient.logoutUrl
})

const session = Session({
  loginUrl: authConnector.loginUrl,
  logInByCode: authConnector.logInByCode,
  refresh: authConnector.refresh,
  userInfo: authConnector.userInfo,
  logoutUrl: authConnector.logoutUrl,
  log
})

// WombleTech API

const wombleClient = WombleClient({
  getToken: session.getToken
})

// WombleTech Domain

const donations = Donations(wombleClient)

// Use Cases

const useCases = {
  auth: {
    logIn: LogIn(session.loginUrl),
    logInByCode: LogInByCode(session.logInByCode),
    loggedIn: LoggedIn(session.hasSession),
    getSessionInfo: GetSessionInfo(session.tokenStatus),
    getUserInfo: GetUserInfo(session.userInfo),
    logOut: LogOut(session.logoutUrl)
  },

  donationList: () => donations.list(),
  donationDetails: id => donations.details(id)
}

export { log, useCases }
