import {
  startOfWeek as dateFnsStartOfWeek,
  endOfWeek as dateFnsEndOfWeek,
} from 'date-fns'

export const startOfWeek = (
  date: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
) => {
  return dateFnsStartOfWeek(date, { weekStartsOn })
}

export const endOfWeek = (
  date: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
) => {
  return dateFnsEndOfWeek(date, { weekStartsOn })
}
