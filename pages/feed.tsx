import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react'

import Feed from "@/components/Feed"

const Login: NextPage = () => (
  <Container maxW='container.xl' maxH='container.xl' p={0}>
    <Feed/>
  </Container>
)

export async function getServerSideProps() {
  return {
    props: {
      protected: true,
    },
  }
}

export default Login
