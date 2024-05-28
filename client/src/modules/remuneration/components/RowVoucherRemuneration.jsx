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
      <TableCell align='center'>{voucher.sentEmail ? 'Si' : 'No' }</TableCell>
      <TableCell align='center'>{voucher.reviewed ? 'Si' : 'No' }</TableCell>
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
