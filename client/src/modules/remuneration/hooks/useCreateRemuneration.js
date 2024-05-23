import React from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { alertWarning } from '../../../utils'

export function useCreateRemuneration () {
  // estados para controlar la apertura del dialogo
  const [open, setOpen] = React.useState(false)
  // funcion para abrir el cuadro de dialogo
  const handleClickOpen = () => {
    setOpen(true)
  }
  // funcion para cerrar el cuadro de dialogo
  const handleClose = () => {
    resetForm()
    setOpen(false)
  }

  // estados para controlar la información del formulario
  const { register, formState: { errors }, handleSubmit, control, reset } = useForm()
  // funcion para crear remuneracion
  const crearRemuneracion = (data) => {
    if (acceptedFiles.length === 0) {
      alertWarning('Debes ingresar la data a importar')
    } else {
      console.log(data)
    }
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const resetForm = () => {
    reset()
    acceptedFiles.splice(0)
  }

  return {
    open,
    handleClickOpen,
    handleClose,
    register,
    handleSubmit,
    errors,
    control,
    crearRemuneracion,
    acceptedFiles,
    getInputProps,
    getRootProps
  }
}
