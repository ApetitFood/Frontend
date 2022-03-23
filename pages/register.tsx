import type { NextPage } from 'next'
import { Container } from '@chakra-ui/react'

import RegisterForm from '@/components/authentication/RegisterForm'

const Register: NextPage = () => (
  <Container maxW='container.xl' p={0}>
    <RegisterForm />
  </Container>
)

export async function getServerSideProps() {
  return {
    props: {
      protected: false,
    },
  }
}

export default Register
