import React from 'react'
import { useRouter } from 'next/router'
import {
  Container,
  Center,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
} from '@chakra-ui/react'

import { User } from '../../types'
import { useAuth } from '../../context/AuthContext'

const UserProfile = ({ user }: { user: User }) => {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async (event: any) => {
    event.preventDefault()
    await logout()

    router.push('/login')
  }

  return (
    <Container mt={4}>
      <Center>
        <VStack>
          <Heading>{`${user.firstName} ${user.lastName}`}</Heading>
          <Text>{`Mode: ${user.mode}`}</Text>
          <Button variant='alarm' width='full' onClick={handleLogout}>
            Log out
          </Button>
        </VStack>
      </Center>
      <Divider p={10} />
      <Text pt={5} textAlign='center'>
        You will see your posts here in near future
      </Text>
    </Container>
  )
}

export default UserProfile
