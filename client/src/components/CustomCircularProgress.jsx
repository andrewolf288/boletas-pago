import { CircularProgress, Typography } from '@mui/material'
import React from 'react'

export const CustomCircularProgress = ({ textLoading = 'Procesando...' }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="subtitle1" color="textSecondary" component="p">
          {textLoading}
        </Typography>
      </div>
    </div>
  )
}
