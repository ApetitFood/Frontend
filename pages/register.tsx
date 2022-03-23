import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react'

import RegisterForm from '../src/components/authentication/RegisterForm'

const Register: NextPage = () => (
  <Container maxW='container.xl' p={0}>
    <RegisterForm />
  </Container>
)

export default Register
