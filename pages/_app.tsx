import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

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
        <Component {...pageProps} />
        {pageIsProtected && <Footer />}
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
