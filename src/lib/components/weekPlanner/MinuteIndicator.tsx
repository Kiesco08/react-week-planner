import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'

const MinuteIndicator = () => {
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinute(new Date().getMinutes())
    }, 1000 * 60)
    return () => clearInterval(interval)
  }, [setCurrentMinute])

  return (
    <>
      <Flex
        key={`current-minute`}
        bg="red.500"
        zIndex="overlay"
        position="absolute"
        top={`${currentMinute}px`}
        height={`2px`}
        width="full"
        opacity={0.4}
      />
    </>
  )
}

export default MinuteIndicator
