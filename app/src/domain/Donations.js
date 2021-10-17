
const Donations = (wombleClient) => ({
  list: () => wombleClient.listDonations(),
  details: id => wombleClient.getDonation(id),
  submit: submission => wombleClient.postDonation(submission)
})

export { Donations }
