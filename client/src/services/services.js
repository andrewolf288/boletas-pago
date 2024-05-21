import { client } from './axiosClient'

export function login ({ username, password }) {
  return client.post(
    'token/',
    { username, password },
    { authorization: false }
  )
}

export function testApi () {
  return client.get(
    'test/'
  )
}
