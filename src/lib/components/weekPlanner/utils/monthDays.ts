import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

interface MonthDay {
  label: string
  raw: Date
}

const monthDays = (date: Date = new Date()): MonthDay[] => {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date)),
  })
  return days.map((day): MonthDay => {
    return {
      label: `${day.getDate()}`,
      raw: day,
    }
  })
}

export default monthDays
