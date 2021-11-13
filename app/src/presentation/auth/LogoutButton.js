import { useState } from 'react'
import { useCases } from '../../config/deps'

import './logoutButton.css'

export const LogoutButton = () => {
  const [email, setEmail] = useState()

  const fetchEmail = async () => {
    const info = await useCases.auth.getUserInfo()
    setEmail(info.email)
  }
  fetchEmail()

  return (
    <span className='infoLogout'>
      <span>{email ? `Logged in as ${email}` : ''}</span>
      <button onClick={() => { useCases.auth.logOut() }}>Log out</button>
    </span>
  )
}
