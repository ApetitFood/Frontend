import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../src/themes'
import '../src/themes/styles.css'
import { AuthProvider } from '../src/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
