import React from 'react'
import { StyledTableRow } from '../../../styles/TableStyles'
import { TableCell } from '@mui/material'
import { alertInfo, parseFromISOToDateTime } from '../../../utils'
import { FaFilePdf } from 'react-icons/fa'
import { VoucherPDF } from '../../controlVoucher/components'
import { MdEmail } from 'react-icons/md'
import { FaCircleInfo } from 'react-icons/fa6'
import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
export const RowVoucherRemuneration = ({ voucher, forwardEmailVoucher, index }) => {
  const { worker } = voucher
  const downloadPdf = async () => {
    const fileName = `BOLETA DE PAGO - ${voucher.remuneration.month.toString().padStart(2, '0')}-${voucher.remuneration.year} - ${voucher.worker.user.last_name} ${voucher.worker.user.first_name}.pdf`
    const blob = await pdf(<VoucherPDF data={voucher} />).toBlob()
    saveAs(blob, fileName)
  }

  return (
    <StyledTableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell align='left'>{`${worker?.user.last_name || 'N/A'} ${worker?.user.first_name || 'N/A'}`}</TableCell>
      <TableCell align='center'>
        <span
          className={`inline-block ${voucher.sentEmail ? 'bg-green-700' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full font-semibold tracking-wide`}
        >
          {voucher.sentEmail ? 'Si' : 'No' }
        </span>
      </TableCell>
      <TableCell align='center'>
        <span
          className={`inline-block ${voucher.reviewed ? 'bg-green-700' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full font-semibold tracking-wide`}
        >
          {voucher.reviewed ? 'Si' : 'No' }
        </span>
      </TableCell>
      <TableCell align='center'>{voucher.reviewed ? parseFromISOToDateTime(voucher.reviewDate) : 'No verificado' }</TableCell>
      <TableCell align='center'>{voucher.reviewed ? `${voucher.verification?.durationReview} segundos` : 'No verificado' }</TableCell>
      <TableCell align='center'>
        {voucher.reviewed ? (voucher.verification?.downloadPDF ? 'Si' : 'No') : 'No verificado' }
      </TableCell>
      <TableCell align='center'>
        {voucher.reviewed ? (voucher.verification?.deviceType || 'N/A') : 'No verificado' }
      </TableCell>
      <TableCell align='center'>
        <div className='flex justify-center items-center'>
          <button onClick={downloadPdf}>
            <FaFilePdf
              size={26}
              color='#AD0B00'
            />
          </button>
          {!voucher.sentEmail && <button
            className='ms-2'
            onClick={() => forwardEmailVoucher(voucher)}
          >
            <MdEmail
              size={30}
              color='#325eed'
            />
          </button>}
          {!voucher.sentEmail && <button
            className='ms-2'
            onClick={() => alertInfo(voucher.errorSend)}
          >
            <FaCircleInfo
              size={26}
              color='#a39c91'
            />
          </button>}
        </div>
      </TableCell>
    </StyledTableRow>
  )
}
