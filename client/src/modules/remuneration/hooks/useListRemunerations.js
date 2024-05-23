import { useEffect, useState } from 'react'
import { listRemunerations } from '../services'
import { alertError } from '../../../utils'

export function useListRemunerations () {
  const [remunerations, setRemunerations] = useState([])
  const traerInformacionRemuneraciones = async () => {
    try {
      const { data } = await listRemunerations()
      setRemunerations(data)
    } catch (error) {
      console.log(error)
      alertError()
    }
  }

  useEffect(() => {
    traerInformacionRemuneraciones()
  }, [])

  return {
    remunerations
  }
}
