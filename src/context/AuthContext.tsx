import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth'

import firebaseApp from '@/firebase'
import { AuthContextType } from '@/types'
import { Spinner } from '@chakra-ui/react'

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  register: (): void => {},
  login: (): void => {},
  logout: (): void => {},
  resetPassword: (): void => {},
})
const auth = getAuth(firebaseApp)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({
  children,
  isPageProtected,
  isAuthenticationPage,
}: {
  children: any
  isPageProtected: boolean
  isAuthenticationPage: boolean
}) => {
  const router = useRouter()

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [initRendered, setInitRendered] = useState(false)

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      user ? setUserLoggedIn(true) : setUserLoggedIn(false)

      setInitRendered(true)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!initRendered) {
      return
    }

    const checkRoutes = async () => {
      console.log()
      if (!userLoggedIn && isPageProtected) {
        await router.push('/login')
        return
      }

      if (userLoggedIn && isAuthenticationPage) {
        await router.push('/')
        return
      }

      setLoading(false)
    }

    checkRoutes()
  }, [
    userLoggedIn,
    isPageProtected,
    isAuthenticationPage,
    router,
    initRendered,
  ])

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <Spinner />}
    </AuthContext.Provider>
  )
}
