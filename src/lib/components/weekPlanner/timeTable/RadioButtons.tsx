import {
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Theme,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type RadioButtonOptionType = string | number | undefined
export interface RadioButtonOption {
  value: RadioButtonOptionType
  label: string
  colorScheme: keyof Theme['colors']
  onOption?: () => void
}

type RadioButtonsProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name: string
  options: RadioButtonOption[]
}

const RadioButtons = ({ options, ...props }: RadioButtonsProps) => {
  const [field] = useField({ ...props })
  const { onChange, ...rest } = field
  const { label } = props
  return (
    <FormControl>
      <FormLabel htmlFor={field.name} marginBottom={'auto'}>
        {label}
      </FormLabel>
      <RadioGroup {...rest} id={field.name} name={field.name}>
        <Wrap>
          {options.map((option: RadioButtonOption) => (
            <WrapItem key={option.value}>
              <Radio
                value={option.value}
                cursor="pointer"
                onChange={(event) => {
                  onChange(event)
                  if (option.onOption) option.onOption()
                }}
                colorScheme={option.colorScheme}
              >
                <Text cursor="pointer">{option.label}</Text>
              </Radio>
            </WrapItem>
          ))}
        </Wrap>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioButtons
