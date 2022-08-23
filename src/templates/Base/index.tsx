import { Box, Flex } from '@chakra-ui/react'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import sidebarMock from 'components/Sidebar/mock'
import { useAuth } from 'contexts/AuthContext'

export type BaseProps = {
  children: React.ReactNode
}

const Base = ({ children }: BaseProps) => {
  const { user } = useAuth()

  return (
    <Flex direction="column" h="100vh">
      <Header name={user?.name || ''} department={user?.department || ''} />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar menuItems={sidebarMock} />

        <Box flex="1" bg="gray.800" p={['6', '8']} borderRadius={8}>
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}

export default Base
