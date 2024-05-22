import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AppRouter } from './router'
import { Toaster } from 'react-hot-toast'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import './App.css'

function App () {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
      <AppRouter />
      <Toaster />
    </LocalizationProvider>
  )
}

export default App
