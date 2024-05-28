import { client } from '../../../services'

export const viewVoucherController = (data) => {
  const URL = 'control/voucher/getVoucherByToken/'
  return client.post(URL, data)
}
