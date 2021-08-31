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
  Circle,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { format, add } from 'date-fns'
import { startOfWeek } from './utils/weekHelper'
import {
  defaultConfig,
  WeekPlannerConfig,
  weekPlannerStrings,
} from './utils/WeekPlannerConfig'
import { BsQuestionCircle } from 'react-icons/bs'

interface DateNavigatorProps {
  date: Date
  setDate: (date: Date) => void
  setWeekStart?: (weekStart: Date) => void
  config?: WeekPlannerConfig
}

const DateNavigator = ({
  date,
  setDate,
  setWeekStart,
  config = defaultConfig,
}: DateNavigatorProps) => {
  const { weekStartsOn, eventTypes } = config
  const updateDates = (newDate: Date) => {
    setDate(newDate)
    if (setWeekStart) setWeekStart(startOfWeek(newDate, weekStartsOn))
  }
  const Help = () => (
    <Popover trigger="hover">
      <PopoverTrigger>
        <IconButton
          aria-label="help"
          icon={<BsQuestionCircle />}
          variant="link"
          size="lg"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>{weekPlannerStrings.legend}</PopoverHeader>
        <PopoverBody>
          <Stack>
            {eventTypes.map((eventType) => (
              <HStack key={eventType.label}>
                <Circle backgroundColor={eventType.colorScheme} size={4} />
                <Text>{eventType.label}</Text>
              </HStack>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
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
          <Help />
          <HStack>
            <IconButton
              aria-label="last-week"
              icon={<FaChevronLeft />}
              variant="outline"
              onClick={() => updateDates(add(date, { weeks: -1 }))}
            />
            <Button onClick={() => updateDates(new Date())} variant="outline">
              {weekPlannerStrings.today}
            </Button>
            <IconButton
              aria-label="next-week"
              icon={<FaChevronRight />}
              variant="outline"
              onClick={() => updateDates(add(date, { weeks: 1 }))}
            />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  )
}

export default DateNavigator
