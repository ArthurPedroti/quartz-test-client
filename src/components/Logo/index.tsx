import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import quartz from '../../assets/quartz2.png'

const Logo = () => (
  <Box>
    <Image src={quartz} />
  </Box>
)

export default Logo
