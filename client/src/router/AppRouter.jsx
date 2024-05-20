import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RemunerationRouter } from '../modules/remuneration'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='' element={<HomePage />}/>
      <Route path='remuneracion/*' element={<RemunerationRouter />}/>
    </Routes>
  )
}

const HomePage = () => {
  return (
    <h1>HOLA MUNDO</h1>
  )
}
