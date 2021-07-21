import { eachDayOfInterval, format, endOfWeek, startOfWeek } from 'date-fns'

export interface WeekDay {
  label: string
  dayOfMonth: number
  raw: Date
}

const weekDays = (date: Date = new Date()): WeekDay[] => {
  const dates = eachDayOfInterval({
    start: startOfWeek(date),
    end: endOfWeek(date),
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
