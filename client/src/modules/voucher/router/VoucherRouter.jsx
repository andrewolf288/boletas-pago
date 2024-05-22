import { Route, Routes } from 'react-router-dom'
import { ListVouchers, ViewVoucher } from '../pages'

export const VoucherRouter = () => {
  return (
    <Routes>
      <Route path='' element={<ListVouchers />}/>
      <Route path='view/:idVoucher' element={<ViewVoucher />}/>
    </Routes>
  )
}
