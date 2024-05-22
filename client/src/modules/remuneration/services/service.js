import { client } from '../../../services'

export const listRemunerations = () => {
  const URL = 'control/remuneration'
  return client.get(URL)
}
