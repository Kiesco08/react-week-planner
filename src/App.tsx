import 'focus-visible/dist/focus-visible'
import { ChakraProvider } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  WeekPlanner,
  EventTypeConfig,
  defaultConfig,
  WeekEvent,
} from './lib/components/weekPlanner'
import theme from './theme'

const App: React.FC = () => {
  const [events, setEvents] = useState<WeekEvent[]>([])

  enum EventType {
    Training = 'training',
    Busy = 'busy',
    Game = 'game',
    Other = 'other',
  }
  const eventTypes: EventTypeConfig[] = [
    {
      value: EventType.Training,
      label:
        EventType.Training.charAt(0).toUpperCase() +
        EventType.Training.slice(1),
      colorScheme: 'orange',
      isDefault: true,
    },
    {
      value: EventType.Busy,
      label: EventType.Busy.charAt(0).toUpperCase() + EventType.Busy.slice(1),
      colorScheme: 'gray',
    },
    {
      value: EventType.Game,
      label: EventType.Game.charAt(0).toUpperCase() + EventType.Game.slice(1),
      colorScheme: 'green',
    },
    {
      value: EventType.Other,
      label: EventType.Other.charAt(0).toUpperCase() + EventType.Other.slice(1),
      colorScheme: 'teal',
    },
  ]

  return (
    <ChakraProvider resetCSS theme={theme}>
      <WeekPlanner
        events={events}
        setEvents={setEvents}
        setWeekStart={() => {}}
        config={{ ...defaultConfig, eventTypes }}
      />
    </ChakraProvider>
  )
}

export default App
