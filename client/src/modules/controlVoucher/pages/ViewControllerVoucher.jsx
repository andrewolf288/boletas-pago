import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { VoucherPDF } from '../components'
import { FaDownload } from 'react-icons/fa'

export const ViewControllerVoucher = () => {
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
            <VoucherPDF />
          </PDFViewer>
        </div>
        <PDFDownloadLink
          document={<VoucherPDF />}
          fileName='voucher.pdf'
          className='bg-green-700 text-white rounded-lg p-3 flex items-center gap-x-3 mt-4'
        >
          <FaDownload />
          <span>Descargar</span>
        </PDFDownloadLink>
      </div>
    </>
  )
}
