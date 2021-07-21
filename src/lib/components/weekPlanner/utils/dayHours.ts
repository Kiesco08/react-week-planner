import { format, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns'

export interface DayHour {
  label: string
  raw: number
}

const dayHours = (date: Date = new Date()): DayHour[] => {
  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  })
  return hours.map((hour): DayHour => {
    return {
      label: format(hour, 'h a'),
      raw: hour.getHours(),
    }
  })
}

export default dayHours
