import { Flex, Box, useBreakpointValue, useMediaQuery } from '@chakra-ui/react'

import { Menu } from './Menu'

const Footer = () => {
  const Height = useBreakpointValue({ base: '40px', md: '0px' })
  const [showFooter] = useMediaQuery('(max-width: 768px)')

  return (
    <div>
      <Flex height={Height} justifyContent={'space-around'}>
        <Box position={'fixed'} bottom={'0px'}>
          <Menu showMenu={showFooter} />
        </Box>
      </Flex>
    </div>
  )
}

export default Footer
