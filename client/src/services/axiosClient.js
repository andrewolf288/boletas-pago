import { createAxiosClient } from './createAxiosClient'
import { useAuthStore } from '../stores'

const REFRESH_TOKEN_URL = `${import.meta.env.VITE_APP_DOMAIN}token/refresh/`
const BASE_URL = import.meta.env.VITE_APP_DOMAIN

// funcion para acceder al token del contexto global de la aplicación
function getCurrentAccessToken () {
  return useAuthStore.getState().accessToken
}

// funcion para acceder al refresh token del contexto global de la aplicación
function getCurrentRefreshToken () {
  return useAuthStore.getState().refreshToken
}

// funcion para refrescar los tokens
function setRefreshedTokens (token) {
  console.log('set refresh tokens...')
  const setCredentialRefreshedToken = useAuthStore.getState().setCredentialRefreshedToken
  // funcion de set de nuevas credenciales
  setCredentialRefreshedToken(token)
}

// funcion para deslogear al usuario
async function logout () {
  console.log('logout...')
  // funcion de remove de credenciales
  const setCredentialsLogout = useAuthStore.getState().setCredentialsLogout
  setCredentialsLogout()
  // enviar a pagina de login
  //   window.location.href = ''
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  logout,
  setRefreshedTokens
})
