import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns'
import { startOfWeek, endOfWeek } from './weekHelper'

interface MonthDay {
  label: string
  raw: Date
}

const monthDays = (
  date: Date = new Date(),
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
): MonthDay[] => {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date), weekStartsOn),
    end: endOfWeek(endOfMonth(date), weekStartsOn),
  })
  return days.map((day): MonthDay => {
    return {
      label: `${day.getDate()}`,
      raw: day,
    }
  })
}

export default monthDays
