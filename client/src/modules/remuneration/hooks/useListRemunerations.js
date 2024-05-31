import { useEffect, useState } from 'react'
import { listRemunerations } from '../services'

export function useListRemunerations () {
  const [remunerations, setRemunerations] = useState([])
  const [loading, setLoading] = useState(false)
  const traerInformacionRemuneraciones = async () => {
    try {
      setLoading(true)
      const { data } = await listRemunerations()
      setRemunerations(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    traerInformacionRemuneraciones()
  }, [])

  return {
    remunerations,
    loading,
    traerInformacionRemuneraciones
  }
}
