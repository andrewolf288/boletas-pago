import React from 'react'
import { useAuthStore } from '../stores'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  const user = useAuthStore(state => state.user)
  const { groups } = user
  const { permissions } = groups ? groups[0] : []

  const viewPermissions = permissions.filter(permission => permission.codename.startsWith('view_'))
  const modules = [...new Set(viewPermissions.map(permission => permission.content_type))]

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Bienvenidos EMARRHH</h1>
      <p className="text-lg">
        Transformamos la gestión de tu empresa para un futuro exitoso.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-2">{module.name}</h2>
            <Link
              className={'bg-dark-green text-white px-4 py-2 rounded-md'}
              to={`/${module.model}`}
            >
              Ingresar
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
