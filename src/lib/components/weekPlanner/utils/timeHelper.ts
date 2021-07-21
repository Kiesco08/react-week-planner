import {
  add,
  areIntervalsOverlapping,
  isBefore,
  isDate,
  isSameDay,
  isValid,
  parse,
} from 'date-fns'
import { MultidayState } from '../WeekEvent'
import WeekEvent from '../WeekEvent'

export const parseTimeUsingDate = (
  _: any,
  originalValue: any,
  refDate: Date,
  timeFormats: string[]
): Date => {
  const parseAllowedFormats = () => {
    const parsed = timeFormats
      .map((format) => parse(originalValue, format, refDate))
      .filter((parsed) => isValid(parsed))
    if (parsed.length === 0) return 'Invalid time'
    return parsed[0]
  }
  return isDate(originalValue) ? originalValue : parseAllowedFormats()
}

export const parseTime = (
  _: any,
  originalValue: any,
  timeFormats: string[]
): Date => {
  return parseTimeUsingDate(_, originalValue, new Date(), timeFormats)
}

export const isStartingThisHour = (event: WeekEvent, hour: Date): boolean => {
  return areIntervalsOverlapping(
    { start: event.start, end: add(event.start, { seconds: 1 }) },
    { start: hour, end: add(hour, { hours: 1 }) }
  )
}

export const isResumingFromPast = (event: WeekEvent, hour: Date): boolean => {
  const isMidnight = hour.getHours() === 0
  if (isMidnight === false) return false
  const isEventFromPreviousDay = isBefore(event.start, hour)
  if (isEventFromPreviousDay === false) return false
  const hasEventThisHour = areIntervalsOverlapping(
    { start: event.start, end: event.end },
    { start: hour, end: add(hour, { hours: 1 }) }
  )
  return hasEventThisHour
}

export const endsToday = (event: WeekEvent, hour: Date): boolean => {
  return isSameDay(hour, event.end)
}

export const getMultiDayState = (
  event: WeekEvent,
  hour: Date
): MultidayState => {
  if (isResumingFromPast(event, hour) && endsToday(event, hour) === false) {
    return MultidayState.MIDDLE_DAY
  }
  if (isResumingFromPast(event, hour) && endsToday(event, hour)) {
    return MultidayState.LAST_DAY
  }
  return MultidayState.FIRST_DAY
}
