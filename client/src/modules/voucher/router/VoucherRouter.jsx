import { Route, Routes } from 'react-router-dom'
import { ViewVoucher } from '../pages'

export const VoucherRoutes = () => {
  return (
    <Routes>
      <Route path='view/:idVoucher' element={<ViewVoucher />}/>
    </Routes>
  )
}
