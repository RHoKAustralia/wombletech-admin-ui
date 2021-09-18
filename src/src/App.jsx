import logo from './logo.svg';
import './App.css';

import { DonationList } from './presentation'

function App() {
  return (
    <div className="App">
      <DonationList donations={['a', 'b', 'c']}/>
    </div>
  );
}

export default App;
