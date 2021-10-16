import fetch from 'isomorphic-fetch'
import { okResponseJson } from "./utility"

const config = {
  apiHost: undefined,
  apiBasePath: undefined
}

const apiUrl = () => (`https://${config.apiHost}/${config.apiBasePath}`)

const listDonations = (token) => (
  fetch(`${apiUrl()}/donation`, {
    method: 'GET',
    headers: new global.Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    })
  })
)

const getDonation = (token) => (id) => (
  fetch(`${apiUrl()}/donation/${id}`, {
    method: 'GET',
    headers: new global.Headers({
      'Authorization': token,
      'Content-Type': 'application/json'
    })
  })
)

function WombleClient({ getToken, apiHost, apiBasePath }) {
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
    }
  };
}

export { WombleClient }
