import { useEffect, useState } from 'react'
import { getRemunerationsWithDetalle } from '../services'
import { useParams } from 'react-router-dom'

export function useViewRemuneration () {
  const { idRemuneration } = useParams()
  const [remunerationView, setRemunerationView] = useState(null)
  const [flagLoading, setFlagLoading] = useState(false)

  const traerInformacionRemuneracionDetalles = async () => {
    setFlagLoading(true)
    try {
      const { data } = await getRemunerationsWithDetalle(idRemuneration)
      console.log(data)
      setRemunerationView(data)
    } catch (error) {
      console.log(error)
    } finally {
      setFlagLoading(false)
    }
  }

  useEffect(() => {
    traerInformacionRemuneracionDetalles()
  }, [])

  return {
    flagLoading,
    remunerationView
  }
}
