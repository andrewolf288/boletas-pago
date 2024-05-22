import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ListWorkers, ViewWorker } from '../pages'

export const WorkerRouter = () => {
  return (
    <Routes>
      <Route path='' element={<ListWorkers />}/>
      <Route path='view/:idWorker' element={<ViewWorker />}/>
    </Routes>
  )
}
