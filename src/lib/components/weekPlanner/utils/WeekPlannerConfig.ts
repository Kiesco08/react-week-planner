import { BackgroundProps, LayoutProps } from '@chakra-ui/react'
import WeekEvent from '../WeekEvent'
import { Theme } from '@chakra-ui/react'

export interface EventTypeConfig {
  value: string
  label: string
  colorScheme: keyof Theme['colors']
  isDefault?: boolean
}
export interface SaveResult {
  event?: WeekEvent
  errors?: string[]
}
export interface DeleteResult {
  event?: { id: WeekEvent['id'] }
  errors?: string[]
}

export interface WeekEventInput extends Omit<WeekEvent, 'id'> {
  id?: string
}

export enum Timezone {
  minus12 = '-12:00',
  minus11 = '-11:00',
  minus10 = '-10:00',
  minus930 = '-09:30',
  minus9 = '-09:00',
  minus8 = '-08:00',
  minus7 = '-07:00',
  minus6 = '-06:00',
  minus5 = '-05:00',
  minus4 = '-04:00',
  minus330 = '-03:30',
  minus3 = '-03:00',
  minus2 = '-02:00',
  minus1 = '-01:00',
  plus0 = '+00:00',
  plus1 = '+01:00',
  plus2 = '+02:00',
  plus3 = '+03:00',
  plus330 = '+03:30',
  plus4 = '+04:00',
  plus430 = '+04:30',
  plus5 = '+05:00',
  plus530 = '+05:30',
  plus545 = '+05:45',
  plus6 = '+06:00',
  plus630 = '+06:30',
  plus7 = '+07:00',
  plus8 = '+08:00',
  plus845 = '+08:45',
  plus9 = '+09:00',
  plus930 = '+09:30',
  plus10 = '+10:00',
  plus1030 = '+10:30',
  plus11 = '+11:00',
  plus12 = '+12:00',
  plus1245 = '+12:45',
  plus13 = '+13:00',
  plus14 = '+14:00',
}

export interface WeekPlannerConfig {
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6
  timeslotHeight: number
  calendarGripGap: number
  padding: number
  spacing: number
  background: BackgroundProps['background']
  timeFormats: string[]
  minWidth: LayoutProps['minWidth']
  eventTypes: EventTypeConfig[]
  onSaveEvent: (event: WeekEventInput) => Promise<SaveResult>
  onDeleteEvent: (event: WeekEventInput) => Promise<DeleteResult>
  toastDurationMilli: number
  minuteIndicator: boolean
  isSkeleton: boolean
  isLoading: boolean
  ownerId?: string
  willDeleteEvent?: (
    event: WeekEventInput,
    completion: () => Promise<void>
  ) => void
}

export const weekPlannerStrings = {
  invalidTime: 'Invalid time',
  titleRequired: 'Title required',
  startTimeRequired: 'Start time required',
  endTimeRequired: 'End time required',
  addEvent: 'Add event',
  updateEvent: 'Update event',
  title: 'Title',
  eventTitlePlaceholder: 'eg Morning run',
  from: 'From',
  to: 'To',
  ends: 'Ends',
  sameDay: 'same day',
  notes: 'Notes',
  eventNotesPlaceholder: 'eg Target: 7km',
  busy: 'Busy',
  training: 'Training',
  game: 'Game',
  save: 'Save',
  delete: 'Delete',
  eventSaved: 'Event saved',
  eventDeleted: 'Event deleted',
  unexpectedError: 'Unexpected error',
  dateRangeWarning: 'Your event start date must be before the end date',
  today: 'Today',
  legend: 'Legend',
}

export const defaultConfig: WeekPlannerConfig = {
  weekStartsOn: 0,
  isLoading: false,
  isSkeleton: false,
  minuteIndicator: false,
  timeslotHeight: 60,
  calendarGripGap: 2,
  padding: 4,
  spacing: 4,
  background: 'gray.100',
  timeFormats: ['h:mm', 'h:m', 'h', 'hh', 'hh:m', 'hh:mm'],
  minWidth: 'container.lg',
  onSaveEvent: (event: WeekEventInput) => {
    console.error(
      `Implement the onSaveEvent function in WeekPlannerConfig.ts to save ${event.title}`
    )
    return new Promise((resolve) =>
      resolve({
        event: {
          ...event,
          id: event.id ? event.id : `${Math.random() * 1000 * 1000}`,
        },
      })
    )
  },
  onDeleteEvent: (event: WeekEventInput) => {
    console.error(
      `Implement the onDeleteEvent function in WeekPlannerConfig.ts to delete events`
    )
    return new Promise((resolve) => resolve({ event: { id: event.id! } }))
  },
  eventTypes: [
    {
      value: 'todo',
      label: 'Todo',
      colorScheme: 'orange',
      isDefault: true,
    },
    {
      value: 'work',
      label: 'Work',
      colorScheme: 'purple',
    },
    {
      value: 'other',
      label: 'Other',
      colorScheme: 'gray',
    },
  ],
  toastDurationMilli: 3000,
}
