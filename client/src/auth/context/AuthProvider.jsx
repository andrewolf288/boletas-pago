import React, { createContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const example = 'Hola mundo'
  return (
    <AuthContext.Provider value={example}>{children}</AuthContext.Provider>
  )
}
