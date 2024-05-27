import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { VoucherPDF } from '../components'
import { FaDownload } from 'react-icons/fa'
import { useViewControllerVoucher } from '../hooks/useViewControllerVoucher'

export const ViewControllerVoucher = () => {
  const {
    voucher,
    documentPassword,
    flagVerification,
    onChangeDocumentPassword,
    verifyDocumentAuthentication,
    onChangeFlagDownloadPDF
  } = useViewControllerVoucher()

  // Debemos realizar una autenticación previa
  // if (flagVerification) {
  //   return (
  //     <ViewVoucherPdfViewer
  //       voucher={voucher}
  //       onChangeFlagDownloadPDF={onChangeFlagDownloadPDF}
  //     />
  //   )
  // } else {
  //   return (
  //     <ViewAuthenticationDocument
  //       documentPassword={documentPassword}
  //       onChangeDocumentPassword={onChangeDocumentPassword}
  //       verifyDocumentAuthentication={verifyDocumentAuthentication}
  //     />
  //   )
  // }
  return (
    voucher && <ViewVoucherPdfViewer
      voucher={voucher}
      onChangeFlagDownloadPDF={onChangeFlagDownloadPDF}
    />
  )
}

const ViewVoucherPdfViewer = ({ voucher, onChangeFlagDownloadPDF }) => {
  return (
    <>
      <div className='container mx-auto flex flex-col items-center'>
        <h1 className='text-2xl font-semibold text-gray-800 mt-4 text-center'>Boleta de pago</h1>
        <div className='w-full flex justify-center mt-6' style={{ height: '700px' }}>
          <PDFViewer
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '800px', // Ajustar según tus necesidades
              margin: 'auto'
            }}
          >
            <VoucherPDF data={voucher}/>
          </PDFViewer>
        </div>
        <PDFDownloadLink
          document={<VoucherPDF data={voucher}/>}
          fileName='voucher.pdf'
          className='bg-green-700 text-white rounded-lg p-3 flex items-center gap-x-3 mt-4'
          onClick={onChangeFlagDownloadPDF}
        >
          <FaDownload />
          <span>Descargar</span>
        </PDFDownloadLink>
      </div>
    </>
  )
}

const ViewAuthenticationDocument = ({ documentPassword, onChangeDocumentPassword, verifyDocumentAuthentication }) => {
  return (
    <div className='container mx-auto flex justify-center items-center h-screen'>
      <div className='bg-gray-100 p-8 rounded shadow-md'>
        <h1 className='text-2xl mb-4'>Autenticación de visualización</h1>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Contraseña <span className='text-orange-400'>*</span></label>
          <input
            type='password'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Ingrese su contraseña'
            value={documentPassword}
            onChange={onChangeDocumentPassword}
          />
        </div>
        <button
          className='w-full bg-green-700 hover:bg-dark-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          onClick={verifyDocumentAuthentication}
        >
          Ingresar
        </button>
      </div>
    </div>
  )
}
