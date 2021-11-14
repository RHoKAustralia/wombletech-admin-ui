export interface IAuthClient {
  loginUrl: (state: string, codeChallenge: string) => string;

  logInByCode: (code: string, codeVerifier: string) => any;

  refresh: (token: string) => any;

  userInfo: (token: string) => any;

  logoutUrl: () => string;
}