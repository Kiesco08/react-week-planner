import { Box, Spacer } from '@chakra-ui/react'
import React, { createRef, useState } from 'react'
import DateNavigator from './DateNavigator'
import TimeTable from './timeTable/TimeTable'
import { WeekPlannerConfig, defaultConfig } from './utils/WeekPlannerConfig'
import WeekDaysHeader from './WeekDaysHeader'
import WeekEvent from './WeekEvent'

interface WeekPlannerProps {
  config?: WeekPlannerConfig
  events?: WeekEvent[]
  setEvents?: (events: WeekEvent[]) => void
  setWeekStart?: (weekStart: Date) => void
}

const WeekPlanner: React.FC<WeekPlannerProps> = ({
  config = defaultConfig,
  events = [],
  setEvents,
  setWeekStart,
}) => {
  const [_date, setDate] = useState(new Date())
  const { calendarGripGap, background, padding, spacing } = config
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
        events={events}
        setEvents={setEvents}
        config={config}
        scrollWeekDays={scrollWeekDays}
      />
    </Box>
  )
}

export default WeekPlanner
