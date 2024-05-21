import React from 'react'
import { useLogin } from '../hooks'

export const Login = () => {
  const {
    register,
    handleSubmit,
    loginUser,
    testData,
    testToken
  } = useLogin()
  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(loginUser)}>
        <input type='text' {...register('username', { required: true })} />
        <input type='text' {...register('password', { required: true })} />
        <input type="submit" />
      </form>

      <h1>Información test</h1>
      <button onClick={testToken}>Probar información</button>
      {
        testData.map((element, index) => (
          <li key={index}>{element}</li>
        ))
      }

    </>
  )
}
