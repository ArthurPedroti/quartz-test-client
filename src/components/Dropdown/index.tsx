import { Box, FormLabel, FormControl } from '@chakra-ui/react'
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'

export type SelectProps = {
  name: string
  label?: string
  items: {
    label: string
    value: number | string
    disabled?: boolean
  }[]
} & ChakraSelectProps
const DropdownBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, items, ...rest },
  ref
) => (
  <Box>
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraSelect
        name={name}
        id={name}
        {...rest}
        ref={ref}
        focusBorderColor="yellow.500"
      >
        {items?.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  </Box>
)

export const Dropdown = forwardRef(DropdownBase)
