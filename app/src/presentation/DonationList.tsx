import { useState, useEffect } from 'react'
import { useCases } from '../config/deps'
import { Donation } from '../data'
import { DonationSummaryRow } from './DonationSummaryRow'

// import './style.css';

const listDonations = async (setDonations: any) => {
  const list = await useCases.donationList()
  setDonations(list.items ?? [])
}

const DonationList = () => {
  const [donations, setDonations] = useState<Donation[]>([])
  useEffect(() => {
    listDonations(setDonations)
  }, [])

  return (
    <div>
      <h1>List of donations</h1>
      {donations.map(it => (
        <DonationSummaryRow key={it.donationId} {...it} />
      ))}
    </div>
  )
}

export { DonationList }
