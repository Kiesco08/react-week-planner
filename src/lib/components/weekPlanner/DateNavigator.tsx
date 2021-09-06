import React from 'react'
import {
  Box,
  Button,
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
  useBreakpointValue,
  StackDirection,
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { format, add } from 'date-fns'
import { startOfWeek } from './utils/weekHelper'
import {
  defaultConfig,
  Timezone,
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
  const { weekStartsOn, eventTypes, timezone } = config
  const monthFormat = useBreakpointValue({ base: 'MMM', sm: 'MMMM' }) ?? 'MMMM'
  const direction: StackDirection =
    useBreakpointValue({ base: 'column', sm: 'row' }) ?? 'row'
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
        <Stack direction={direction}>
          <Text fontSize="x-large" fontWeight="semibold">{`${format(
            date,
            monthFormat
          )} ${format(date, 'yyyy')}`}</Text>
          <Text fontSize="sm" color="gray" alignSelf="center">
            {`GMT${
              timezone === Timezone.plus0
                ? ''
                : timezone.substring(0, 1) + // + or -
                  parseInt(timezone.substring(1, 3)) + // hours
                  (timezone.substring(4, 6) === '00'
                    ? ''
                    : timezone.substring(3, 6)) // semi-colon + minutes
            }`}
          </Text>
        </Stack>
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
