import {
  LogIn,
  LogInByCode,
  LoggedIn,
  GetSessionInfo,
  GetUserInfo,
  LogOut
} from '../presentation/auth/useCases'
import { Donations, Session } from '../domain'
import { AuthConnector, CognitoClient, Donation, WombleClient } from '../data'

const log = {
  debug: process.env.NODE_ENV === 'development' ? console.log : () => {},
  info: console.log
}

// Auth
const cognitoClient = new CognitoClient({
  apiSubDomain: 'wombletech-rhok',
  awsRegion: 'ap-southeast-2',
  cognitoClientId: '1omq88dvrudfhtm0f8nt7et16d',
  scope: 'admin-ui/admin openid'
})

const authConnector = new AuthConnector(cognitoClient)

const session = new Session({
  loginUrl: authConnector.loginUrl,
  logInByCodeAndVerifier: authConnector.logInByCode,
  refresh: authConnector.refresh,
  userInfoByToken: authConnector.userInfo,
  logoutUrl: authConnector.logoutUrl,
  log
})

// WombleTech API

const wombleClient = new WombleClient({
  getToken: session.getToken,
  apiHost: '0bs98g9c51.execute-api.ap-southeast-2.amazonaws.com',
  apiBasePath: 'test'
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
  donationDetails: (id: string) => donations.details(id),
  donationSubmit: (submission: Donation) => donations.submit(submission)
}

export { log, useCases }
