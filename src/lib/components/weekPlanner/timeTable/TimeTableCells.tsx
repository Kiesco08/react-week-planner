import React from 'react'
import {
  Box,
  SimpleGrid,
  Skeleton,
  SystemProps,
  useDisclosure,
} from '@chakra-ui/react'
import { add, isToday } from 'date-fns'
import dayHours, { DayHour } from '../utils/dayHours'
import WeekEvent from '../WeekEvent'
import weekDays, { WeekDay } from '../utils/weekDays'
import { WeekPlannerConfig, defaultConfig } from '../utils/WeekPlannerConfig'
import MinuteIndicator from '../MinuteIndicator'
import EventBox from './EventBox'
import EventModal from './EventModal'
import {
  getMultiDayState,
  isResumingFromPast,
  isStartingThisHour,
} from '../utils/timeHelper'

interface TimeTableCellsProps {
  date: Date
  events: WeekEvent[]
  setEvents?: (events: WeekEvent[]) => void
  gap: SystemProps['gridGap']
  config?: WeekPlannerConfig
}

const TimeTableCells = ({
  date,
  events,
  setEvents,
  gap,
  config = defaultConfig,
}: TimeTableCellsProps) => {
  const { timeslotHeight, eventTypes, minuteIndicator, isSkeleton, isLoading } =
    config

  const hours = dayHours()
  const currentHour = new Date().getHours()

  let defaultEventType = eventTypes[0].value
  const filteredEventTypes = eventTypes.filter(
    (eventType) => eventType.isDefault
  )
  if (filteredEventTypes && filteredEventTypes.length > 0) {
    defaultEventType = filteredEventTypes[0].value
  }

  const DaysOfHour = ({ day, hour }: { day: WeekDay; hour: DayHour }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const accurateDate = day.raw
    accurateDate.setHours(hour.raw)
    const isCurrentHourBox = hour.raw === currentHour
    return (
      <Box
        height={`${timeslotHeight}px`}
        bg="white"
        position="relative"
        onClick={onOpen}
        cursor="pointer"
      >
        {isLoading || isSkeleton ? (
          <Skeleton width="full" height="full" />
        ) : (
          <>
            {events.map((event) => {
              return (
                <Box key={`${event.id}`}>
                  {isStartingThisHour(event, accurateDate) ||
                  isResumingFromPast(event, accurateDate) ? (
                    <EventBox
                      event={event}
                      multidayState={getMultiDayState(event, accurateDate)}
                      onSave={(event) => {
                        const oldEvents = events.filter(
                          (oldEvent) => event.id !== oldEvent.id
                        )
                        if (setEvents) setEvents([...oldEvents, event])
                      }}
                      onDelete={(eventId) => {
                        if (setEvents)
                          setEvents(
                            events.filter((oldEvent) => oldEvent.id !== eventId)
                          )
                      }}
                      config={config}
                    />
                  ) : null}
                </Box>
              )
            })}
            {isCurrentHourBox && isToday(day.raw) && minuteIndicator ? (
              <MinuteIndicator />
            ) : null}
            {isOpen ? (
              <EventModal
                isOpen={isOpen}
                onClose={onClose}
                event={{
                  title: '',
                  start: accurateDate,
                  end: add(accurateDate, { hours: 1 }),
                  notes: '',
                  type: defaultEventType,
                }}
                onSave={(event) => {
                  if (setEvents) setEvents([...events, event])
                }}
                onDelete={() => {}}
                config={config}
              />
            ) : null}
          </>
        )}
      </Box>
    )
  }

  return (
    <SimpleGrid flex={1} columns={7} gap={gap} position="relative">
      {hours.flatMap((hour) => {
        return weekDays(date).map((day, _) => (
          <DaysOfHour key={`${day.raw}-${hour.raw}`} hour={hour} day={day} />
        ))
      })}
    </SimpleGrid>
  )
}

export default TimeTableCells
