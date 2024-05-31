export function getMonthName (monthNumber) {
  const months = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO',
    'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE',
    'NOVIEMBRE', 'DICIEMBRE'
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
export function parseFromISOToDateTime (isoDate) {
  const date = new Date(isoDate)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses son indexados desde 0
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  return formattedDate
}

function getDayName (date) {
  const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  return days[date.getDay()]
}

function getMonthNameByDate (date) {
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  return months[date.getMonth()]
}

export function parseDateVoucher (dateString) {
  const date = new Date(dateString)
  const dayName = getDayName(date)
  const day = date.getDate()
  const monthName = getMonthNameByDate(date)
  const year = date.getFullYear()

  return `${dayName}, ${day} de ${monthName} de ${year}`
}
