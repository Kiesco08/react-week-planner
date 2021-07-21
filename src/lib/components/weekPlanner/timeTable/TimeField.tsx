import React, { InputHTMLAttributes } from 'react'
import {
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { format, isValid } from 'date-fns'
import { useField } from 'formik'
import { parseTimeUsingDate } from '../utils/timeHelper'

type TimeFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  date: Date
  onDate: (date: Date) => void
  timeFormats: string[]
}

const TimeField: React.FC<TimeFieldProps> = ({
  size: _,
  timeFormats,
  ...props
}) => {
  const [field, { error }] = useField(props)
  const { label, hidden, date, onDate, ...rest } = props
  const formattedTime = format(date, timeFormats[0])

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} hidden={hidden} marginBottom={'auto'}>
        {label}
      </FormLabel>
      <HStack>
        <Input
          width={'20'}
          id={field.name}
          {...field}
          {...rest}
          placeholder={formattedTime}
          onChange={(event) => {
            field.onChange?.(event)
            const value = event.target.value
            const dateTime: Date = parseTimeUsingDate(
              undefined,
              value,
              date,
              timeFormats
            )
            if (isValid(dateTime)) {
              date.setHours(dateTime.getHours())
              date.setMinutes(dateTime.getMinutes())
              onDate(date)
            }
          }}
        />
        <Button
          variant={'outline'}
          padding={0}
          onClick={() => {
            const hours = date.getHours()
            date.setHours(hours < 12 ? hours + 12 : hours - 12)
            onDate(date)
          }}
        >
          {date.getHours() < 12 ? 'AM' : 'PM'}
        </Button>
      </HStack>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default TimeField
