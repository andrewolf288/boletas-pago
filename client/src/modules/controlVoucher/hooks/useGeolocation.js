import { useState } from 'react'

export const useGeolocation = () => {
  const [locationGPS, setLocation] = useState({ latitude: null, longitude: null })
  const [error, setError] = useState(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (err) => {
          setError(err.message)
        }
      )
    } else {
      setError('Geolocation is not supported by this browser.')
    }
  }

  return { locationGPS, error, getLocation }
}
