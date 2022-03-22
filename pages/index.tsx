import type { NextPage } from 'next'
import { Container, Heading } from "@chakra-ui/react"
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

const Home: NextPage = () => (
  <Container maxW='container.l' p={0}>
    <Header/>
    <Heading size='4xl' color='teal'>
      This is very beutiful main page
    </Heading>
    <Footer/>
  </Container>
)

export default Home
