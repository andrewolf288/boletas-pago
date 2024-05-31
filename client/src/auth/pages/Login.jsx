import React from 'react'
import { useLogin } from '../hooks'
import LogoOficial from '../../assets/logo-oficial.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export const Login = () => {
  const {
    register,
    handleSubmit,
    loginUser,
    showPassword,
    togglePasswordVisibility,
    attempts,
    cooldown,
    isDisabled,
    permanentlyDisabled
  } = useLogin()
  return (
    <>
      <div className="grid place-content-center h-screen">
        <div className="grid place-content-center rounded-t-lg bg-gray-400 p-4">
          <img src={LogoOficial} alt="Emaran S.A.C." width={100} height={100}/>
        </div>
        <div className="flex flex-col gap-y-6 bg-dark-green p-8 rounded-b-lg">
          <h1 className="text-center font-extrabold text-white ">
            Inicio de Sesión
          </h1>
          <form className="min-w-[242px] flex flex-col gap-y-6" onSubmit={handleSubmit(loginUser)}>
            <label className=" flex flex-col gap-y-1">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium text-white">
                Usuario
              </span>
              <input
                {...register('username', { required: true })}
                type="text"
                name="username"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                disabled={isDisabled}
              />
            </label>

            <label className="flex flex-col gap-y-1 relative">
              <span className="after:content-['*'] after:ml-0.5 after:text-yellow-500 block text-sm font-medium text-white">
                Contraseña
              </span>
              <div className="relative">
                <input
                  {...register('password', { required: true })}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 pr-10"
                  disabled={isDisabled}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-1 top-2.5 mt-1 mr-2 text-slate-400 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              className="bg-green-800 hover:bg-green-600 text-white py-2 rounded"
              disabled={isDisabled}
            >
              {permanentlyDisabled
                ? 'Excedió el número de intentos'
                : isDisabled
                  ? `Deshabilitado por ${cooldown} segundos`
                  : 'Iniciar sesión'}
            </button>
            {attempts > 0 && <p className='text-white flex justify-center'>Intentos: {attempts}</p>}
          </form>
        </div>

      </div>
    </>
  )
}
