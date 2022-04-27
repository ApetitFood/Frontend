import type { AppProps } from 'next/app'
import { Box, ChakraProvider, Container } from '@chakra-ui/react'

import theme from '@/themes'
import '@/themes/styles.css'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GetBackButton from '@/components/BackButton'

function MyApp({ Component, pageProps }: AppProps) {
  const pageIsProtected = pageProps.protected
  const isAuthenticationPage = pageProps.authPage

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider
        isPageProtected={pageIsProtected}
        isAuthenticationPage={isAuthenticationPage}
      >
        {!pageIsProtected && !isAuthenticationPage && <GetBackButton />}
        {pageIsProtected && <Header />}
        <Container maxW='container.l' p={0} centerContent>
          {!isAuthenticationPage ? (
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
