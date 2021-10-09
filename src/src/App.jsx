import './App.css'

import { DonationList } from './presentation'

function App () {
  return (
    <div className='App'>
      <DonationList donations={[
        {
          id: '17',
          status: 'accepted',
          donor: 'Anja',
          description: 'laptop',
          date: '19/9/2021',
          itemCount: 1
        },
        {
          id: '23',
          status: 'accepted',
          donor: 'Anja',
          description: 'laptop',
          date: '19/9/2021',
          itemCount: 1
        }
      ]}
      />
    </div>
  )
}

export default App
