import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ViewControllerVoucher } from '../pages/ViewControllerVoucher'

export const VoucherControllerRouter = () => {
  return (
    <Routes>
      <Route path='view/:tokenUUID' element={<ViewControllerVoucher />}/>
    </Routes>
  )
}
