import React from 'react'
import { useCreateRemuneration } from '../hooks'
import { AppBar, Button, Dialog, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { IoMdClose, IoMdAddCircle } from 'react-icons/io'
import { CustomDatePicker } from '../../../components'
import { Controller } from 'react-hook-form'

export const CreateRemuneration = () => {
  const {
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
  } = useCreateRemuneration()

  return (
    <React.Fragment>
      <button
        className='flex items-center gap-x-2 bg-dark-green p-2 rounded-md text-white'
        onClick={handleClickOpen}
      >
        <IoMdAddCircle
          size={25}
        />
            Crear remuneración
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#00510b' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <IoMdClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Crear remuneración
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit(crearRemuneracion)}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>

        <div className='m-4 mt-6 max-w-full p-6 bg-white rounded-xl shadow-lg'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información remuneración</h2>
          <form className="min-w-[242px] flex flex-col gap-y-6 gap-x-8 p-6">
            <div className="flex flex-row gap-y-6 gap-x-8">
              <div className="w-6/12 flex flex-col gap-y-5">
                <div className='flex flex-row gap-x-8'>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Periodo
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                      onWheel={(e) => e.target.blur()}
                      {...register('year', { required: 'Este campo es requerido' })}
                      aria-invalid={errors.year ? 'true' : 'false'}
                    />
                    {errors.year && (
                      <p className='text-xs text-red-500 pt-1'>{errors.year.message}</p>
                    )}

                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Mes
                    </label>
                    <input
                      onWheel={(e) => e.target.blur()}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                      {...register('month', {
                        required: 'Este campo es requerido',
                        minLength: {
                          value: 1,
                          message: 'El valor debe ser mayor de 0'
                        },
                        maxLength: {
                          value: 12,
                          message: 'El valor debe ser menor de 12'
                        }
                      })}
                      aria-invalid={errors.month ? 'true' : 'false'}
                    />
                    {errors.month && (
                      <p className='text-xs text-red-500 pt-1'>{errors.month.message}</p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Duración
                    </label>
                    <input
                      onWheel={(e) => e.target.blur()}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number"
                      {...register('duration', { required: true, min: 1, max: 31 })}
                      aria-invalid={errors.duration ? 'true' : 'false'}
                    />
                    {errors.duration && (
                      <p className='text-xs text-red-500 pt-1'>Este campo es requerido</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-6/12 flex flex-col gap-y-5 items-center">
                <div className='flex flex-row gap-x-8'>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha Inicio
                    </label>
                    <Controller
                      name='remunerationDateStart'
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <CustomDatePicker
                          value={field.value}
                          onNewDateValue={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Fecha Fin
                    </label>
                    <Controller
                      name='remunerationDateEnd'
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <CustomDatePicker
                          value={field.value}
                          onNewDateValue={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex flex-col'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Observaciones
                </label>
                <Controller
                  name='note'
                  control={control}
                  defaultValue={''}
                  render={({ field }) => (
                    <TextField
                      type='text'
                      value={field.value}
                      onChange={field.onChange}
                      multiline
                      maxLength={200}
                      rows={3}
                      inputProps={{
                        style: {
                          width: '100%',
                          overflowWrap: 'break-word'
                        }
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </div>
        <div className='m-4 max-w-full p-6 bg-white rounded-xl shadow-lg'>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Importación</h2>
          <div className="max-w-full mx-auto">
            <div
              className="h-28 border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-gray-50 transition"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p className="text-center text-gray-700 font-semibold">Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos</p>
            </div>
            <aside className="mt-4">
              <p className="font-bold text-gray-700">Archivos</p>
              <ul className="list-none mt-2">
                {
                  acceptedFiles.map(file => (
                    <li key={file.path}>
                      {file.path} - {file.size} bytes
                    </li>
                  ))
                }
              </ul>
            </aside>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  )
}
