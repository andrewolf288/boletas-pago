import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { alertError, alertSuccess, alertWarning } from '../../../utils'
import axios from 'axios'
import { useGeolocation } from './useGeolocation'

export function useViewControllerVoucher () {
  const parsed = queryString.parse(location.search)
  const [voucher, setVoucher] = useState(null)
  const [reviewedVoucher, setReviewedVoucher] = useState(false)
  const [flagLoading, setFlagLoading] = useState(false)
  const [flagVerification, setFlagVerification] = useState(false)
  const [documentPassword, setDocumentPassword] = useState('')
  const { locationGPS, getLocation } = useGeolocation()

  // datos del campo de autenticacion
  const onChangeDocumentPassword = ({ target }) => {
    const { value } = target
    setDocumentPassword(value)
  }

  // datos del estado de la autenticacion

  const verifyDocumentAuthentication = async () => {
    const regex = /^\d+$/
    if (documentPassword.length >= 8 && regex.test(documentPassword)) {
      setFlagLoading(true)
      const BASE_URL = import.meta.env.VITE_APP_DOMAIN
      const URL = `${BASE_URL}control/voucher/getVoucherByToken/`
      const formatData = {
        token: parsed.token,
        document: documentPassword
      }
      try {
        const resultRequest = await axios.post(URL, formatData)
        setVoucher(resultRequest.data)
        setFlagVerification(true)

        const now = new Date()
        setDataValidationSession({
          ...dataValidationSession,
          datetimeStartSession: now,
          latitude: locationGPS.latitude ? locationGPS.latitude : null,
          longitude: locationGPS.longitude ? locationGPS.longitude : null
        })
      } catch (error) {
        const { response } = error
        if (response.status === 401) {
          alertWarning('Credenciales incorrectas')
        } else if (response.status === 410) {
          alertWarning('El recurso ya no esta disponible. La boleta ya fué verificada')
          setFlagVerification(true)
          setReviewedVoucher(true)
        } else {
          alertWarning(response.data.detail)
        }
      } finally {
        setFlagLoading(false)
      }
    } else {
      alertWarning('El formato de crendencial es incorrecto')
    }
  }

  // datos recolectados del cliente
  const [dataValidationSession, setDataValidationSession] = useState({
    datetimeStartSession: null,
    datetimeEndSession: null,
    downloadPDF: false
  })
  const onChangeFlagDownloadPDF = () => {
    setDataValidationSession({
      ...dataValidationSession,
      downloadPDF: true
    })
  }

  const registerInformationValidation = async () => {
    setFlagLoading(true)
    const now = new Date()
    const auxDataValidation = {
      ...dataValidationSession,
      datetimeEndSession: now,
      idVoucher: voucher.id
    }

    const BASE_URL = import.meta.env.VITE_APP_DOMAIN
    const URL = `${BASE_URL}control/voucher/verifyVoucherByToken/`
    try {
      await axios.post(URL, auxDataValidation)
      alertSuccess('Verificación completada satisfactoriamente')
      setReviewedVoucher(true)
    } catch (error) {
      const { response } = error
      alertError(response.data.detail)
    } finally {
      setFlagLoading(false)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return {
    flagLoading,
    reviewedVoucher,
    voucher,
    flagVerification,
    verifyDocumentAuthentication,
    documentPassword,
    onChangeDocumentPassword,
    onChangeFlagDownloadPDF,
    registerInformationValidation
  }
}
