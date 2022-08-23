import { Box, FormLabel, FormControl } from '@chakra-ui/react'
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'

export type InputProps = {
  name: string
  label?: string
} & ChakraInputProps

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref
) => (
  <Box>
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="yellow.500"
        ref={ref}
        {...rest}
      />
    </FormControl>
  </Box>
)

export const Input = forwardRef(InputBase)
