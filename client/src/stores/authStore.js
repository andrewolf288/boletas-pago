import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')).accessToken : null,
      refreshToken: localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')).refreshToken : null,
      setCredentialsLogin: (tokens) => {
        set({ accessToken: tokens.access, refreshToken: tokens.refresh })
      },
      setCredentialsLogout: () => {
        set({ accessToken: null, refreshToken: null })
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
