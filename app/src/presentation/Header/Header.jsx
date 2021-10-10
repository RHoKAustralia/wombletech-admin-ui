import { AuthButton } from '../auth'

import './style.css'

const Header = props => (
  <header>
    <span className='title'>WombleTech Admin</span>
    <AuthButton />
  </header>
)

export { Header }
