import React from 'react'
import { useAuthStore } from '../stores'
import { Navigate } from 'react-router-dom'

export const PublicRoutes = ({ component: Component }) => {
  const user = useAuthStore(state => state.user)
  return !user ? <Component /> : <Navigate to='/home' replace />
}
