import { useEffect, useState } from 'react'
import { forwardEmailVoucher, getRemunerationsWithDetalle } from '../services'
import { useParams } from 'react-router-dom'
import { alertError, alertSuccess } from '../../../utils'

export function useViewRemuneration () {
  const { idRemuneration } = useParams()
  const [remuneration, setremuneration] = useState(null)
  const [flagLoading, setFlagLoading] = useState(false)

  const traerInformacionRemuneracionDetalles = async () => {
    setFlagLoading(true)
    try {
      const { data } = await getRemunerationsWithDetalle(idRemuneration)
      setremuneration(data)
    } catch (error) {
      console.log(error)
    } finally {
      setFlagLoading(false)
    }
  }

  const onForwardEmailVoucher = async (voucher) => {
    setFlagLoading(true)
    try {
      const { data } = await forwardEmailVoucher(voucher.id)
      alertSuccess(data.detail)
      traerInformacionRemuneracionDetalles()
    } catch (error) {
      const { response } = error
      alertError(response.data.detail)
    } finally {
      setFlagLoading(false)
    }
  }

  useEffect(() => {
    traerInformacionRemuneracionDetalles()
  }, [])

  return {
    flagLoading,
    remuneration,
    onForwardEmailVoucher
  }
}
