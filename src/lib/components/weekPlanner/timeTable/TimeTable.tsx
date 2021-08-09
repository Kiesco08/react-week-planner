import React, { ForwardedRef, forwardRef } from 'react'
import { Box, Flex, SystemProps } from '@chakra-ui/react'
import TimeTableCells from './TimeTableCells'
import WeekEvent from '../WeekEvent'
import TimeColumn from './TimeColumn'
import { WeekPlannerConfig, defaultConfig } from '../utils/WeekPlannerConfig'
interface TimeTableProps {
  date: Date
  gap: SystemProps['gridGap']
  events: WeekEvent[]
  setEvents?: (events: WeekEvent[]) => void
  config?: WeekPlannerConfig
  scrollWeekDays: (left: number) => void
}

const TimeTable = forwardRef(
  (
    {
      date,
      gap,
      events,
      setEvents,
      config = defaultConfig,
      scrollWeekDays,
    }: TimeTableProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { spacing, minWidth } = config
    return (
      <Flex flexDirection="column">
        <Flex>
          <TimeColumn date={date} gap={gap} config={config} />
          <Box width={spacing / 2} />
          <Flex
            ref={ref}
            flexDirection="column"
            overflowX="scroll"
            flex={1}
            backgroundColor="gray.100"
            onScroll={(event) => scrollWeekDays(event.currentTarget.scrollLeft)}
          >
            <Box minWidth={minWidth}>
              <TimeTableCells
                date={date}
                events={events}
                gap={gap}
                setEvents={setEvents}
                config={config}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    )
  }
)

export default TimeTable
