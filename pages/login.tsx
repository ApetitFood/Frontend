import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react'

import LoginForm from '../src/components/authentication/LoginForm'

const Login: NextPage = () => (
  <Container maxW='container.xl' maxH='container.xl' p={0}>
    <LoginForm />
  </Container>
)

export default Login
