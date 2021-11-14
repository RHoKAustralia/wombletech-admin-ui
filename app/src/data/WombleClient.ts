import fetch from 'isomorphic-fetch'
import { okResponseJson } from './utility'

export type Donation = {
  donationId: string;
  active: boolean;
  name: string;
  email: string;
  phoneNumber: string;
  suburb: string;
  region: string;
  donationType: string;
  description: string;
  submitDate?: string;
};

const config = {
  apiHost: undefined as unknown as string,
  apiBasePath: undefined as unknown as string
}

const apiUrl = () => (`https://${config.apiHost}/${config.apiBasePath}`)

const listDonations = (token: string) => (
  fetch(`${apiUrl()}/donation`, {
    method: 'GET',
    headers: new global.Headers({
      Authorization: token,
      Accept: 'application/json'
    })
  })
)

const getDonation = (token: string) => (id: string) => (
  fetch(`${apiUrl()}/donation/${id}`, {
    method: 'GET',
    headers: new global.Headers({
      Authorization: token,
      Accept: 'application/json'
    })
  })
)

const postDonation = (submission: Donation) => (
  fetch(`${apiUrl()}/donation`, {
    method: 'POST',
    headers: new global.Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(submission)
  })
)

class WombleClient {

  getToken: any

  constructor ({getToken, apiHost, apiBasePath} :
    {
      getToken: any,
      apiHost: string,
      apiBasePath: string
    }) {
      config.apiHost = apiHost
      config.apiBasePath = apiBasePath
      this.getToken = getToken
  }

  listDonations = () => {
    return this.getToken()
      .then(listDonations)
      .then(okResponseJson)
  }

  getDonation = (id: string) => {
    return this.getToken()
      .then(getDonation(id))
      .then(okResponseJson)
  }

  postDonation = (submission: Donation) => {
    return postDonation(submission)
      .then(okResponseJson)
  }
}

export { WombleClient }
