import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name: string
  placeholder: string
}

const InputField: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field, { error }] = useField(props)
  const { label, hidden } = props
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name} hidden={hidden} margin={'auto'}>
        {label}
      </FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
}

export default InputField
