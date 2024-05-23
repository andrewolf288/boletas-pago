import { TableCell } from '@mui/material'
import React from 'react'
import { formatDate, getMonthName } from '../../../utils'
import { MdRemoveRedEye } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { StyledTableRow } from '../../../styles/TableStyles'

export const RowListRemunerations = ({ item }) => {
  return (
    <StyledTableRow>
      <TableCell align='left'>{item.code}</TableCell>
      <TableCell align='center'>{item.year}</TableCell>
      <TableCell align='center'>{getMonthName(item.month)}</TableCell>
      <TableCell align='center'>{`${item.duration} días`}</TableCell>
      <TableCell align='center'>{item.remunerationType.description}</TableCell>
      <TableCell align='center'>{formatDate(item.remunerationDateStart)}</TableCell>
      <TableCell align='center'>{formatDate(item.remunerationDateEnd)}</TableCell>
      <TableCell align='center'>
        <div className='flex justify-center'>
          <Link
            to={`view/${item.id}`}
          >
            <MdRemoveRedEye
              size={30}
              color='#1976D2'
            />
          </Link>
        </div>
      </TableCell>
    </StyledTableRow>
  )
}
