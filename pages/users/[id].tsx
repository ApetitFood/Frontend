import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { doc, getDoc } from '@firebase/firestore'
import { Spinner, Container } from '@chakra-ui/react'

import type { User } from '../../src/types'
import { firebaseDb } from '../../src/firebase'
import UserProfile from '../../src/components/user/profile'

const User: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const data = await getDoc(doc(firebaseDb, 'users', id as string))
      const userData = data.data()
      if (userData) {
        setUser({ ...userData, id } as User)
        setLoading(false)
        return
      }

      router.push('/login')
    }

    getUser()
  }, [id, router])

  return (
    <Container maxW='container.xl' pt={10} centerContent>
      {loading ? <Spinner /> : <UserProfile user={user!} />}
    </Container>
  )
}

export default User
