import fetch from 'isomorphic-fetch'
import { okResponseJson } from './utility'

const config = {
  apiHost: undefined,
  apiBasePath: undefined
}

const apiUrl = () => (`https://${config.apiHost}/${config.apiBasePath}`)

const listDonations = (token) => (
  fetch(`${apiUrl()}/donation`, {
    method: 'GET',
    headers: new global.Headers({
      Authorization: token,
      Accept: 'application/json'
    })
  })
)

const getDonation = (token) => (id) => (
  fetch(`${apiUrl()}/donation/${id}`, {
    method: 'GET',
    headers: new global.Headers({
      Authorization: token,
      Accept: 'application/json'
    })
  })
)

const postDonation = (submission) => (
  fetch(`${apiUrl()}/donation`, {
    method: 'POST',
    headers: new global.Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(submission)
  })
)

function WombleClient ({ getToken, apiHost, apiBasePath }) {
  config.apiHost = apiHost
  config.apiBasePath = apiBasePath
  return {
    listDonations: () => {
      return getToken()
        .then(listDonations)
        .then(okResponseJson)
    },
    getDonation: (id) => {
      return getToken()
        .then(getDonation(id))
        .then(okResponseJson)
    },
    postDonation: (submission) => {
      return postDonation(submission)
        .then(okResponseJson)
    }
  }
}

export { WombleClient }
