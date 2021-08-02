import { eachDayOfInterval, format } from 'date-fns'
import { startOfWeek, endOfWeek } from './weekHelper'

export interface WeekDay {
  label: string
  dayOfMonth: number
  raw: Date
}

const weekDays = (
  date: Date = new Date(),
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
): WeekDay[] => {
  const dates = eachDayOfInterval({
    start: startOfWeek(date, weekStartsOn),
    end: endOfWeek(date, weekStartsOn),
  })

  return dates.map((date): WeekDay => {
    return {
      label: format(date, 'EE'),
      dayOfMonth: date.getDate(),
      raw: date,
    }
  })
}

export default weekDays
