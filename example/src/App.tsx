import 'focus-visible/dist/focus-visible'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { WeekPlanner, EventTypeConfig, defaultConfig } from 'react-week-planner'
import theme from './theme'

const App: React.FC = () => {
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
      <WeekPlanner config={{ ...defaultConfig, eventTypes, weekStartsOn: 1 }} />
    </ChakraProvider>
  )
}

export default App
