
const Donations = (wombleClient) => ({
  list: () => wombleClient.listDonations(),
  details: id => wombleClient.getDonation(id)
})

export { Donations }
