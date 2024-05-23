import React from 'react'
import { useListRemunerations } from '../hooks'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { RowListRemunerations } from '../components'
import { StyledTableCell } from '../../../styles/TableStyles'
import { CreateRemuneration } from './CreateRemuneration'

export const ListRemunerations = () => {
  const {
    remunerations
  } = useListRemunerations()
  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-center font-semibold text-2xl'>REMUNERACIONES</h1>
        <div className='flex flex-row'>
          <CreateRemuneration />
        </div>

        <div className='mt-4'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align='left'>N° Remuneración</StyledTableCell>
                  <StyledTableCell align='center'>Periodo</StyledTableCell>
                  <StyledTableCell align='center'>Mes</StyledTableCell>
                  <StyledTableCell align='center'>Duración</StyledTableCell>
                  <StyledTableCell align='center'>Tipo planilla</StyledTableCell>
                  <StyledTableCell align='center'>Fecha inicio</StyledTableCell>
                  <StyledTableCell align='center'>Fecha fin</StyledTableCell>
                  <StyledTableCell align='center'>Acciones</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remunerations.map((remuneration) => (
                  <RowListRemunerations
                    key={remuneration.id}
                    item={remuneration}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  )
}
