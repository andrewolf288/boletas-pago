import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ListRemunerations, ViewRemuneration } from '../pages'

export const RemunerationRouter = () => {
  return (
    <Routes>
      <Route path='' element={<ListRemunerations />}/>
      <Route path='view/:idRemuneration' element={<ViewRemuneration />}/>
    </Routes>
  )
}
