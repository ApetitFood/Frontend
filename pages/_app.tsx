import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'

import theme from '@/themes'
import '@/themes/styles.css'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  const pageIsProtected = pageProps.protected

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider isPageProtected={pageIsProtected}>
        {pageIsProtected && <Header />}
        <Container maxW='container.l' p={0} centerContent>
          {pageIsProtected ? (
            <Box py={5} maxW='60%'>
              <Component {...pageProps} />
            </Box>
          ) : (
            <Box w='80%'>
              <Component {...pageProps} />
            </Box>
          )}
        </Container>
        {pageIsProtected && <Footer />}
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
