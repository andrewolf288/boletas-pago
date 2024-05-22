import React from 'react'
import { useListRemunerations } from '../hooks'

export const ListRemunerations = () => {
  const {
    remunerations
  } = useListRemunerations()
  return (
    <>
      <h1>REMUNERACIONES</h1>
      {remunerations.map((remuneration) => (
        <li key={remuneration.id}>{remuneration.year}</li>
      ))}
    </>
  )
}
