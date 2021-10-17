import { useEffect, useState } from 'react'
import { useCases } from 'config/deps'
import { DonationList, Header } from './presentation'

import './index.css'
import { DonationSubmit } from 'presentation/DonationSubmit'

const codeFromUrl = () => new URL(window.location).searchParams.get('code')
const stateFromUrl = () => new URL(window.location).searchParams.get('state')

const removeCodeFromUrl = () => {
  window.history.replaceState({}, window.title, window.location.origin)
}

const tryLogin = async (setLoggedIn) => {
  const code = codeFromUrl()
  if (code) {
    const state = stateFromUrl()
    try {
      await useCases.auth.logInByCode(code, state)
      removeCodeFromUrl()
      setLoggedIn(useCases.auth.loggedIn())
    } catch (e) {}
  }
}

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  useEffect(() => tryLogin(setLoggedIn), [])

  return (
    <div className='App'>
      <Header />
      {isLoggedIn ? <DonationList /> : <DonationSubmit />}
    </div>
  )
}

export default App
