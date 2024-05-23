export function getMonthName (monthNumber) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
    'Noviembre', 'Diciembre'
  ]

  if (monthNumber < 1 || monthNumber > 12) {
    return 'Inválido'
  }

  return months[monthNumber - 1]
}

export function formatDate (inputDate) {
  // Parsear la fecha en formato YYYY-MM-DD
  const parts = inputDate.split('-')
  const formattedDate = new Date(parts[0], parts[1] - 1, parts[2])

  // Obtener los componentes de la fecha
  const day = formattedDate.getDate().toString().padStart(2, '0')
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0') // Month index is zero-based
  const year = formattedDate.getFullYear()

  // Retornar la fecha formateada como DD/MM/YYYY
  return `${day}/${month}/${year}`
}

export function parseFromISOToDate (isoDate) {
  const date = new Date(isoDate)

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Los meses son indexados desde 0
  const year = date.getUTCFullYear()

  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}
