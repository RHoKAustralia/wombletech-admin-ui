import {
  LogIn,
  LogInByCode,
  LoggedIn,
  GetSessionInfo,
  GetUserInfo,
  LogOut
} from '../presentation/authUseCases'
import { Donations, Session } from '../domain'
import { AuthConnector, CognitoClient } from '../data'

const log = {
  debug: process.env.NODE_ENV === 'development' ? console.log : () => {},
  info: console.log
}

// Auth

const cognitoClient = CognitoClient({
  apiSubDomain: 'wombletech-rhok',
  awsRegion: 'ap-southeast-2',
  cognitoClientId: '4ogoetfv2qukfsvmpb471s4s56'
})

const authConnector = AuthConnector({
  loginUrl: cognitoClient.loginUrl,
  logInByCode: cognitoClient.logInByCode,
  refresh: cognitoClient.refresh,
  userInfo: cognitoClient.userInfo,
  logoutUrl: cognitoClient.logoutUrl
})

// Domain

const session = Session({
  loginUrl: authConnector.loginUrl,
  logInByCode: authConnector.logInByCode,
  refresh: authConnector.refresh,
  userInfo: authConnector.userInfo,
  logoutUrl: authConnector.logoutUrl,
  log
})

const donations = Donations()

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
