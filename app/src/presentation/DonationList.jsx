import { useCases } from 'config/deps'
import { DonationSummaryRow } from './DonationSummaryRow'

// import './style.css';

const DonationList = () => (
  <div>
    <h1>List of donations</h1>
    {useCases.donationList().map(it => (
      <DonationSummaryRow key={it.id} {...it} />
    ))}
  </div>
)

export { DonationList }
