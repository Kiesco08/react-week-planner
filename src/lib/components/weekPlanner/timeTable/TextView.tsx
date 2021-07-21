import React, { InputHTMLAttributes } from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react'
import { useField } from 'formik'
import { ReactNode } from 'react'

type TextViewProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  placeholder: string
  icon?: ReactNode
}

const TextView: React.FC<TextViewProps> = ({ ...props }) => {
  const [field, { error }] = useField({ ...props })
  const { label, hidden, placeholder, icon } = props
  return (
    <FormControl isInvalid={!!error}>
      <HStack>
        {icon}
        <FormLabel htmlFor={field.name} hidden={hidden} marginBottom={'auto'}>
          {label}
        </FormLabel>
      </HStack>
      <Textarea {...field} id={field.name} placeholder={placeholder} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default TextView
