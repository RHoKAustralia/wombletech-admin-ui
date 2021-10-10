import { useCases } from 'config/deps'
import { DonationList, Header } from './presentation'

import './index.css'

const App = () => (
  <div className='App'>
    <Header />
    {useCases.auth.loggedIn() ? <DonationList /> : null}
  </div>
)

export default App
