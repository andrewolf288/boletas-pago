import { client } from '../../../services'

export const listRemunerations = () => {
  const URL = 'control/remuneration'
  return client.get(URL)
}

export const getRemunerationsWithDetalle = (id) => {
  const URL = `control/remuneration/${id}`
  return client.get(URL)
}
