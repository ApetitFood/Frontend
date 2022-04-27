import { Flex, Box, useMediaQuery } from '@chakra-ui/react'
import { UserOutlined, HomeOutlined } from '@ant-design/icons'
import { useAuth } from '@/context/AuthContext'

import { Menu, ButtonLink } from './Menu'

function Header() {
  const { currentUser } = useAuth()
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  return (
    <Flex bgColor='azure' w='full' justify='center'>
      {currentUser ? (
        <Flex w='60%' justifyContent='space-between'>
          <Box>
            <ButtonLink link='/' name={<HomeOutlined />} />
          </Box>
          <Box>
            <Menu showMenu={!isMobile} />
            <ButtonLink
              link={`users/${currentUser!.uid}`}
              name={<UserOutlined />}
            />
          </Box>
        </Flex>
      ) : null}
    </Flex>
  )
}

export default Header
