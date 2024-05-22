import { useEffect, useState } from 'react'
import { listRemunerations } from '../services'

export function useListRemunerations () {
  const [remunerations, setRemunerations] = useState([])
  const traerInformacionRemuneraciones = async () => {
    try {
      const { data } = await listRemunerations()
      console.log(data)
      setRemunerations(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    traerInformacionRemuneraciones()
  }, [])

  return {
    remunerations
  }
}
