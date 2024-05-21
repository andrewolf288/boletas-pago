import { useForm } from 'react-hook-form'
import { login, testApi } from '../../services'
import { useAuthStore } from '../../stores'
import { useState } from 'react'

export function useLogin () {
  const { register, handleSubmit } = useForm()
  const setCredentialsLogin = useAuthStore(state => state.setCredentialsLogin)
  const [testData, setTestData] = useState([])

  const loginUser = async (credentials) => {
    try {
      const { data } = await login(credentials)
      setCredentialsLogin(data)
    } catch (error) {
      console.log(error)
    }
  }

  const testToken = async () => {
    try {
      const { data } = await testApi()
      console.log(data)
      setTestData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    register,
    handleSubmit,
    loginUser,
    testData,
    testToken
  }
}
