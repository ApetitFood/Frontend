import React, { useRef, useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Heading,
  Text,
  Flex,
  VStack,
  SimpleGrid,
  GridItem,
  Alert,
  AlertIcon,
  FormErrorMessage,
  useBreakpointValue,
} from '@chakra-ui/react'

import AuthPageLogo from './AuthenticationPageLogo'
import { useAuth } from '../context/AuthContext'
import TextField from './TextField'

const RegisterHeader = () => {
  return (
    <Box textAlign='center' w='full'>
      <Heading size='2xl' fontFamily='Shadows into light'>
        Sign Up
      </Heading>
    </Box>
  )
}

const RegisterForm = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 })
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object({
        firstName: yup.string().trim().required('First name is required'),
        lastName: yup.string().trim().required('Last name is required'),
        email: yup
          .string()
          .email('Must be a valid email')
          .required('Email is required'),
        password: yup
          .string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required'),
      })}
      onSubmit={async (values, actions) => {
        try {
          setError('')
          setLoading(true)
          await register(values.email, values.password)
        } catch (error) {
          console.log(error)
          setError('Failed to create an account. Please try again later')
        }

        setLoading(false)
        actions.resetForm()
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
            <GridItem colSpan={colSpan}>
              <TextField
                name='firstName'
                placeholder='Please enter first name'
              />
            </GridItem>
            <GridItem colSpan={colSpan}>
              <TextField name='lastName' placeholder='Please enter last name' />
            </GridItem>
            <GridItem colSpan={2}>
              <TextField
                name='email'
                placeholder='Please enter email'
                type='email'
              />
            </GridItem>
            <GridItem colSpan={colSpan}>
              <TextField
                name='password'
                placeholder='Please enter password'
                type='password'
              />
            </GridItem>
            <GridItem colSpan={colSpan}>
              <TextField
                name='confirmPassword'
                placeholder='Please confirm password'
                type='password'
              />
            </GridItem>
            <GridItem colSpan={2} textAlign='center'>
              <Heading size='md'>Choose mode</Heading>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Button variant='secondary' width='full' mt={4}>
                Recommended
              </Button>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Button variant='secondary' width='full' mt={4}>
                Customized
              </Button>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                isLoading={loading}
                variant='primary'
                width='full'
                mt={4}
                type='submit'
              >
                Sign up
              </Button>
            </GridItem>
            {error && (
              <Alert status='error'>
                <AlertIcon />
                {error}
              </Alert>
            )}
            {/* <Stack isInline justifyContent='space-between' mt={4}>
        <Box>
          <Checkbox>Remember Me</Checkbox>
        </Box>
        <Box>
          <Link color={'teal.500'}>Forgot your password?</Link>
        </Box>
      </Stack> */}
          </SimpleGrid>
        </form>
      )}
    </Formik>
  )
}

const RegisterFooter = () => {
  return (
    <Box textAlign='end' w='full'>
      <Text>
        Already have an account? <Link color={'teal.500'}>sign in</Link>
      </Text>
    </Box>
  )
}

const Register = () => {
  return (
    <Flex
      h={{ base: 'auto', md: '100vh' }}
      w='full'
      py={[0, 10, 20]}
      direction={{ base: 'column-reverse', md: 'row' }}
    >
      <AuthPageLogo />

      <VStack
        w='full'
        h='full'
        p={10}
        spacing={10}
        alignItems='flex-start'
        border={'1px'}
      >
        <RegisterHeader />
        <RegisterForm />
        <RegisterFooter />
      </VStack>
    </Flex>
  )
}

export default Register
