import React from 'react'
import {
  Box,
  Text,
  Flex,
  useDisclosure,
  HStack,
  Icon,
  Spacer,
} from '@chakra-ui/react'
import {
  format,
  getMinutes,
  differenceInMinutes,
  differenceInHours,
} from 'date-fns'
import WeekEvent, { MultidayState } from '../WeekEvent'
import { WeekPlannerConfig, defaultConfig } from '../utils/WeekPlannerConfig'
import EventModal from './EventModal'
import { BiPencil } from 'react-icons/bi'

interface EventBoxProps {
  event: WeekEvent
  multidayState: MultidayState
  onSave: (event: WeekEvent) => void
  onDelete: (event: WeekEvent['id']) => void
  config?: WeekPlannerConfig
}

const EventBox = ({
  event,
  multidayState,
  onSave,
  onDelete,
  config = defaultConfig,
}: EventBoxProps) => {
  const { calendarGripGap, eventTypes, ownerId } = config
  const { isOpen, onOpen, onClose } = useDisclosure()

  let backgroundColor = 'gray'
  const filteredEventType = eventTypes.filter(
    (eventType) => eventType.value === event.type
  )
  if (filteredEventType && filteredEventType.length > 0) {
    const eventType = filteredEventType[0]
    backgroundColor = eventType.colorScheme
  }

  // Color style
  let color = 'white'
  if (event.creatorId && ownerId && event.creatorId !== ownerId) {
    backgroundColor = `${backgroundColor}.200`
    color = `${backgroundColor}.800`
  }

  const start = new Date(event.start.getTime())
  start.setHours(24, 0, 0, 0)
  const nearestMidnightInFuture = start

  const end = new Date(event.end.getTime())
  end.setHours(0, 0, 0, 0)
  const lastMidnightBeforeEnd = end

  const oClockFormat = 'h a'
  const regularFormat = 'h:m a'
  const formattingRule = start.getMinutes() === 0 ? oClockFormat : regularFormat

  // For first day
  const fromStartToEnd =
    differenceInMinutes(event.end, event.start) +
    (differenceInHours(event.end, event.start) - 1) * calendarGripGap
  const fromStartToMidnight =
    differenceInMinutes(nearestMidnightInFuture, event.start) +
    (differenceInHours(nearestMidnightInFuture, event.start) - 1) *
      calendarGripGap
  const heightOnFirstDay = Math.min(fromStartToEnd, fromStartToMidnight)

  // For last day
  const fromMidnightToEnd =
    differenceInMinutes(event.end, lastMidnightBeforeEnd) +
    (differenceInHours(event.end, lastMidnightBeforeEnd) - 1) * calendarGripGap
  const heightOnLastDay = fromMidnightToEnd

  // For middle day
  const hoursInDay = 24
  const minutesInDay = 60 * hoursInDay
  const fromMidnightToMidnight =
    minutesInDay + (hoursInDay - 1) * calendarGripGap
  const heightOnMiddleDay = fromMidnightToMidnight

  let top: number
  let height: number
  let showtime: boolean
  switch (multidayState) {
    case MultidayState.FIRST_DAY:
      top = getMinutes(event.start)
      height = heightOnFirstDay
      showtime = true
      break
    case MultidayState.MIDDLE_DAY:
      top = 0
      height = heightOnMiddleDay
      showtime = false
      break
    case MultidayState.LAST_DAY:
      top = 0
      height = heightOnLastDay
      showtime = false
      break
  }

  // Title appearance based on duration
  const hourInMin = 60
  const fifteenMin = hourInMin / 4
  const twentyMin = hourInMin / 3
  const twentyFiveMin = hourInMin / 2.4
  const duration = differenceInMinutes(event.end, event.start)
  if (duration <= hourInMin / 1.5) {
    showtime = false
  }

  return (
    <Flex
      key={`${event.id}`}
      zIndex="overlay"
      position="absolute"
      top={`${top}px`}
      height={`${height}px`}
      minHeight={`${fifteenMin}px`}
      maxHeight={`${Math.max(height, fifteenMin)}px`}
      width="full"
      onClick={(event) => {
        onOpen()
        event.stopPropagation()
      }}
    >
      <Box
        backgroundColor={backgroundColor}
        flex={1}
        rounded="lg"
        padding={height > twentyFiveMin ? 1 : 0}
        paddingX={1}
        margin="1px"
        color={color}
        cursor="pointer"
        width="full"
      >
        {showtime ? (
          <HStack>
            <Text fontSize="small" lineHeight={1}>
              {format(event.start, formattingRule)}
            </Text>
            <Spacer />
            {event.notes && showtime ? <Icon as={BiPencil} /> : null}
          </HStack>
        ) : null}
        <HStack spacing={1}>
          {!event.notes || showtime ? null : <Icon boxSize={3} as={BiPencil} />}
          <Text
            fontSize={height > twentyFiveMin ? 'small' : 'x-small'}
            fontWeight="semibold"
            noOfLines={
              height < hourInMin ? 1 : Math.floor(height / twentyMin) - 1
            }
          >
            {event.title}
          </Text>
        </HStack>
      </Box>
      {isOpen ? (
        <EventModal
          isOpen={isOpen}
          onClose={onClose}
          event={event}
          onSave={onSave}
          onDelete={onDelete}
          config={config}
        />
      ) : null}
    </Flex>
  )
}

export default EventBox
