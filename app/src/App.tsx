import { useEffect, useState } from 'react'
import { useCases } from './config/deps'
import { DonationList, Header, DonationSubmit } from './presentation'
import './App.css';

const codeFromUrl = () => new URL(window.location.toString()).searchParams.get('code');
const stateFromUrl = () => new URL(window.location.toString()).searchParams.get('state');

const removeCodeFromUrl = () => {
  window.history.replaceState({}, window.document.title, window.location.origin);
}

const tryLogin = async (setLoggedIn: any) => {
  const code = codeFromUrl();
  if (code) {
    const state = stateFromUrl();
    try {
      await useCases.auth.logInByCode(code, state);
      removeCodeFromUrl();
      setLoggedIn(useCases.auth.loggedIn());
    } catch (e) {}
  }
}

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    tryLogin(setLoggedIn);
  }, [])

  return (
    <div className='App'>
      <Header />
      {isLoggedIn ? <DonationList /> : <DonationSubmit />}
    </div>
  );
}

export default App;
