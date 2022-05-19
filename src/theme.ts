import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react'

const fonts = {
  body: `"Inter", sans-serif`,
  heading: `"Inter", sans-serif`
}

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'semibold',
    letterSpacing: 'wider'
  }
}

export const theme = extendTheme({
  fonts,
  components: {
    Button
  }
})
