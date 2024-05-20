import { useEffect, useState } from 'react'
import { useAxiosConfigure } from '../../../api'

export function useListRemunerations () {
  const {
    axiosInstance,
    loading
  } = useAxiosConfigure()

  const [remuneraciones, setRemuneraciones] = useState([])

  const traerInformacionRemuneraciones = async () => {
    const URL = import.meta.env.VITE_APP_DOMAIN
    const { data } = await axiosInstance.get(URL)
    setRemuneraciones(data)
    console.log(data)
  }

  useEffect(() => {
    traerInformacionRemuneraciones()
  }, [])

  return {
    loading,
    remuneraciones
  }
}
