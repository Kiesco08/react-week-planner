export enum MultidayState {
  FIRST_DAY,
  MIDDLE_DAY,
  LAST_DAY,
}

export default interface WeekEvent {
  id: string
  title: string
  start: Date
  end: Date
  notes?: string | null
  type: string
}
