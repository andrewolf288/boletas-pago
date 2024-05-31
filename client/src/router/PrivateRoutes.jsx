import React from 'react'
import { useAuthStore } from '../stores'
import { Navigate } from 'react-router-dom'

export const PrivateRoutes = ({ children }) => {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to={''}/>
  }

  return children
}
