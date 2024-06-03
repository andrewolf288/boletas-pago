import React from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { alertError, alertSuccess, alertWarning } from '../../../utils'
import { createRemunerationWithImportation } from '../services'

export function useCreateRemuneration (traerInformacionRemuneraciones) {
  // implementacion de loading
  const [loading, setLoading] = React.useState(false)
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
  const crearRemuneracion = async (formData) => {
    if (acceptedFiles.length === 0) {
      alertWarning('Debes ingresar la data a importar')
    } else {
      setLoading(true)
      const formatFormData = {
        ...formData,
        remunerationDateStart: formData.remunerationDateStart.format('YYYY-MM-DD'),
        remunerationDateEnd: formData.remunerationDateEnd.format('YYYY-MM-DD')
      }
      const data = new FormData()
      data.append('file', acceptedFiles[0])
      for (const key in formatFormData) {
        data.append(key, formatFormData[key])
      }

      try {
        const { data: dataResult } = await createRemunerationWithImportation(data)
        // alerta de exito
        alertSuccess(dataResult.detail)
        // cerrar dialogo
        handleClose()
        // recargar la lista de remuneraciones
        traerInformacionRemuneraciones()
      } catch (error) {
        console.log(error)
        alertError(error.response.data.detail)
      } finally {
        setLoading(false)
      }
    }
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const resetForm = () => {
    reset()
    acceptedFiles.splice(0)
  }

  return {
    open,
    loading,
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
