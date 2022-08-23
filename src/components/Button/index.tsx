import { Box } from '@chakra-ui/react'
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps
} from '@chakra-ui/react'

export type ButtonProps = {
  text: string
} & ChakraButtonProps

const Button = ({ text, ...rest }: ButtonProps) => (
  <Box>
    <ChakraButton {...rest}>{text}</ChakraButton>
  </Box>
)

export default Button
