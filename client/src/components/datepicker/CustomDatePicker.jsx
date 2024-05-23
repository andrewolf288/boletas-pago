import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

export const CustomDatePicker = ({
  value,
  onNewDateValue,
  disabled = false
}) => {
  const handleKeyDown = (event) => {
    event.preventDefault()
  }

  return (
    <DatePicker
      disabled={disabled}
      value={value}
      format="DD/MM/YYYY"
      onChange={onNewDateValue}
      slotProps={{ textField: { size: 'small' } }}
      slots={{
        textField: textFieldProps => <TextField {...textFieldProps} onKeyDown={handleKeyDown} />
      }}
    />
  )
}
