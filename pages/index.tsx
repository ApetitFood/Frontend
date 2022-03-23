import type { NextPage } from 'next'
import { Container, Heading, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '../src/context/AuthContext'
import { protectRoute } from '../src/utils'

const Home: NextPage = () => {
  const { currentUser } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    protectRoute(currentUser, router)
    setLoading(false)
  }, [currentUser, router])

  return !loading && currentUser ? (
    <Container maxW='container.l' p={0}>
      <Heading size='4xl' color='teal'>
        This is very beutiful main page
      </Heading>
      <Link href={`users/${currentUser!.uid}`}>Go to my profile</Link>
    </Container>
  ) : null
}

export default Home
