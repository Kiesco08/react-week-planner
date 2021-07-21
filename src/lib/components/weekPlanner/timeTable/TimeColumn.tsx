import React, { useEffect, useRef } from 'react'
import { Box, Center, Text, SystemProps, SimpleGrid } from '@chakra-ui/react'
import { isThisHour } from 'date-fns'
import { WeekPlannerConfig, defaultConfig } from '../utils/WeekPlannerConfig'
import dayHours from '../utils/dayHours'

interface TimeColumnProps {
  date: Date
  gap: SystemProps['gridGap']
  config?: WeekPlannerConfig
}

const TimeColumn = ({ date, gap, config = defaultConfig }: TimeColumnProps) => {
  const { timeslotHeight, isSkeleton } = config
  const currentTimeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isSkeleton) return
    const currentTime = currentTimeRef.current
    if (!currentTime) return
    currentTime.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [currentTimeRef, date, isSkeleton])

  return (
    <SimpleGrid columns={1} gap={gap}>
      {dayHours(date).map((hour) => (
        <Box
          ref={
            isThisHour(
              new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                hour.raw
              )
            )
              ? currentTimeRef
              : undefined
          }
          key={hour.label}
          height={`${timeslotHeight}px`}
        >
          <Center>
            <Text fontWeight="semibold">{hour.label}</Text>
          </Center>
        </Box>
      ))}
    </SimpleGrid>
  )
}

export default TimeColumn
