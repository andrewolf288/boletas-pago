import React from 'react'
import { useViewRemuneration } from '../hooks'
import { CustomCircularProgress } from '../../../components'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { RowVoucherRemuneration } from '../components'
import { StyledTableCell } from '../../../styles/TableStyles'
import { getMonthName } from '../../../utils'

export const ViewRemuneration = () => {
  const {
    flagLoading,
    remunerationView
  } = useViewRemuneration()

  if (flagLoading) {
    return <CustomCircularProgress />
  } else {
    if (remunerationView) {
      return (
        <div className='container mx-auto'>
          <h1 className='text-center font-semibold text-2xl'>DETALLE REMUNERACIÓN</h1>
          <div className="min-w-[242px] flex flex-col gap-y-6 gap-x-8 mt-6">
            <div className="flex flex-row gap-y-6 gap-x-8">
              <div className="w-6/12 flex flex-col gap-y-5">
                <div className='flex flex-row gap-x-8'>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Periodo
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      value={remunerationView.year}
                      disabled
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mes
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={getMonthName(remunerationView.month)}
                      disabled
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Duración
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                      value={remunerationView.duration}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="w-6/12 flex flex-col gap-y-5 items-center">
                <div className='flex flex-row gap-x-8'>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha Inicio
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={remunerationView.remunerationDateStart}
                      disabled
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha Fin
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={remunerationView.remunerationDateEnd}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Observaciones
                </label>
                <TextField
                  type='text'
                  value={remunerationView.note}
                  disabled
                  multiline
                  maxLength={200}
                  rows={3}
                  inputProps={{
                    style: {
                      width: '100%',
                      overflowWrap: 'break-word'
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='left'>Trabajador</StyledTableCell>
                    <StyledTableCell align='center'>Enviado email</StyledTableCell>
                    <StyledTableCell align='center'>Verificado</StyledTableCell>
                    <StyledTableCell align='center'>Fecha verificado</StyledTableCell>
                    <StyledTableCell align='center'>Duración verificación</StyledTableCell>
                    <StyledTableCell align='center'>Descargó PDF</StyledTableCell>
                    <StyledTableCell align='center'>Acciones</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {remunerationView.vouchers.map((voucher) => (
                    <RowVoucherRemuneration key={voucher.id} voucher={voucher}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )
    }
  }
}
