import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')).accessToken : null,
      refreshToken: localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')).refreshToken : null,
      user: localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')).user : null,
      setCredentialsLogin: (tokens) => {
        const parserToken = jwtDecode(tokens.access)
        const user = parserToken.user
        set({ accessToken: tokens.access, refreshToken: tokens.refresh, user })
      },
      setCredentialsLogout: () => {
        set({ accessToken: null, refreshToken: null, user: null })
      },
      setCredentialRefreshedToken: (access_token) => {
        set({ accessToken: access_token })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
