import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme(
  {
    colors: {
      black: '#4A5568', // Gray 600
      brand: baseTheme.colors.teal,
      background: 'gray.50',
      backgroundDark: 'gray.100',
    },
    fonts,
    breakpoints,
    components: {
      Input: {
        defaultProps: {
          focusBorderColor: 'brand.500',
        },
      },
      Textarea: {
        defaultProps: {
          focusBorderColor: 'brand.500',
        },
      },
      Checkbox: {
        baseStyle: {
          control: {
            _focus: {
              boxShadow: 'transparent',
            },
          },
        },
      },
      Radio: {
        baseStyle: {
          control: {
            _focus: {
              boxShadow: 'transparent',
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
)

export default theme
