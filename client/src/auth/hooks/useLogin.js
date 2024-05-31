import { useForm } from 'react-hook-form'
import { login } from '../../services'
import { useAuthStore } from '../../stores'
import { useNavigate } from 'react-router-dom'
import { alertError } from '../../utils/alerts'
import { useState } from 'react'
import { useLoginAttempts } from './useLoginAttempts'

export function useLogin () {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const setCredentialsLogin = useAuthStore(state => state.setCredentialsLogin)
  const { attempts, incrementAttempts, cooldown, isDisabled, resetAttempts, permanentlyDisabled } = useLoginAttempts()

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const loginUser = async (credentials) => {
    try {
      const { data } = await login(credentials)
      setCredentialsLogin(data)
      resetAttempts()
      navigate('/home')
    } catch (error) {
      alertError(error.message)
      incrementAttempts()
    }
  }

  return {
    register,
    handleSubmit,
    loginUser,
    showPassword,
    togglePasswordVisibility,
    attempts,
    incrementAttempts,
    cooldown,
    isDisabled,
    resetAttempts,
    permanentlyDisabled
  }
}
