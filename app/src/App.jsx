import './App.css'

import { useCases } from './config/deps'
import { DonationList } from './presentation'

function App () {
  return (
    <div className='App'>
      <DonationList donations={useCases.donationList()} />
    </div>
  )
}

export default App
