import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { add, format, isSameDay } from 'date-fns'
import isToday from 'date-fns/isToday'
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { WeekPlannerConfig, defaultConfig } from '../utils/WeekPlannerConfig'
import monthDays from '../utils/monthDays'
import weekDays from '../utils/weekDays'

interface DatePickerProps {
  date: Date
  onDate: (date: Date) => void
  config?: WeekPlannerConfig
}

const DatePicker = ({
  date,
  onDate,
  config = defaultConfig,
}: DatePickerProps) => {
  const { calendarGripGap, spacing, background, padding, weekStartsOn } = config
  const gap = `${calendarGripGap}px`
  const [_date, setDate] = useState(new Date(date))
  const [selectedDate, selectDate] = useState(new Date(date))

  const DateNavigator = () => {
    return (
      <Box>
        <Flex>
          {/* Month Year */}
          <Center paddingX={spacing / 2}>
            <Text fontWeight="semibold">{`${format(_date, 'MMMM')} ${format(
              _date,
              'yyyy'
            )}`}</Text>
          </Center>
          <Spacer />
          {/* Date switcher */}
          <HStack>
            <IconButton
              aria-label="last-week"
              icon={<FaChevronLeft />}
              variant="outline"
              onClick={() => setDate(add(_date, { months: -1 }))}
              size="sm"
            />
            <Button
              onClick={() => setDate(new Date())}
              variant="outline"
              size="sm"
            >
              Today
            </Button>
            <IconButton
              aria-label="next-week"
              icon={<FaChevronRight />}
              variant="outline"
              onClick={() => setDate(add(_date, { months: 1 }))}
              size="sm"
            />
          </HStack>
        </Flex>
      </Box>
    )
  }

  const WeekDaysHeader = () => {
    const days = weekDays(_date, weekStartsOn)
    return (
      <Flex>
        <SimpleGrid columns={7} gap={gap} flex={1}>
          {days.map((weekDay) => (
            <Text key={weekDay.label} fontWeight="semibold" textAlign="center">
              {`${weekDay.label.toUpperCase()}`}
            </Text>
          ))}
        </SimpleGrid>
      </Flex>
    )
  }

  return (
    <Box background={background} padding={padding} rounded="lg">
      <DateNavigator />
      <Spacer height={spacing / 2} />
      <WeekDaysHeader />
      <Spacer height={spacing / 2} />
      <SimpleGrid flex={1} columns={7} gap={gap}>
        {monthDays(_date, weekStartsOn).map((day) => {
          return (
            <Center
              key={`${day.raw}`}
              color={isToday(day.raw) ? 'brand.500' : undefined}
              bg={isSameDay(selectedDate, day.raw) ? 'brand.200' : undefined}
              rounded="lg"
              cursor="pointer"
              onClick={() => {
                const rawDay = day.raw
                selectDate(rawDay)

                const dateToReturn = new Date(date)
                dateToReturn.setFullYear(rawDay.getFullYear())
                dateToReturn.setMonth(rawDay.getMonth())
                dateToReturn.setDate(rawDay.getDate())
                onDate(dateToReturn)
              }}
            >
              <Text>{day.label}</Text>
            </Center>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

export default DatePicker
