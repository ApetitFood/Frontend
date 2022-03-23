import { Flex, Spacer, Box, Spinner } from '@chakra-ui/react'
import { UserOutlined, HomeOutlined } from '@ant-design/icons'

import { useAuth } from '@/context/AuthContext'

import { Mobile, ButtonLink } from './Menu'

function Header() {
  const { currentUser } = useAuth()

  return (
    <div>
      {currentUser ? (
        <Flex>
          <Box>
            <ButtonLink link='/' name={<HomeOutlined />} />
          </Box>
          <Spacer />
          <Box>
            <Mobile header={true} />
            <ButtonLink
              link={`users/${currentUser!.uid}`}
              name={<UserOutlined />}
            />
          </Box>
        </Flex>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Header
