import { Box, Spacer } from '@chakra-ui/react'
import React, { createRef, useState } from 'react'
import DateNavigator from './DateNavigator'
import TimeTable from './timeTable/TimeTable'
import { WeekPlannerConfig, defaultConfig } from './utils/WeekPlannerConfig'
import WeekDaysHeader from './WeekDaysHeader'
import WeekEvent from './WeekEvent'
import { utcToZonedTime } from 'date-fns-tz'

interface WeekPlannerProps {
  config?: WeekPlannerConfig
  events?: WeekEvent[]
}

const WeekPlanner: React.FC<WeekPlannerProps> = ({
  config = defaultConfig,
  events = [],
}) => {
  const {
    calendarGripGap,
    background,
    padding,
    spacing,
    timezone,
    setWeekStart,
  } = config
  const [_date, setDate] = useState(utcToZonedTime(new Date(), timezone))
  const [_events, setEvents] = useState(
    events.map((event) => ({
      ...event,
      start: utcToZonedTime(event.start, timezone),
      end: utcToZonedTime(event.end, timezone),
    }))
  )
  const gap = `${calendarGripGap}px`
  const timeTableRef = createRef<HTMLDivElement>()
  const daysViewRef = createRef<HTMLDivElement>()

  const scrollWeekDays = (left: number) => {
    const daysView = daysViewRef.current
    if (!daysView) return
    daysView.scrollLeft = left
  }

  const scrollTimeTable = (left: number) => {
    const timeTable = timeTableRef.current
    if (!timeTable) return
    timeTable.scrollLeft = left
  }

  return (
    <Box background={background} paddingBottom={padding} paddingX={padding}>
      <Box
        position="sticky"
        top={0}
        paddingTop={padding}
        paddingBottom={spacing / 2}
        background={background}
        zIndex="modal"
      >
        <DateNavigator
          date={_date}
          setDate={setDate}
          setWeekStart={setWeekStart}
          config={config}
        />
        <Spacer height={spacing * 2} />
        <WeekDaysHeader
          ref={daysViewRef}
          date={_date}
          gap={gap}
          config={config}
          scrollTimeTable={scrollTimeTable}
        />
      </Box>
      <TimeTable
        ref={timeTableRef}
        date={_date}
        gap={gap}
        events={_events}
        setEvents={setEvents}
        config={config}
        scrollWeekDays={scrollWeekDays}
      />
    </Box>
  )
}

export default WeekPlanner
