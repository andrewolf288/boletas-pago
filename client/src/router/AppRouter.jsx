import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RemunerationRouter } from '../modules/remuneration'
import { Login } from '../auth/pages'
import { HomePage, MainCotainerApp } from '../components'
import { WorkerRouter } from '../modules/worker/router/WorkerRouter'
import { VoucherRouter } from '../modules/voucher/router/VoucherRouter'
import { VoucherControllerRouter } from '../modules/controlVoucher/router/VoucherControllerRouter'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='voucherController/*' element={<VoucherControllerRouter />}/>
      <Route path='/*' element={<AppRouterModules />}/>
    </Routes>
  )
}

const AppRouterModules = () => {
  return (
    <MainCotainerApp>
      <Routes>
        <Route path='home/*' element={<HomePage />}/>
        <Route path='remuneration/*' element={<RemunerationRouter />}/>
        <Route path='worker/*' element={<WorkerRouter />}/>
        <Route path='voucher/*' element={<VoucherRouter />}/>
      </Routes>
    </MainCotainerApp>
  )
}
