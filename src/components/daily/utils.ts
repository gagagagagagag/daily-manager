import { DateTime } from 'luxon'

export const nowDiffDate = (date: string, format = 'mm:ss') => {
  return DateTime.now().diff(DateTime.fromISO(date), 'seconds').toFormat(format)
}

export const dateDiffDate = (
  dateA: string,
  dateB: string,
  format = "m' minutes and 's' seconds'"
) => {
  return DateTime.fromISO(dateA)
    .diff(DateTime.fromISO(dateB), 'minutes')
    .toFormat(format)
}

export const getRandomFromArray = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)]
}
