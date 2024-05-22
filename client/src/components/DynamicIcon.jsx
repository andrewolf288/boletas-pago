import React from 'react'
import iconTrabajador from '../assets/icons/trabajador.png'
import iconRemuneracion from '../assets/icons/salario.png'
import iconVoucher from '../assets/icons/voucher.png'

export const DynamicIcon = ({ iconName }) => {
  const getIconByName = (name) => {
    switch (name) {
    case 'remuneration':
      return iconRemuneracion
    case 'worker':
      return iconTrabajador
    case 'voucher':
      return iconVoucher
    default:
      return null
    }
  }

  const iconSrc = getIconByName(iconName)

  return (
    <img
      src={iconSrc}
      alt={iconName}
      style={{
        minWidth: 0,
        width: 30,
        justifyContent: 'center'
      }}
    />
  )
}
