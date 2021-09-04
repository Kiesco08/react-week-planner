import { Timezone } from './WeekPlannerConfig'
import { getTimezoneOffset } from 'date-fns-tz'

interface PlannerDateInfo {
  timezone?: Timezone
  date?: Date
}

class PlannerDate extends Date {
  private _localDate: Date
  localDate(): PlannerDate {
    return new PlannerDate({ date: this._localDate })
  }

  constructor(plannerDateInfo?: PlannerDateInfo) {
    const { timezone, date } = plannerDateInfo || {}
    const localDate = new Date(date ?? new Date())
    const timezoneDate = () => {
      if (!timezone) {
        return localDate
      }
      const timezoneOffsetInMilli = getTimezoneOffset(timezone)
      const timezoneOffsetInMinutes = timezoneOffsetInMilli / 60 / 1000
      const result = new Date(localDate)
      result.setMinutes(
        result.getMinutes() +
          result.getTimezoneOffset() +
          timezoneOffsetInMinutes
      )
      return result
    }
    super(timezoneDate())
    this._localDate = localDate
  }
}

export default PlannerDate
