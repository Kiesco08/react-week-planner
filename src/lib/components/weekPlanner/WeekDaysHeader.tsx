import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import {
  Box,
  Center,
  Text,
  Flex,
  SystemProps,
  SimpleGrid,
} from '@chakra-ui/react'
import weekDays from './utils/weekDays'
import { isToday } from 'date-fns'
import { WeekPlannerConfig, defaultConfig } from './utils/WeekPlannerConfig'
import useSWR from 'swr'

interface WeekDaysHeaderProps {
  date: Date
  gap: SystemProps['gridGap']
  config?: WeekPlannerConfig
  scrollTimeTable: (left: number) => void
}

const WeekDaysHeader = forwardRef(
  (
    { gap, date, config = defaultConfig, scrollTimeTable }: WeekDaysHeaderProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { spacing, minWidth, weekStartsOn } = config
    const { data: days } = useSWR('weekDays', () => {
      return weekDays(date, weekStartsOn)
    })
    const [_days, setDays] = useState(days || [])
    const longestHourLabel = '12 AM'

    useEffect(() => {
      setDays(weekDays(date, weekStartsOn))
    }, [date, weekStartsOn])

    return (
      <Flex>
        {/* Dummy column. TODO: set to width of time column programmatically */}
        <SimpleGrid columns={1} gap={gap}>
          <Box key={'dummy-column'} visibility="hidden">
            <Center>
              <Text fontWeight="semibold">{longestHourLabel}</Text>
            </Center>
          </Box>
        </SimpleGrid>
        <Box width={spacing / 2} />
        {/* Week days grid */}
        <Flex
          ref={ref}
          flexDirection="column"
          overflowX="scroll"
          flex={1}
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          onScroll={(event) => scrollTimeTable(event.currentTarget.scrollLeft)}
        >
          <Box minWidth={minWidth}>
            <SimpleGrid columns={7} gap={gap} flex={1}>
              {_days.map((weekDay) => (
                <Text
                  key={weekDay.label}
                  color={isToday(weekDay.raw) ? 'brand.500' : undefined}
                  fontSize="lg"
                  fontWeight="semibold"
                  textAlign="center"
                >
                  {`${weekDay.label.toUpperCase()} ${weekDay.dayOfMonth}`}
                </Text>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Flex>
    )
  }
)

export default WeekDaysHeader
