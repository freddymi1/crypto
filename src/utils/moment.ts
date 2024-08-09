const monthNames = [
  'Jan',
  'Fev',
  'Mars',
  'Avr',
  'Mai',
  'Juin',
  'Jui',
  'Août',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

export const FormatDateWeb = (date: Date) => {
  const day = date.getDate()

  const year = date.getFullYear()
  const month = monthNames[date.getMonth()]
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${day} ${month} ${year} ${hours}h ${minutes}min`
}

export const FormatDateMobile = (date: Date) => {
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const hours = date.getHours()

  return `${day} ${month} ${hours}h`
}
