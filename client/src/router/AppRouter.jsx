import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RemunerationRouter } from '../modules/remuneration'
import { Login } from '../auth/pages'
import { HomePage, MainCotainerApp } from '../components'
import { WorkerRouter } from '../modules/worker/router/WorkerRouter'
import { VoucherRouter } from '../modules/voucher/router/VoucherRouter'
import { VoucherControllerRouter } from '../modules/controlVoucher/router/VoucherControllerRouter'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='' element={<PublicRoutes component={Login} />}/>
      <Route path='/*' element={<AppRouterModules />}/>
      <Route path='voucherController/*' element={<VoucherControllerRouter />}/>
    </Routes>
  )
}

const AppRouterModules = () => {
  return (
    <PrivateRoutes>
      <MainCotainerApp>
        <Routes>
          <Route
            path='home/*'
            element={
              <HomePage />
            }
          />
          <Route
            path='remuneration/*'
            element={
              <RemunerationRouter />
            }
          />
          <Route
            path='worker/*'
            element={
              <WorkerRouter />
            }
          />
          <Route
            path='voucher/*'
            element={
              <VoucherRouter />
            }
          />
        </Routes>
      </MainCotainerApp>
    </PrivateRoutes>
  )
}
