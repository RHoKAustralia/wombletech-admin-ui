import { useEffect } from 'react'
import { useCases } from 'config/deps'
import { DonationList, Header } from './presentation'

import './index.css'

const codeFromUrl = () => new URL(window.location).searchParams.get('code')
const stateFromUrl = () => new URL(window.location).searchParams.get('state')

const removeCodeFromUrl = () => {
  window.history.replaceState({}, window.title, window.location.origin)
}

const tryLogin = async () => {
  const code = codeFromUrl()
  if (code) {
    const state = stateFromUrl()
    try {
      await useCases.auth.logInByCode(code, state)
      removeCodeFromUrl()
    } catch (e) {}
  }
}

const App = () => {
  useEffect(tryLogin)

  return (
    <div className='App'>
      <Header />
      {useCases.auth.loggedIn() ? <DonationList /> : null}
    </div>
  )
}

export default App
