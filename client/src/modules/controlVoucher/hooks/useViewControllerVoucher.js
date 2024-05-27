import { useEffect, useState } from 'react'
import { viewVoucherController } from '../services'
import queryString from 'query-string'
import { alertWarning } from '../../../utils'

export function useViewControllerVoucher () {
  const parsed = queryString.parse(location.search)
  //   const [voucher, setVoucher] = useState({
  //     id: 0,
  //     worker: {
  //       id: 0,
  //       workerPosition: {
  //         description: ''
  //       },
  //       typeWorker: {
  //         description: ''
  //       },
  //       document: '',
  //       workRegime: '',
  //       specialSituation: '',
  //       pensionScheme: '',
  //       codeCUSPP: '',
  //       salary: '0.00',
  //       admissionDate: null,
  //       terminationDate: null,
  //       sede: '',
  //       costCenter: '',
  //       situation: '',
  //       hasChildren: false
  //     },
  //     creationDate: null,
  //     token: '',
  //     reviewed: false,
  //     reviewDate: null,
  //     fechaInicioVacaciones: null,
  //     fechaFinVacaciones: null,
  //     diasLaborados: 0,
  //     diasNoLaborados: 0,
  //     horasLaboradas: '',
  //     horasExtraSimples: '',
  //     horasExtrasDobles: '',
  //     bonificacionNocturna: '',
  //     diasFalta: 0,
  //     diasVacaciones: 0,
  //     diasDescansoMedico: 0,
  //     haberBasico: '0.00',
  //     asignacionFamiliar: '0.00',
  //     licenciaGoceHaber: '0.00',
  //     incapacidadEnfermedad: '0.00',
  //     hrsExtSimples25: '0.00',
  //     hrsExtSimples35: '0.00',
  //     diaDelTrabajador: '0.00',
  //     comisionDestajo: '0.00',
  //     gratificacion: '0.00',
  //     bonoExtraordinario: '0.00',
  //     cts: '0.00',
  //     vacaciones: '0.00',
  //     utilidad: '0.00',
  //     canastaVale: '0.00',
  //     premio: '0.00',
  //     snp: '0.00',
  //     afpFondo: '0.00',
  //     afpSeguro: '0.00',
  //     afpComision: '0.00',
  //     rtaStaCategoria: '0.00',
  //     adelantos: '0.00',
  //     esSaludVida: '0.00',
  //     tardanzaPermisosDescuentos: '0.00',
  //     inasistencia: '0.00',
  //     pagoGratificaciones: '0.00',
  //     pagoCTS: '0.00',
  //     pagoVacacionesBeneficios: '0.00',
  //     otrosDescuentos: '0.00',
  //     pagoUtilidad: '0.00',
  //     entCanastaVale: '0.00',
  //     esEssalud: '0.00',
  //     senati: '0.00',
  //     sctrSaludPension: '0.00',
  //     totalRemuneraciones: '0.00',
  //     totalDescuentos: '0.00',
  //     totalAportaciones: '0.00',
  //     netoPagar: '0.00',
  //     updateDate: null,
  //     remuneration: {
  //       id: 0,
  //       code: '',
  //       year: 0,
  //       month: 0,
  //       duration: 0,
  //       remunerationDateStart: null,
  //       remunerationDateEnd: null,
  //       note: '',
  //       creationDate: null,
  //       updateDate: null,
  //       remunerationType: 0,
  //       state: ''
  //     },
  //     state: {
  //       description: ''
  //     }
  //   })
  const [voucher, setVoucher] = useState(null)

  // datos del campo de autenticacion
  const [documentPassword, setDocumentPassword] = useState('')
  const onChangeDocumentPassword = ({ target }) => {
    const { value } = target
    setDocumentPassword(value)
  }

  // datos del estado de la autenticacion
  const [flagVerification, setFlagVerification] = useState(false)
  const verifyDocumentAuthentication = () => {
    if (documentPassword.length === 0) {
      alertWarning('Debes ingresar una contraseña')
    } else {
      if (documentPassword === voucher.worker.document) {
        const now = new Date()
        setFlagVerification(true)
        setDataValidationSession({
          ...dataValidationSession,
          datetimeStartSession: now
        })
      } else {
        alertWarning('Contraseña inválida')
      }
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

  const traerInformacionVoucherByToken = async () => {
    try {
      const token = parsed.token
      const { data } = await viewVoucherController(token)
      setVoucher(data)
    } catch (error) {
      alertWarning(error.detail)
    }
  }

  useEffect(() => {
    traerInformacionVoucherByToken()
  }, [])

  return {
    voucher,
    flagVerification,
    verifyDocumentAuthentication,
    documentPassword,
    onChangeDocumentPassword,
    onChangeFlagDownloadPDF
  }
}
