import type { NextPage } from 'next'
import { Container, Heading } from '@chakra-ui/react'

const Home: NextPage = () => (
  <Container maxW='container.l' p={0}>
    <Heading size='4xl' color='teal'>
      This is very beutiful main page
    </Heading>
  </Container>
)

export default Home
