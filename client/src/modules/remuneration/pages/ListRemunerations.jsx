import React from 'react'
import { useListRemunerations } from '../hooks'
import { CustomCircularProgress } from '../../../components'

export const ListRemunerations = () => {
  const {
    loading,
    remuneraciones
  } = useListRemunerations()
  return (
    <>
      {loading && (<CustomCircularProgress />)}
      {remuneraciones.map((element, index) => {
        return (
          <p key={index}>{element}</p>
        )
      })}
    </>
  )
}
