import type { NextPage } from 'next'
import { Container, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/context/AuthContext'
import { protectRoute } from '@/utils'
import AddRecipeModal from '@/components/recipe/AddRecipeModal'

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
      <AddRecipeModal />
    </Container>
  ) : null
}

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default Home
