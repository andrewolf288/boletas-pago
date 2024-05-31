import { PDFDownloadLink, PDFViewer, pdf } from '@react-pdf/renderer'
import React, { useState } from 'react'
import { VoucherPDF } from '../components'
import { FaDownload, FaCheck, FaRegCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useViewControllerVoucher } from '../hooks/useViewControllerVoucher'
import { isMobileDevice } from '../../../utils/info'
import { CustomCircularProgress } from '../../../components/CustomCircularProgress'
import { saveAs } from 'file-saver'

export const ViewControllerVoucher = () => {
  const {
    flagLoading,
    reviewedVoucher,
    voucher,
    documentPassword,
    flagVerification,
    onChangeDocumentPassword,
    verifyDocumentAuthentication,
    onChangeFlagDownloadPDF,
    registerInformationValidation,
    attempts,
    cooldown,
    isDisabled,
    permanentlyDisabled
  } = useViewControllerVoucher()

  // se debe realizar una previa verificación
  if (flagLoading) {
    return <CustomCircularProgress />
  }
  if (flagVerification) {
    if (reviewedVoucher) {
      return (<ViewDisabledPageVerifiedPage />)
    } else {
    // se debe reconocer si es un dispositivo móvil
      if (isMobileDevice()) {
        return (
          <ViewDisabledPageMobileAgent
            voucher={voucher}
            onChangeFlagDownloadPDF={onChangeFlagDownloadPDF}
            registerInformationValidation={registerInformationValidation}
          />
        )
      } else {
        return (
          voucher && <ViewVoucherPdfViewer
            voucher={voucher}
            onChangeFlagDownloadPDF={onChangeFlagDownloadPDF}
            registerInformationValidation={registerInformationValidation}
          />
        )
      }
    }
  } else {
    return (
      <ViewAuthenticationDocument
        documentPassword={documentPassword}
        onChangeDocumentPassword={onChangeDocumentPassword}
        verifyDocumentAuthentication={verifyDocumentAuthentication}
        attempts={attempts}
        cooldown={cooldown}
        isDisabled={isDisabled}
        permanentlyDisabled={permanentlyDisabled}
      />
    )
  }
}

const ViewVoucherPdfViewer = ({ voucher, onChangeFlagDownloadPDF, registerInformationValidation }) => {
  const downloadPdf = async () => {
    onChangeFlagDownloadPDF()
    const fileName = `BOLETA DE PAGO - ${voucher.remuneration.month.toString().padStart(2, '0')}-${voucher.remuneration.year} - ${voucher.worker.user.last_name} ${voucher.worker.user.first_name}.pdf`
    const blob = await pdf(<VoucherPDF data={voucher} />).toBlob()
    saveAs(blob, fileName)
  }

  return (
    <>
      <div className='container mx-auto flex flex-col items-center'>
        <h1 className='text-2xl font-semibold text-gray-800 mt-4 text-center'>Boleta de pago</h1>
        <div className='w-full flex justify-center mt-6' style={{ height: '700px' }}>
          <PDFViewer
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '800px',
              margin: 'auto'
            }}
          >
            <VoucherPDF data={voucher}/>
          </PDFViewer>
        </div>
        <div className='flex mb-5'>
          <button
            className='bg-green-700 text-white rounded-lg p-3 flex items-center gap-x-3 mt-4'
            onClick={downloadPdf}
          >
            <FaDownload />
            <span>Descargar</span>
          </button>
          <button
            className='bg-blue-700 text-white rounded-lg p-3 flex items-center gap-x-3 mt-4 ms-2'
            onClick={registerInformationValidation}
          >
            <FaCheck />
            <span>
            Verificar
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

const ViewAuthenticationDocument = (
  {
    documentPassword,
    onChangeDocumentPassword,
    verifyDocumentAuthentication,
    attempts,
    cooldown,
    isDisabled,
    permanentlyDisabled
  }
) => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className='container mx-auto flex justify-center items-center h-screen'>
      <div className='bg-gray-100 p-8 rounded shadow-md'>
        <h1 className='text-2xl mb-4'>Autenticación de visualización</h1>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Contraseña <span className='text-orange-400'>*</span></label>
          <div className="relative">
            <input
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Ingrese su contraseña'
              value={documentPassword}
              onChange={onChangeDocumentPassword}
              type={showPassword ? 'text' : 'password'}
              disabled={isDisabled}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-1 top-2.5 mt-1 mr-2 text-slate-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type='submit'
          className='w-full bg-green-700 hover:bg-dark-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          onClick={verifyDocumentAuthentication}
          disabled={isDisabled}
        >
          {permanentlyDisabled
            ? 'Excedió el número de intentos'
            : isDisabled
              ? `Deshabilitado por ${cooldown} segundos`
              : 'Ingresar'}
        </button>
        {attempts > 0 && <p className='text-black flex justify-center mt-2'>Intentos: {attempts}</p>}
      </div>
    </div>
  )
}

const ViewDisabledPageVerifiedPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center items-center gap-x-2">Verificación realizada<FaRegCheckCircle className='text-green-800'/></h1>
        <p className="mb-4">
          Esta boleta de pago fué verificada exitosamente. Si desea revisar sus boletas de pago comuniquese directamente con Recursos Humanos.
        </p>
      </div>
    </div>
  )
}

const ViewDisabledPageMobileAgent = ({ voucher, onChangeFlagDownloadPDF, registerInformationValidation }) => {
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center items-center gap-x-2">Boleta de pago</h1>
        <p className="mb-4">
          En dispositivos móviles no esta disponible el renderizado. Sin embargo, puede descargarlo directamente desde el botón de abajo. <span className='font-semibold'>¡Después de revisar su boleta no se olvide de verificar su revisión!</span>
        </p>
        <div className='flex justify-center'>
          <PDFDownloadLink
            document={<VoucherPDF data={voucher}/>}
            fileName={`BOLETA DE PAGO - ${voucher.remuneration.month.toString().padStart(2, '0')}-${voucher.remuneration.year} - ${voucher.worker.user.last_name} ${voucher.worker.user.first_name}.pdf`}
            className='bg-green-700 text-white rounded-lg p-3 flex items-center gap-x-3 mt-4'
            onClick={onChangeFlagDownloadPDF}
          >
            <FaDownload />
            <span>Descargar</span>
          </PDFDownloadLink>
          <button
            className='bg-blue-700 text-white rounded-lg p-3 flex items-center gap-x-3 mt-4 ms-2'
            onClick={registerInformationValidation}
          >
            <FaCheck />
            <span>
            Verificar
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
