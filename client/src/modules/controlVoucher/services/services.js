import { client } from '../../../services'

export const viewVoucherController = (token) => {
  const URL = `control/voucher/getVoucherByToken?token=${token}`
  return client.get(URL)
}
