import { useState, useEffect } from 'react'

// Definimos las constantes para los intentos y duraciones
const MAX_INITIAL_ATTEMPTS = 3
const COOLDOWN_SECONDS_FIRST = 15
const COOLDOWN_SECONDS_SECOND = 30
const MAX_TOTAL_ATTEMPTS = 6

export const useLoginAttempts = () => {
  const [attempts, setAttempts] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [permanentlyDisabled, setPermanentlyDisabled] = useState(false)

  useEffect(() => {
    let timer

    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prevCooldown) => {
          if (prevCooldown === 1) {
            setIsDisabled(false)
          }
          return prevCooldown - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [cooldown])

  const incrementAttempts = () => {
    setAttempts((prevAttempts) => {
      const newAttempts = prevAttempts + 1

      if (newAttempts >= MAX_INITIAL_ATTEMPTS && newAttempts < MAX_TOTAL_ATTEMPTS - 1) {
        setIsDisabled(true)
        setCooldown(COOLDOWN_SECONDS_FIRST)
      } else if (newAttempts === MAX_TOTAL_ATTEMPTS - 1) {
        setIsDisabled(true)
        setCooldown(COOLDOWN_SECONDS_SECOND)
      } else if (newAttempts >= MAX_TOTAL_ATTEMPTS) {
        setIsDisabled(true)
        setPermanentlyDisabled(true)
      }

      return newAttempts
    })
  }

  const resetAttempts = () => {
    setAttempts(0)
    setIsDisabled(false)
    setCooldown(0)
    setPermanentlyDisabled(false)
  }

  return {
    attempts,
    isDisabled,
    cooldown,
    permanentlyDisabled,
    incrementAttempts,
    resetAttempts
  }
}
