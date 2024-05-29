import React from 'react'
import { StyledTableRow } from '../../../styles/TableStyles'
import { TableCell } from '@mui/material'
import { parseFromISOToDate } from '../../../utils'
import { FaFilePdf } from 'react-icons/fa'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { VoucherPDF } from '../../controlVoucher/components'

export const RowVoucherRemuneration = ({ voucher }) => {
  const { worker } = voucher
  return (
    <StyledTableRow>
      <TableCell align='left'>{`${worker.user.last_name} ${worker.user.first_name}`}</TableCell>
      <TableCell align='center'>
        <span
          className={`inline-block ${voucher.sentEmail ? 'bg-green-700' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide`}
        >
          {voucher.sentEmail ? 'Si' : 'No' }
        </span>
      </TableCell>
      <TableCell align='center'>
        <span
          className={`inline-block ${voucher.reviewed ? 'bg-green-700' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide`}
        >
          {voucher.reviewed ? 'Si' : 'No' }
        </span>
      </TableCell>
      <TableCell align='center'>{voucher.reviewed ? parseFromISOToDate(voucher.reviewDate) : 'No verificado' }</TableCell>
      <TableCell align='center'>{voucher.reviewed ? voucher.verification.durationReview : 'No verificado' }</TableCell>
      <TableCell align='center'>{voucher.reviewed ? (voucher.verification.downloadPDF ? 'Si' : 'No') : 'No verificado' }</TableCell>
      <TableCell align='center'>
        <div className='flex justify-center'>
          <PDFDownloadLink
            document={<VoucherPDF data={voucher}/>}
            fileName={`BOLETA DE PAGO - ${voucher.worker.user.last_name} ${voucher.worker.user.first_name}.pdf`}
          >
            <FaFilePdf
              size={30}
              color='#AD0B00'
            />
          </PDFDownloadLink>
        </div>
      </TableCell>
    </StyledTableRow>
  )
}
