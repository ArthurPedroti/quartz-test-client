import {
  Box,
  Avatar,
  Flex,
  Text,
  useBreakpointValue,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import Logo from 'components/Logo'
import { useAuth } from 'contexts/AuthContext'
import { useSidebarDrawer } from 'contexts/SidebarDrawerContext'
import { FiPower } from 'react-icons/fi'
import { RiMenuLine } from 'react-icons/ri'

export type HeaderProps = {
  name: string
  department: string
}

const Header = ({ name, department }: HeaderProps) => {
  const { signOut } = useAuth()
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    '2xl': true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open navigation"
          mr="2"
        />
      )}

      <Logo />

      <Flex align="center" ml="auto">
        <Box mr="4" textAlign="right">
          <Text>{name}</Text>
          <Text color="gray.300" fontSize="small">
            {department}
          </Text>
        </Box>

        <Menu>
          <Avatar as={MenuButton} size="md" name={name} src="" />
          <MenuList bg="gray.800" borderColor="gray.700">
            <MenuItem
              icon={<FiPower />}
              _active={{ background: 'gray.800' }}
              _focus={{ background: 'gray.800' }}
              _hover={{ color: 'yellow.400' }}
              onClick={signOut}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Header
