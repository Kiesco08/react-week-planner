import { BackgroundProps, LayoutProps } from '@chakra-ui/react'
import WeekEvent from '../WeekEvent'
import { Theme } from '@chakra-ui/react'
import { string } from 'yup/lib/locale'

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
