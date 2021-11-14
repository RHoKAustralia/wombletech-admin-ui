import { Donation, WombleClient } from "../data"

const Donations = (wombleClient: WombleClient) => ({
  list: () => wombleClient.listDonations(),
  details: (id: string) => wombleClient.getDonation(id),
  submit: (submission: Donation) => wombleClient.postDonation(submission)
})

export { Donations }
