import React from 'react'
import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { format, add, startOfWeek } from 'date-fns'

interface DateNavigatorProps {
  date: Date
  setDate: (date: Date) => void
  setWeekStart?: (weekStart: Date) => void
}

const DateNavigator = ({ date, setDate, setWeekStart }: DateNavigatorProps) => {
  const updateDates = (newDate: Date) => {
    setDate(newDate)
    if (setWeekStart) setWeekStart(startOfWeek(newDate))
  }
  return (
    <Box>
      <Flex>
        {/* Month Year */}
        <Center>
          <Text fontSize="x-large" fontWeight="semibold">{`${format(
            date,
            'MMMM'
          )} ${format(date, 'yyyy')}`}</Text>
        </Center>
        <Spacer />
        {/* Date switcher */}
        <HStack>
          <IconButton
            aria-label="last-week"
            icon={<FaChevronLeft />}
            variant="outline"
            onClick={() => updateDates(add(date, { weeks: -1 }))}
          />
          <Button onClick={() => updateDates(new Date())} variant="outline">
            Today
          </Button>
          <IconButton
            aria-label="next-week"
            icon={<FaChevronRight />}
            variant="outline"
            onClick={() => updateDates(add(date, { weeks: 1 }))}
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default DateNavigator
